import React from 'react'
import './Contact.css'
import Header from '../header/header'
import Footer from '../footer/footer'
import ContactBody from './ContactBody/ContactBody'
class Contact extends React.Component{


    render(){
        return(
            <div className="background">
                <div className="black">
        <Header />
        <ContactBody/>
        <Footer/>
        </div>
        </div>
            )
    }
}

export default Contact;