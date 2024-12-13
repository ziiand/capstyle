import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <ul>
          <li>
            <Link to="/a-propos">A propos</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/conditions-generales">Conditions Générales</Link>
          </li>
        </ul>
        
        <Link to="/">
          <img src="/images/logo.PNG" alt="Logo de CapStyle" id="logo" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
