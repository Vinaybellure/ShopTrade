import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import bgimage from '../images/image1.png'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import '../Components/Homepage.css'
import logo from '../images/logo.png'
function Page(props)
{
    const [posts, setposts] = useState()
    const [cart, setcart] = useState([])
    const [wishlist, setwishlist] = useState([])
    const [size, setsize] = useState()

    const [cartItems, setcartItems] = useState([])
    const [wishlistItems, setwishlistItems] = useState([])


    useEffect(()=>{
         if(props.location.state){
            setposts(props.location.state)  
            if("selctedSize" in props.location.state){
                setsize(props.location.state.selctedSize)
            }
            console.log(props.location.state)
         }else{
             props.history.push('/')
         }

         let dta=JSON.parse(localStorage.getItem('cart')) || []
         setcart(dta)
         let dta1=JSON.parse(localStorage.getItem('wishlist')) || []
         setwishlist(dta1)
         let dta11 = JSON.parse(localStorage.getItem('cart'))
         if(dta11)
         {
            setcartItems(dta11.length)
         }
         
         let dta111 = JSON.parse(localStorage.getItem('wishlist'))
         if(dta111)
         {
            setwishlistItems(dta111.length)
         }
         


    },[props.location.state]) 

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

     const handleCart = (e) =>
    {  
        if(cart.find(e=>e.id==posts.id && e.selctedSize==size)){
            props.history.push("/cart")
        }
        else{
        if(!size)
        {
            alert("Please Select Size")
        }
        else{
            let dta=[...cart]
            console.log(e)
            dta.push({
                ...posts,
                selctedSize:size
            })
            setcart(dta)
            localStorage.setItem('cart', JSON.stringify(dta))
        }
    }
    }

    const handleWishlist = (e) =>
    {
        if(wishlist.find(e=>e.id==posts.id )){
            props.history.push("/wishlist")
        }
        else{
            if(!size)
        {
            alert("Please Select Size")
        }
        else{
            let dta=[...wishlist]
            console.log(e)
            dta.push({
                ...posts,
                selctedSize:size
            })
            setwishlist(dta)
            localStorage.setItem('wishlist', JSON.stringify(dta))
        }
        }
        

    }

    const handleSize = (e) =>
    {
        console.log(e)
        setsize(e)
    }

    // console.log(posts)

    return (
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
            {
            (!posts) ? "<p>loading data</p>" : 
            
            <div className="container">
                {console.log(posts,'3288723723')}
                <div className="row pt-5 pb-md-5">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 text-center ">
                        <img src={posts.image_src} className="responsive" style={{width: '100%'}}/>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 col-12  mt-2">
                        <h3>{posts.vendor}</h3>
                        <h6>{posts.name}</h6>
                        <hr/>
                        <h4>Rs : {posts.price}  &nbsp;<span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'gray', fontSize: '25px'}}>Rs : {posts.compare_at_price}</span>&nbsp;&nbsp;<span style={{color: '#ff905a'}}>({(((posts.compare_at_price-posts.price)/posts.compare_at_price)*100).toFixed(2)}% off)</span></h4>
                        <p style={{color: '#03a685'}}>Inclusive of all Taxes</p>
                        <h6>SELECTE SIZE</h6>
                        <div className="d-flex align-items-center">
                            {
                                posts.options && posts.options.map(e =>
                                    {
                                      return  <button key={e.id} style={{backgroundColor:size==e.value ? "red":""}} className={` mr-2 mt-3 border border-secondary  px-2 py-2`} onClick={() => handleSize(e.value)}>{e.value}</button>
                                    })
                            }
                        </div>
                        <div className="d-md-flex mt-md-5 mt-2 text-center align-items-center">
                            <button onClick ={handleCart} className="px-5 py-2 mr-md-4 mt-2" style={{backgroundColor: '#ff3e6c', border: "none", color: 'white' }}><i class="fa fa-shopping-bag" aria-hidden="true" ></i>
                            {cart.find(e=>e.id==posts.id && e.selctedSize==size)? "Go to Cart": "Add to Bag"}
                            </button>

                            <button onClick={handleWishlist} className="px-5 py-2 mt-2" style={{backgroundColor: 'white', border: "1px solid gray", color: 'gray' }}><i class="fa fa-heart-o" aria-hidden="true"></i> {wishlist.find(e=>e.id==posts.id)? "Go to WishList": "wishlist"}</button>
                        </div>

                        <div className="mt-4">
                            <h6>PRODUCT DETAILS</h6>
                            <p>{posts.name}</p>
                        </div>

                        <div className="mt-4">
                            <h6>Specifications</h6>
                            <p>Product Tag : {posts.tag}</p>
                        </div>


                    </div>
                </div>
                <div className="row mb-5 pl-3 pr-3 pl-md-0 pr-md-0">
                    <h6>Product Description</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div> 
        }
        </div>
    )
}
export default Page