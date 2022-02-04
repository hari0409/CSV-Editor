import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as bcrypt from "bcryptjs";
import { Link } from "react-router-dom";

const Login = ({ updateuser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      updateuser(JSON.parse(localStorage.getItem("user")));
      history.push("/home");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/user/${email}`)
      .then((res) => {
        const user = res;
        if (user) {
          bcrypt.compare(password, user.data[0].password, (err, result) => {
            if (result) {
              history.push("/home");
              updateuser(user);
            } else {
              alert("Invalid Username or Password");
            }
          });
        } else {
        }
      })
      .catch((err) => {
        alert("Account doesn't exist");
      });
  };

  return (
    <>
      <br />
      <br />
      <div className="container ">
        <div className="col-md-6 mx-auto text-center">
          <div className="header-title">
            <h1 className="wv-heading--title">Log In</h1>
            <h2 className="wv-heading--subtitle">Login to your account...</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="myform form ">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control my-input"
                    autoComplete="off"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    className="form-control my-input"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <div className="text-center ">
                  <button type="submit" className="btn btn-primary btn-m">
                    Login
                  </button>
                  <p>
                    Dont have an account <Link to="/">Signup Here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
