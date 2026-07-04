import { useState } from "react";
import type { RegisterForm } from "../types/auth.types";

export default function Register() {

    const [formData,setFormData]=useState<RegisterForm>({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [error,setError]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);

    const handleChange= (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setFormData({
            ...formData,
             [e.target.name]: e.target.value
        });
    };

   const registerSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if(formData.password === formData.confirmPassword) {
        try {
            console.log("user registered", formData);
        } catch(err) {
            setError("Registration failed!"); 
            setLoading(false);  
        }
    } else {
        setError("Passwords don't match!");
        setLoading(false);  }
};

return (
    <div style={styles.container}>
        <div style={styles.card}>
            <h2 style={styles.title}>Register</h2>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={registerSubmit}>
                <div style={styles.inputGroup}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        style={styles.input}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p style={styles.link}>
                Already have an account?{" "}
                <a href="/login">Login here</a>
            </p>
        </div>
    </div>
);
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5"
    },
    card: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
    },
    title: {
        textAlign: "center" as const,
        marginBottom: "1.5rem",
        color: "#333"
    },

    inputGroup: {
        marginBottom: "1rem"
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "1rem",
        marginTop: "0.25rem",
        boxSizing: "border-box" as const
    },

    button: {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "1rem"
    },
    error: {
        color: "red",
        textAlign: "center" as const,
        marginBottom: "1rem"
    },
    link: {
        textAlign: "center" as const,
        marginTop: "1rem"
    }
};