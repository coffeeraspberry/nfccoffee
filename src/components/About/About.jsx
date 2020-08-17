import React from 'react'
import './About.css'
import Header from '../header/header'
import Footer from '../footer/footer'
import AboutBody from './AboutBody/AboutBody'
class About extends React.Component{


    render(){
        return(
            <div className="background">
                <div className="black">
        <Header />
        <AboutBody/>
        <Footer/>
        </div>
        </div>
            )
    }
}

export default About;