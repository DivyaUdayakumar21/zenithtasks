import { useEffect, useState } from "react";
import API from "../api";

const Dashboard = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Fetch user tasks automatically upon component mount
    const fetchTasks = async () => {
        try {
            const response = await API.get("tasks/");
            setTasks(response.data);
        } catch (err) {
            setError("Failed to load tasks from database.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle Form Submission (Handles BOTH Creating and Updating)
    const handleSaveTask = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            priority: priority,
        };

        try {
            if (editingTaskId) {
                const response = await API.patch(`tasks/${editingTaskId}/`, taskData);
                setTasks(tasks.map((task) => (task.id === editingTaskId ? response.data : task)));
                setSuccessMsg("Task updated successfully!");
                setEditingTaskId(null);
            } else {
                const response = await API.post("tasks/", { ...taskData, status: "pending" });
                setTasks([response.data, ...tasks]);
                setSuccessMsg("Task created successfully!");
            }
            setTitle("");
            setDescription("");
            setPriority("medium");
        } catch (err) {
            setError("Could not save task. Verify input data.");
        }
    };

    // NEW: Toggle completion status between 'pending' and 'completed'
    const toggleTaskCompletion = async (task) => {
        setError("");
        const newStatus = task.status === "completed" ? "pending" : "completed";
        
        try {
            const response = await API.patch(`tasks/${task.id}/`, { status: newStatus });
            // Sync up the change directly into our local React list view state
            setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
        } catch (err) {
            setError("Failed to update task status on server.");
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(task.priority || "medium");
        setError("");
        setSuccessMsg("");
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setTitle("");
        setDescription("");
        setPriority("medium");
    };

    const handleDeleteTask = async (id) => {
        try {
            await API.delete(`tasks/${id}/`);
            setTasks(tasks.filter((task) => task.id !== id));
            setSuccessMsg("Task removed successfully.");
            if (editingTaskId === id) cancelEditing();
        } catch (err) {
            setError("Failed to delete the selected task.");
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "system-ui" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h2>Your Task Dashboard</h2>
                <button onClick={onLogout} style={{ padding: "8px 16px", background: "#ff4d4d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Log Out</button>
            </div>

            {error && <p style={{ color: "red", backgroundColor: "#ffebeb", padding: "12px", borderRadius: "6px", border: "1px solid #ffcccc", fontWeight: "500" }}>{error}</p>}
            {successMsg && <p style={{ color: "green", backgroundColor: "#e6fbe6", padding: "12px", borderRadius: "6px", border: "1px solid #ccffcc" }}>{successMsg}</p>}

            {/* Form Layout */}
            <form onSubmit={handleSaveTask} style={{ backgroundColor: editingTaskId ? "#f0f7ff" : "#f9f9f9", padding: "20px", borderRadius: "10px", marginBottom: "30px", border: "1px solid #eee" }}>
                <h3>{editingTaskId ? "✏️ Edit Task Mode" : "➕ Add New Task"}</h3>
                <input 
                    type="text" placeholder="Task Title" value={title}
                    onChange={(e) => setTitle(e.target.value)} required
                    style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
                />
                <textarea 
                    placeholder="Task Description (Optional)" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box", minHeight: "60px" }}
                />
                <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontWeight: "500" }}>Priority: </label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: "6px 12px", borderRadius: "4px" }}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" style={{ padding: "10px 20px", background: editingTaskId ? "#0066cc" : "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", marginRight: "10px" }}>
                    {editingTaskId ? "Update Changes" : "Save Task"}
                </button>
                {editingTaskId && <button type="button" onClick={cancelEditing} style={{ padding: "10px 20px", background: "#777", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>}
            </form>

            {/* Updated Task List Display */}
            <h3>Active Task Items ({tasks.length})</h3>
            {tasks.length === 0 ? (
                <p style={{ color: "#777", fontStyle: "italic" }}>No tasks created yet.</p>
            ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                    {tasks.map((task) => {
                        const isCompleted = task.status === "completed";
                        return (
                            <div key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: isCompleted ? "#fcfcfc" : "#fff", opacity: isCompleted ? 0.7 : 1 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                                    {/* Checkbox item linked to the toggle logic */}
                                    <input 
                                        type="checkbox" 
                                        checked={isCompleted} 
                                        onChange={() => toggleTaskCompletion(task)}
                                        style={{ width: "18px", height: "18px", marginTop: "4px", cursor: "pointer" }}
                                    />
                                    <div>
                                        <h4 style={{ margin: "0 0 4px 0", textDecoration: isCompleted ? "line-through" : "none", color: isCompleted ? "#888" : "#000" }}>
                                            {task.title}
                                        </h4>
                                        <p style={{ margin: "0 0 6px 0", color: "#666", fontSize: "14px", textDecoration: isCompleted ? "line-through" : "none" }}>
                                            {task.description || "No description provided."}
                                        </p>
                                        <span style={{ fontSize: "12px", backgroundColor: isCompleted ? "#e5e7eb" : task.priority === "high" ? "#ffcccc" : task.priority === "low" ? "#e0f2fe" : "#fef3c7", padding: "3px 8px", borderRadius: "12px", fontWeight: "600", color: "#333" }}>
                                            {isCompleted ? "COMPLETED" : task.priority.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "12px" }}>
                                    {!isCompleted && (
                                        <button onClick={() => startEditing(task)} style={{ background: "none", border: "none", color: "#0066cc", cursor: "pointer", fontWeight: "600" }}>Edit</button>
                                    )}
                                    <button onClick={() => handleDeleteTask(task.id)} style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", fontWeight: "600" }}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;