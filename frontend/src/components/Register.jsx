import { useState } from "react";
import API from "../api";

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await API.post("auth/register/", { 
                email: email.trim(), 
                password: password 
            });
            setSuccess(true);
            setTimeout(() => {
                onRegisterSuccess(); 
            }, 2000);
        } catch (err) {
            // Advanced Debugger: Unpacks exact database/field rejections from Django
            const serverFields = err.response?.data;
            let descriptiveError = "";
            
            if (serverFields && typeof serverFields === "object") {
                descriptiveError = Object.entries(serverFields)
                    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : messages}`)
                    .join(" | ");
            }
            
            setError(descriptiveError || "Registration failed.");
            console.error("Backend registration rejection:", serverFields);
        }
    };

    return (
        <div style={{ maxWidth: "380px", margin: "60px auto", padding: "24px", border: "1px solid #eaeaea", borderRadius: "12px", fontFamily: "system-ui" }}>
            <h2>Create Account</h2>
            {error && <p style={{ color: "red", backgroundColor: "#ffebeb", padding: "8px", borderRadius: "4px" }}>{error}</p>}
            {success && <p style={{ color: "green", backgroundColor: "#e6fbe6", padding: "8px", borderRadius: "4px" }}>Success! Redirecting to login...</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        required 
                    />
                </div>
                
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        required 
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Confirm Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        required 
                    />
                </div>
                
                <button type="submit" style={{ width: "100%", padding: "12px", background: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                    Sign Up
                </button>
            </form>
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px" }}>
                Already have an account? <span onClick={onSwitchToLogin} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>Sign In</span>
            </p>
        </div>
    );
};

export default Register;