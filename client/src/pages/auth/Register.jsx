import { useState } from "react";

export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMsg, setResponseMsg]  = useState("");
    const [isSuccess, setIsSuccess] = useState("");

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }


    async function handleSubmit(e) {
        e.preventDefault();

        console.log({ 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          });

        console.log('Submitting form')
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          })
        });
        const data = await response.json();
        
        if (response.ok) {
            setIsSuccess(true);
            clearForm();
        }
        setResponseMsg(data.message);

      }

    const clearForm = () => { 
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }; 

    return (
        <div className="register-form">
            <h3>Register</h3>
                <form  onSubmit={handleSubmit} method="POST">
                    <div>
                        <label htmlFor="firstName">FirstName</label>
                        <input type="text" value={firstName} onChange={handleFirstNameChange}/>
                    </div>
                    
                    <div>
                        <label htmlFor="firstName">LastName</label>
                        <input type="text" value={lastName} onChange={handleLastNameChange}/>
                    </div>
                    
                    <div>
                        <label htmlFor="firstName">Email</label>
                        <input type="text" value={email} onChange={handleEmailChange}/>
                    </div>
                    
                    <div>
                        <label htmlFor="firstName">Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <input type="submit" name="Register"/>
                    </div>
                    
                </form>
                <span className={isSuccess ? 'success': 'error'}>{responseMsg}</span>
        </div>
    );
}

