import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const Signup = ({ updateuser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      updateuser(JSON.parse(localStorage.getItem("user")));
      history.push("/home");
    }
  }, []);
  const handleSubmit =async (e) => {
    e.preventDefault();
     await axios
      .post("http://localhost:3000/user", {
        email: email,
        password: password,
      })
      .then((res) => {
        const user = res;
        if (user) {
          if (user.data == "") {
            alert("Email already exists");
          } else {
            updateuser(user);
            history.push("/home");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <br />
      <br />
      <div className="container ">
        <div className="col-md-6 mx-auto text-center">
          <div className="header-title">
            <h1 className="wv-heading--title">SingUp</h1>
            <h2 className="wv-heading--subtitle">
              Create a new Account by Signing up
            </h2>
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
                    autoComplete="off"
                    className="form-control my-input"
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
                    SignUp
                  </button>
                  <p>
                    Already have an account <Link to="/login">Login Here</Link>
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

export default Signup;
