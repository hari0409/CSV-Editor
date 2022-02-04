import React from 'react';

const Navbar = ({logout}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="/home">
          CSV Editor
        </a>
      </li>
      <li className="nav-item align-item-end">
        <button className="btn" onClick={(e)=>{logout(e)}}>Logout</button>
      </li>
    </ul>
  </nav>
  );
};

export default Navbar;
