import React from "react";
import "./Contact.css";
import ContactBody from "./ContactBody/ContactBody";

class Contact extends React.Component {
    
  render() {
    return (
      <div>
        <div>
          <ContactBody />
        </div>
      </div>
    );
  }
}

export default Contact;
