import Signup from "./Components/Signup";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import { useState } from "react";
import Home from "./Components/Home";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const handleCallback = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Signup updateuser={handleCallback} />
          </Route>
          <Route path="/login" exact>
            <Login updateuser={handleCallback} />
          </Route>
          <Route path="/home" exact>
            {user ? (
              <Home logout={handleLogout} />
            ) : (
              <Login updateuser={handleCallback} />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
