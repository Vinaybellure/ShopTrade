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



function WishList(props)
{
    const [wishlist, setwishlist] = useState([])
    
    useEffect(() =>
    {
        let dta = JSON.parse(localStorage.getItem('wishlist'))
        setwishlist(dta)

    }, [])
    // console.log(cart)

    const handleRemove = (e) =>
    {
        let data =  [...wishlist]
        let data1=  data.filter(item => item.id !== e);
        setwishlist(data1)
        localStorage.setItem("wishlist", JSON.stringify(data1));

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
            (!wishlist) ?  <p onClick={handleAddCart}>Add to cart </p> : 
            (wishlist.length ==0 ) ? <p>No items in WishList</p> :
            <div>
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
            </div>
            
            <div className="container">
            <h5 className="mt-4">WISHLIST</h5>
                <div className="row">
                    {
                    wishlist.map(post => {
                        return (
                        <div className="col-md-6 col-sm-12 col-lg-6 col-xl-3 col-12 pr-1 pl-1 pt-3 pb-3" key={post.id}>
                            <div >
                                <div className="pb-2 ">
                                    <img src={post.image_src} className="responsive" style={{width: '100%' , }}/>
                                </div>
                                <div className=" ml-4 d-md-flex">
                                <button className="btn btn-light mr-2 mt-2 btn-block " onClick={()=>HandleClick(post)}><i class="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;&nbsp;To Cart</button>
                                <button className="btn btn-light mt-2 btn-block  "  onClick={() => handleRemove(post.id)}><i class="far fa-trash-alt"></i>&nbsp;&nbsp;REMOVE</button>
                                </div>
                                
                                <h6 className="ml-4">{post.vendor}</h6>
                                <p className="mb-0 ml-4" style={{fontSize: "12px"}}>{post.name}</p>
                                <p className="mb-0 ml-4" style={{fontSize: "12px"}}>Price : {post.price}</p>
                            </div>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>

            
            }
        </div>
    )
}

export default withRouter(WishList)