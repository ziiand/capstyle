
import React from "react";
import "../styles/Contact.scss";

const Contact = () => (
  <div className="contact-container">
    <h1>Contact</h1>
    <p>
      Vous pouvez nous contacter à l'adresse email :{" "}
      <a href="mailto:contact@capstyle.com" className="contact-link">
        contact@capstyle.com
      </a>
    </p>
  </div>
);

export default Contact;
