import { useState } from "react";
import API from "../api";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        try {
            const response = await API.post("auth/login/", { 
                email: email.trim(), 
                password: password 
            });
            
            if (response.data && response.data.access) {
                localStorage.setItem("token", response.data.access);
                onLoginSuccess();
            }
        } catch (err) {
            setError("Invalid email or password. Try again!");
        }
    };

    return (
        <div style={{ maxWidth: "380px", margin: "60px auto", padding: "24px", border: "1px solid #eaeaea", borderRadius: "12px", fontFamily: "system-ui" }}>
            <h2>Sign In</h2>
            {error && <p style={{ color: "red", backgroundColor: "#ffebeb", padding: "8px", borderRadius: "4px" }}>{error}</p>}
            
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
                
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        required 
                    />
                </div>
                
                <button type="submit" style={{ width: "100%", padding: "12px", background: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                    Continue
                </button>
            </form>

            {/* ADDED THIS TOGGLE LINK HERE */}
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px" }}>
                Don't have an account? <span onClick={onSwitchToRegister} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
            </p>
        </div>
    );
};

export default Login;