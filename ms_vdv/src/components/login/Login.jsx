import './login.scss'
import LoginLogo from '../../assets/img/login_logo.png'
import { useState } from 'react'
import instance from '../../service/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../../providers/AuthProvider'

const Login = () => {
  const { authData, updateAuth } = useAuthProvider();
  const navigation = useNavigate()

  const [error, setError] = useState({
    username: '',
    password: ''
  })

  const [loading, setLoading] = useState(false);
  

  const login = async({username, password}) => {
    const data = {username, password}
    const headers = {
      'Content-Type': 'application/json'
    }
    try{
      await instance.post('/admin/login', data, headers);
      navigation('/')
      updateAuth(true)
    }
    catch(err){
      alert('Invalid username or password')
    }
  }

  const performLogin = (e) => {
    e.preventDefault()

    setError(() => {
      return {
        username: '',
        password: ''
      }
    })

    const data = {
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value
    }

    if (data.username === '') {
      setError((prev) => {
        return {
          ...prev,
          username: 'Username is required'
        }
      })
    }

    if (data.password === '') {
      setError((prev) => {
        return {
          ...prev,
          password: 'Password is required'
        }
      })
    }

    if (data.username !== '' && data.password !== '') {
      login(data)
    }
    
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image">
          <img src={LoginLogo} alt="logo" />
        </div>

        <div className="inputs">
          <form onSubmit={performLogin}>

            <div className="username">
              <label htmlFor="login-username" style={error.username !== "" ? { color: '#ff564e' } : {}}>Username</label>
              <input type="text" id="login-username" style={error.username !== "" ? { borderColor: '#ff564e' } : {}} />
              <span className="error">{error.username}</span>
            </div>

            <div className="password">
              <label htmlFor="login-password" style={error.password !== "" ? { color: '#ff564e' } : {}}>Password</label>
              <input type="password" id="login-password" style={error.password !== "" ? { borderColor: '#ff564e' } : {}} />
              <span className="error">{error.password}</span>
            </div>

            <input type="submit" value="Login" className='login-button' />
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login