import React from 'react'
import './About.css'
import Header from '../header/header'
import Footer from '../footer/footer'

class About extends React.Component{


    render(){
        return(
            <div className="background">
                <div className="black">
        <Header />
        <Footer/>
        </div>
        </div>
            )
    }
}

export default About;