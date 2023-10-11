import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [registrationMsg, setRegistrationMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== checkPassword) {
      setRegistrationMsg("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3700/graphql',
        {
          query: `
            mutation {
              register(input: {
                username: "${username}",
                password: "${password}",
                checkpassword: "${checkPassword}"
              }) {
                msg
                token
                registered
              }
            }
          `,
        }
      );

      console.log(response.data);
      const { data } = response.data;
      const { msg, token, registered } = data.register;

      if (registered) {
        localStorage.setItem('token', token);
        navigate('/categores');
      } else {
        setRegistrationMsg(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='center'>
      <div className='container'>
        <h1>Register</h1>
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
            <input
              type='password'
              className='telegram-input'
              placeholder='Confirm Password'
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />
            <button
              className='telegram-button2'
              type='submit'
            >
              Register
            </button>
          </form>
          {registrationMsg && (
            <p className='error-msg'>{registrationMsg}</p>
          )}
        </div>
        <Link to='/login'>login</Link>
      </div>
    </div>
  );
};

export default Register;
