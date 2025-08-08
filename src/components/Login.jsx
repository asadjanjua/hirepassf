import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

    const handlelogin = async () => {
        setEmailError('');
        setPasswordError('');
        let hasError = false;
        if (!email){
            setEmailError('Email is required');
            hasError = true;
        }
        if (!password){
            setPasswordError('Password is required');
            hasError = true;
        }
        if (hasError) return;

        try {
            await dispatch(LoginUser({ email, password})).unwrap();
            
        } catch (error) {
            if (error.errors){
                if (error.errors.email) setEmailError(error.errors.email);
                if (error.errors.password) setPasswordError(error.errors.password);
            } else if (error.message) {
                console.error('Login failed',error.message);
            }
        }
    }

  return (
 <div className='flex'>
    <div className='w-1/2'>
      <div>
        <p>Login to your account</p>
        <p>Welcome to HirePass developer portal.</p>
      </div>

      <div>
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
        />
        <p>Forgot password</p>
      </div>
      <div>
        <button onClick={handlelogin}>
            Login
        </button>
        <p>
          Don't have an account?{' '}
          <span>Sign Up</span>
          </p>
      </div>
    </div>
    <div className='w-1/2'>
        {/* <img src="" alt="Picture" /> */}
    </div>
</div>
  );
};

export default Login;