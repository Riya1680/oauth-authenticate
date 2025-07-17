import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API from "./axiosInstance";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";


function App() {
    const [user, setUser] = useState(null);

    //check if the user is logged in
    useEffect(() => {   // React app will act like the user is logged out every time it's refreshed(without use)
        const fetchUser = async () => {
            try {
                const res = await API.get("/api/auth/me");   // backend returns user from MongoDB
                setUser(res.data.user);
            }
            catch (err) {
                setUser(null) //not logged in
            }
        };
        fetchUser();
    }, [])

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                    />
                    <Route path="/login"  element={<Login  setUser={setUser}/>}/>
                    <Route path="/dashboard" element={<PrivateRoute user={user}>
                        <Dashboard user={user} setUser={setUser}/>
                    </PrivateRoute>}/>
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;