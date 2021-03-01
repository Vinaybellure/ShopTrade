import React, { useEffect, useState } from 'react'
import '../Components/Homepage.css'
import { Dropdown } from 'react-bootstrap';
import bgimage from '../images/image1.png'
import Filters from './Filters'
import Post from './Post'
import logo from '../images/logo.png'
import {
    BrowserRouter as Router,
    Route,
    withRouter
  } from "react-router-dom";
function HomePage(props)
{
    const [cartItems, setcartItems] = useState([])
    const [wishlistItems, setwishlistItems] = useState([])

    useEffect(() =>
    {
        let dta = JSON.parse(localStorage.getItem('cart'))
        if(dta)
        {
            setcartItems(dta.length)
        }
        
        let dta1 = JSON.parse(localStorage.getItem('wishlist'))
        if(dta1)
        {
            setwishlistItems(dta1.length)
        }
        

    }, [])

    const handleMoveCart = (e) =>
    {
        props.history.push({
            pathname:'/cart'
    })
    }

    const handleMoveWishlist = (e) =>
    {
        props.history.push({
            pathname:'/wishlist'
    })
    }
    const handleHomePage = (e) =>
    {
        props.history.push({
            pathname:'/'
    })
    }

    return(
        <div>
        <div className="conatiner-fluid">
            <div className="d-flex justify-content-between align-items-center">
                <div className="py-2 px-4" >
                    <img src={logo} className="responsive zoom1" style={{cursor: 'pointer'}} onClick={handleHomePage}/>
                </div>
                <div className="d-md-flex d-none justify-content-between align-items-center">
                    <div className="mr-4 zoom1">
                        <Dropdown style={{cursor: 'pointer'}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >SHOP</Dropdown.Toggle >
                            <Dropdown.Menu>
                                <Dropdown.Item href="https://shoptrade.co/">Item 1</Dropdown.Item>
                                <Dropdown.Item href="https://shoptrade.co/">Item 2</Dropdown.Item>
                                <Dropdown.Item href="https://shoptrade.co/">Item 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <a className="mb-0 mr-4 zoom1"  style={{cursor: 'pointer', color: 'black', textDecoration: 'none'}} href="https://shoptrade.co/about-us.html">About Us</a>
                    <a className="mb-0 mr-4 zoom1"  style={{cursor: 'pointer',  color: 'black', textDecoration: 'none' }} href="https://shoptrade.co/packages.html">Our Stores</a>
                    <a className="mb-0 mr-4 zoom1"  style={{cursor: 'pointer',  color: 'black', textDecoration: 'none'}} href="https://shoptrade.co/contact-us.html">Contact Us</a>
                    
                </div>
                <div className="d-flex">
                    <div onClick={handleMoveCart} style={{cursor: 'pointer'}} className="zoom1"><i className="fa badge" style={{fontSize:'24px'}} value={cartItems}>&#xf07a;</i></div>
                    <div onClick={handleMoveWishlist} className="mr-2 zoom1" style={{cursor: 'pointer'}}><i className="fa badge"  value={wishlistItems} style={{fontSize:'24px'}}>&#xf08a;</i></div>
                </div>
            </div>
        </div>
        {/* Section 2 */}

        <div className="conatiner-fluid py-2 px-3 px-md-0 text-center d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${bgimage})` }}>
            <p className="mb-0 mr-2" style={{color: 'white', fontSize: '12px'}}>Invite Friends TO Big Fashion Festival and get up to $150 MynCash For Every Person who Vists</p>
            <button className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-sm-2 mr-md-0 zoom1" style={{backgroundColor: 'white', border: 'none', }}>Invite Now</button>
        </div>
        
        <div className="container-fluid">
            <Post/>
        </div>


        </div>
    )
}
export default withRouter(HomePage)