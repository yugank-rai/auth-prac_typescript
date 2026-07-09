import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if(!isAuthenticated) {
        navigate("/login");
        return null;  
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>Dashboard</h1>
                <p>Welcome back <strong>{user?.name}</strong>!</p>
                <p>Email: {user?.email}</p>
                <button
                    style={styles.button}
                    onClick={() => {
                        logout();           
                        navigate("/login"); 
                    }}
                >
                    Logout
                </button>
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
        textAlign: "center" as const
    },
    button: {
        padding: "0.75rem 2rem",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "1rem"
    }
};

export default Dashboard;