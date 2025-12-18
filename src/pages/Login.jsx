import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { Header, Footer } from '../components';


// Login Page
export function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);


const handleLogin = async (e) => {
e.preventDefault();
const { user, session, error } = await supabase.auth.signInWithPassword({
email,
password
});
if (error) {
setError(error.message);
} else {
setError(null);
navigate('/'); // redirect to home after login
}
};


return (
<div>
<Header />
<div className="p-6 max-w-md mx-auto">
<h1 className="text-2xl font-bold mb-4">Rep Login</h1>
<form onSubmit={handleLogin} className="flex flex-col gap-4">
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="border p-2 rounded"
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="border p-2 rounded"
/>
{error && <p className="text-red-600">{error}</p>}
<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
</form>
</div>
<Footer />
</div>
);
}