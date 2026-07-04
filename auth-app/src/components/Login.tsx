import { useState } from "react";
import type{ LoginForm } from "../types/auth.types";

function Login() {
    // typed state!
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // typed event handler!
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // we'll connect to backend tomorrow!
            console.log("Login data:", formData);
        } catch(err) {
            setError("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
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

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p style={styles.link}>
                    Don't have an account?{" "}
                    <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}

// basic styles
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

export default Login;