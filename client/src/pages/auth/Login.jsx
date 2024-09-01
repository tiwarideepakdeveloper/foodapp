import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMsg, setResponseMsg]  = useState("");
    const [isSuccess, setIsSuccess] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: email,
            password: password
          })
        });
        const data = await response.json();
        if (response.ok) {
            setIsSuccess(true);
            clearForm();
            login(data.data.token);
            navigate('/user');
            
        }
        setResponseMsg(data.message);

      }

    const clearForm = () => { 
        setEmail('');
        setPassword('');
    }; 

    return (
        <div className="login-form">
            <h3>Login</h3>
            <form  onSubmit={handleSubmit} method="POST">
                <div>
                    <label htmlFor="firstName">Email</label>
                    <input type="text" value={email} onChange={handleEmailChange}/>
                </div>
                <div>
                    <label htmlFor="firstName">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <input type="submit" name="Login"/>
                </div>
            </form>
            <span className={isSuccess ? 'success': 'error'}>{responseMsg}</span>
        </div>
    );
}

