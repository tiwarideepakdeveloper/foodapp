import { useState, useEffect } from 'react';

export default function UserListing(){
        
    useEffect(() => {
      fetch('http://localhost:8000/api/user')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          
        });
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
                <tr>
                    <td>Navjot</td>
                    <td>Singh</td>
                </tr>
            </tbody>
        </table>
    );
        
}