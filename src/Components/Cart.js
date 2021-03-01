import React, { useEffect, useState } from 'react'
import { HashLink as Link } from "react-router-hash-link";
import axios from 'axios'
import { getQueryStringParams } from '../Components/utils/utils'
import {
    BrowserRouter as Router,
    Route,
    withRouter
  } from "react-router-dom";
import bgimage from '../images/image1.png'
import logo from '../images/logo.png'



function Cart(props)
{
    const [cart, setcart] = useState([])
    const [size, setsize] = useState([])
    
    useEffect(() =>
    {
        let dta = JSON.parse(localStorage.getItem('cart')) || []
        setcart(dta)
        setsize(dta.selctedSize)

    }, [])
    // console.log(cart)

    const handleRemove = (id,size) =>
    {
        console.log(id,size);
        let data =  [...cart]
        let data1=  data.filter(item => item.id !== id || item.selctedSize !== size);
        setcart(data1)
        localStorage.setItem("cart", JSON.stringify(data1));

    }
    
    const HandleClick=(post)=>{
        props.history.push({
            pathname:'/post-details',
            state:post
    })
    }



    const handleAddCart = (e) =>
    {
        props.history.push({
            pathname:'/post-details'
    })
    }




    return (
        <div>
            {
                (!cart) ?  <p onClick={handleAddCart}>Add to cart </p> : 
                (cart.length ==0 ) ? <p>No items in Cart</p> :
                <div className="container-fluid p-0 m-0">
                <div className="py-3 text-center" style={{ backgroundImage: `url(${bgimage})` }}>
                    <p className="mb-0 mr-2" style={{color: 'white', fontSize: '12px'}}>Invite Friends TO Big Fashion Festival and get up to $150 MynCash For Every Person who Vists <button className="button2 btn rounded-right rounded-left px-2 pt-1 pb-1 ml-2 mt-2 mt-md-0" style={{backgroundColor: 'white', border: 'none', fontSize: "12px"}}>Invite Now</button></p>
                </div>
                <div className="container-fluid p-0 m-0">
                    <div className="py-4 px-4 shadow  bg-white rounded d-md-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center ">
                            <img src={logo} className="responsive" /><h3 className="p-0 m-0 ml-2">SHOP TRADE</h3>
                        </div>
                        <div className="mt-4 mt-md-0">
                            <button className="btn btn-light px-3 py-3" style={{color: 'green', fontWeight: 'bold'}}><i class="far fa-address-card mr-2"></i> CONTACT US</button>
                        </div>
                        
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-7">
                            <div class="shadow-sm p-3 mb-5 bg-white rounded">
                                <h5 className="mb-4">YOUR CART {cart.length} ITEM (S)</h5>
                                <hr/>
                                <div className="container-fluid">
                                    
                                        {
                                            cart.map(post =>{
                                                return (
                                                    <div>
                                                    <div className="row mt-2">
                                                        <div className="col-3" onClick={()=> HandleClick(post)}>
                                                        <img src={post.image_src} className="responsive" style={{width: '100%' , }}/>
                                                        </div>
                                                        <div className="col-9">
                                                            <h6 className="" style={{color: 'green'}}>{post.vendor} {post.name}</h6>
                                                            <p className="mb-1">Type : {post.tag}</p>
                                                            <p className="mb-1">Item Price: {post.price}</p>
                                                            <p className="mb-1">Size : {post.selctedSize}</p>
                                                            <div className="d-md-flex ">
                                                                {/* <button className="btn btn-light mr-2 mt-2" onClick={()=> HandleMoveWishlist(post)}><i class="fa fa-heart-o" aria-hidden="true" ></i>&nbsp;&nbsp;WishList</button> */}
                                                                <button className="btn btn-light mt-2" onClick={() => handleRemove(post.id, post.selctedSize)}><i class="far fa-trash-alt"></i>&nbsp;&nbsp;REMOVE</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="shadow-sm p-5 mb-5 bg-white rounded ">
                                <h5>OREDR Summary</h5>
                                <div className="d-flex pt-4 justify-content-between">
                                    <h6>Order Value</h6>
                                    <h6>Rs : {
                                        cart.map(post =>{
                                            return JSON.parse(post.price)
                                        }).reduce((a,b,i) => a+b,0)
                                    }</h6>
                                </div>  
                                <div className="d-flex pt-4 justify-content-between">
                                    <h6>Shiping Price</h6>
                                    <h6><span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'gray', }}>Rs: 90</span> Free</h6>
                                </div>   
                                <hr/>   
                                <div className="d-flex  justify-content-between">
                                    <h6>Total Price</h6>
                                    <h6>Rs : {
                                        cart.map(post =>{
                                            return JSON.parse(post.price)
                                        }).reduce((a,b,i) => a+b,0)
                                    }</h6>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            }
        </div>
    )
}

export default withRouter(Cart)