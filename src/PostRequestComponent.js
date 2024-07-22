// src/PostRequestComponent.js

import React, { useState } from 'react'; // Import useState if you're using it.
import axios from 'axios'; // Import axios if you're using it.

const PostRequestComponent = () => {
    const [data, setData] = useState({ name: '', age: '' }); // Set initial state for form data.
    const [response, setResponse] = useState(null); // Set initial state for response.
    const [error, setError] = useState(null); // Set initial state for error.

    const handleChange = (e) => { // Handle form input changes.
        const { name, value } = e.target; // Get input name and value.
        setData({ ...data, [name]: value }); // Set input value in state.
    };

    const handleSubmit = async (e) => { // Handle form submission.
        e.preventDefault(); // Prevent default form submission.
        try {  // Try to make the POST request.
            // Use axios to make the POST request
            const result = await axios.POST('https://localhost:5000/api/endpoint', data, {
                headers: {  // Set headers
                    'Content-Type': 'application/json',  // Set content type to JSON
                },
            });
            setResponse(result.data);  // Set response in state
        } catch (err) {  // Catch any errors
            setError(err.message);  // Set error in state
            setResponse(null);  // Clear response in state
        }
    };

    return (  // Render form
        <div>  
            <h1>Send POST Request</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={data.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {/* Render response and error messages */}
            {response && <div>Response: {JSON.stringify(response)}</div>} 
            {error && <div>Error: {error}</div>}
        </div>
    );
};

// Export PostRequestComponent as default.
export default PostRequestComponent;
