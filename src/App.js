import React from 'react';
import './App.css';
import Routing from './components/routing';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div>
      <div className="wrapper">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand>
            <Link className="nav-links" to="/">Gradient Code</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-links" to="/">Home</Link>
              <Link className="nav-links" to="/gradients">Gradients</Link>
              <Link className="nav-links" to="/user-gradients">Your Gradients</Link>
              <Link className="nav-links" to="/about">About</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Routing />

    </div>
  );
}

export default App;
