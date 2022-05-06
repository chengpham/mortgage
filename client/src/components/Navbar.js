import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ()=>{
  return(
    <nav className="container-fluid navbar navbar-expand bg-light navbar-light justify-content-between py-0" >
        
        <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink to='/mortgage' className="nav-link">Home</NavLink>
            </li>
        </ul>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to='/stocks' className="nav-link">Stocks</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;

