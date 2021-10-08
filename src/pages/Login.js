import React, {useState } from "react";
import { Link } from "react-router-dom";
import {loginData} from "../Redux/Actions/allActions"
import { useDispatch } from "react-redux";
import { signin, signInWithGoogle } from "../helpers/auth";
const Login = () => {
  const[login,setLogin] = useState({
    email:"",
    password:""
  })
  const dispatch = useDispatch()
  const [error,setError]=useState("")
  const handleChange=(e)=>{
    let {name,value}=e.target;
    setLogin({...login,[name]:value})
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      await signin(login.email, login.password);
      dispatch(loginData(login))
    } catch (error) {
      setError(error.message);
    }
  }
  const googleSignIn = async()=> {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>
            Login to
            <Link className="title ml-2" to="/">
              Chatty
            </Link>
          </h1>
          <p className="lead">
            Fill in the form below to login to your account.
          </p>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={login.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={login.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {error ? (
              <p className="text-danger">{error}</p>
            ) : null}
            <button className="btn btn-primary px-5" type="submit">Login</button>
          </div>
          <p>You can also log in with any of these services</p>
          <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
            Sign in with Google
          </button>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>

      </div>

  )
}

export default Login
