import { useEffect ,useState} from "react";
import { useAuth } from "../context/authContext";
import api from "../services/api.service";
import { useNavigate } from "react-router-dom";
import type{ DashboardData } from "../types/auth.types"; 

function Dashboard() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    // ✅ useEffect FIRST before any checks!
    useEffect(() => {
        if(!isAuthenticated) {
            navigate("/login");
            return;
        }

        async function fetchDashboard() {
            try {
                const response = await api.get<DashboardData>("/protected/dashboard");
                 console.log("API Response:", response.data);
                setProfile(response.data);
            } catch(error) {
                 console.log("Error:", error); 
                setError("Failed to fetch data!");
                
                
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, [isAuthenticated]); // ✅ add isAuthenticated as dependency!

    
    if(loading) return <p>Loading...</p>;
    if(error) return <p style={{color: "red"}}>{error}</p>;
    // Guard: the API may return an object without `user` — avoid runtime crash
    if(!profile || !profile.user) return <p>No profile data available. Please login again.</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>Dashboard 🎉</h1>
                <p>{profile.message}</p>
                <p>Name: <strong>{profile.user.name}</strong></p>
                <p>Email: {profile.user.email}</p>
                <p>Member since: {profile.user.createdAt ? new Date(profile.user.createdAt).toLocaleDateString() : "Unknown"}</p>
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