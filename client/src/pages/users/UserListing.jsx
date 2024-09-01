import { useState, useEffect } from 'react';
import { useAuth } from "../../utils/AuthProvider";

export default function UserListing(){

    const { token }  = useAuth();
    
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('http://localhost:8000/api/user', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    
                }
            });
            const data = await response.json();
            setRecords(data.data);
        }

        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map((user) => (
                    <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                    </tr>
                    ))
                }
                
            </tbody>
        </table>
    );
        
}