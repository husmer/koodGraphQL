import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const credentials = btoa(`${username}:${password}`);
    const response = await fetch('https://01.kood.tech/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const token = await response.json();
      const defaultExpiresIn = 60 * 15 * 1000; // 15 minutes
      const expiration = new Date().getTime() + defaultExpiresIn;
      localStorage.setItem('token', JSON.stringify({ value: token, expiration }));
      navigate('#/dashboard');
      window.location.reload();
    } else {
      setError('Invalid username/email or password');
    }
  };
  

  return (
    <div className="login-container">
      <form className='form' onSubmit={handleLogin}>
        <h2 className="login-title" >Login to kood/Jõhvi</h2>
        <input className="user" type="text" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="button" type="submit">Login</button>
      </form>
      {error && <p className='error-text'>{error}</p>}
    </div>
  );
};

export default Login;
