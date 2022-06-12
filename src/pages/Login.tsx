import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login__body'>
      <div className="login__container">
        <form action="#">
          <div className="title">Login</div>
          <div className="input-box underline">
            <input type="text" placeholder="Enter Your Username" required />
            <div className="underline"></div>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Enter Your Password" required />
            <div className="underline"></div>
          </div>
          <div className="input-box button">
            <input type="submit" name="" value="Login" />
          </div>
        </form>
          <div className="option">or Connect With Social Media</div>
          <div className="google">
            <a href="#"><i className="fab fa-google"></i>Sign in With Google</a>
          </div>
          <div className="github">
            <a href="#"><i className="fab fa-facebook-f"></i>Sign in With GitHub</a>
          </div>

          <a href="#" className='icon'><i className='ri-github-line'></i></a>

      </div>
    </div>
  )
}

export default Login