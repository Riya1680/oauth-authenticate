import { GoogleLogin } from "@react-oauth/google"
import API from "./axiosInstance";
import { useNavigate } from "react-router-dom"; 

function Login({setUser}) {
     const navigate = useNavigate();
    const handleLogin = async (CredentialResponse) => {   //This function handles the response from Google after a successful login.
        const { credential } = CredentialResponse;   //CredentialResponse is an object received from the Google OAuth flow.
     //credential => This is the Google ID token (a JWT) used to identify the user.
        try{
            const  { data } = await API.post("api/auth/google",  {
                token: credential,
            },{
                withCredentials : true,
            });
            setUser(data.user)   // update frontend state with MongoDB user
            console.log(data);

             // redirect to dashboard after login
              navigate("/dashboard");
        }catch (err) {
            console.error("Login failed:", err);
            alert("Login failed");
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen p-2">
            <h2 className="flex m-2">Login with Google</h2>
            <GoogleLogin onSuccess={handleLogin}  onError={()=> console.log("Error")} />
            </div>
        </div>
    )
}

export default Login


//GoogleLogin component from the @react-oauth/google package.=> This component shows the Google Sign-In button and handles Google's OAuth 2.0 login process.