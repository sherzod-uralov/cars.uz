import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3700/graphql',
        {
          query: `
            mutation {
              login(input: {
                username: "${username}",
                password: "${password}"
              }) {
                msg
                token
                logined
              }
            }
          `,
        }
      );

      const { data } = response.data;
      console.log(data);
      const { msg, token, logined } = data.login;

      if (logined) {
        localStorage.setItem('token', token);
        navigate('/categores');
      } else {
        setLoginMsg(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='center'>
      <div className='container'>
        <h1>Login</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='telegram-input one'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type='password'
              className='telegram-input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className='telegram-button'
              type='submit'
            >
              Login
            </button>
          </form>
          {loginMsg && (
            <p className='error-msg'>{loginMsg}</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Login;
