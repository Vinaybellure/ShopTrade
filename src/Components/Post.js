import React, { useEffect, useState } from 'react'
import { HashLink as Link } from "react-router-hash-link";
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import { LazyImage } from './utils/LazyImage';
import { Dropdown } from 'react-bootstrap';

function Post(props)
{
    // console.log("Post",props.posts)
    var [posts, setposts]= useState([])
    const [label, setlabel] = useState('All Products')
    const [search, setsearch] = useState("")
    const [sort, setsort] = useState("")

    useEffect(async () =>
{
    const fetchData = async () =>
    {
        const result = await axios.get("https://cdn.shopify.com/s/files/1/0455/2176/4502/files/products.json")
        let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
        let correct = result.data.replace(regex, "");
        setposts(JSON.parse(correct));
    }
    fetchData();
}, [])

    const HandleClick=(post)=>{
        props.history.push({
            pathname:'/post-details',
            state:post
        })
    }
    
    const handleJacket = (e) =>
    {
        setsearch(e.target.value)
        setlabel(e.target.value)
        console.log(e.target.value)
    }
    const sorting = (e) =>
    {
        setsort(e.target.value)
        
    }
    if(search == 'All products')
    {
        setsearch('');
    }

    if(sort.length > 0)
    {
        posts = posts.sort((a,b) => (sort=='lowest') ? (a.price - b.price) : (b.price - a.price))
    }

    if(search.length >0)
    {
        posts= posts.filter(post => {
            return post.tag.match(search)
        })
    }




    

    return (
    <div>
                <div className="container-fluid mt-3">
            <div>
                <h6>{label} ({posts.length}) </h6>
            </div>
            
        </div>
        <div className="container-fluid mt-3">
                <div className="d-md-flex d-none  justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <h5 className="m-0 p-0 mr-4">FILTERS</h5>
                        <button onClick={handleJacket} className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-2" style={{backgroundColor: 'white', border: '1px solid black', fontSize: "12px"}} value="All products">All Products</button>
                        <button onClick={handleJacket} className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-2" style={{backgroundColor: 'white', border: '1px solid black', fontSize: "12px"}} value="T-shirt">T-Shirts</button>
                        <button onClick={handleJacket} className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-2" style={{backgroundColor: 'white', border: '1px solid black', fontSize: "12px"}} value="Denim">Denim</button>
                        <button onClick={handleJacket} className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-2" style={{backgroundColor: 'white', border: '1px solid black', fontSize: "12px"}} value="shirt">Shirt</button>
                        <button onClick={handleJacket} className="button2 btn rounded-right rounded-left pl-2 pr-2 pt-1 pb-1 mr-2" style={{backgroundColor: 'white', border: '1px solid black', fontSize: "12px"}} value="jacket">Jacket</button>
                    </div>
                    <div>
                        <select name="Sort By.." onChange={sorting}>
                            <option  >Sort By... </option>
                            <option value="lowest">Price Low to high</option>
                            <option value="highest">Price High to Low</option>
                        </select>   
                    </div>
                </div>
            </div>

            <div className='d-md-none d-flex justify-content-between align-items-center'>
                <select name="Filters" onChange={handleJacket}>
                    <option value="All products" >All Products</option>
                    <option value="T-shirt" >Tea Shirts</option>
                    <option value="Denim" >Denim</option>
                    <option value="shirt" >Shirt</option>
                    <option value="jacket" >Jacket</option>
                </select>

                <select name="Sort By.." onChange={sorting}>
                    <option  >Sort By... </option>
                    <option value="lowest" >Price Low to high</option>
                    <option value="highest" >Price High to Low</option>
                </select>      
            </div>

            <div className="container-fluid">
            <hr/>
        </div>
            
        <div className="container-fluid">
            <div className="row">
                {
                posts.map(post => {
                    return (
                    <div style={{cursor: 'pointer'}} className="col-md-3 col-sm-4 col-lg-2 col-6 pr-3 pl-1 pt-3 pb-3 " key={post.id}>
                        
                        <div onClick={()=>HandleClick(post)} className="zoom1">
                            <div className="pb-2 ">
                                <LazyImage src={post.image_src} className="responsive" style={{width: '100%' , }}/>
                            </div>
                            <h6 className="ml-4">{post.vendor}</h6>
                            <p className="mb-0 ml-4" style={{fontSize: "12px"}}>{post.name}</p>
                            <p  className="mb-0 ml-4" style={{fontSize: "12px"}}>Rs : {post.price}  &nbsp;<span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'gray',}}>Rs : {post.compare_at_price}</span>&nbsp;&nbsp;<span style={{color: '#ff905a'}}>({(((post.compare_at_price-post.price)/post.compare_at_price)*100).toFixed(2)}% off)</span></p>
                        </div>
                        
                    </div>
                    )
                })
                }
            
            </div>
            </div>
            
        </div>
    )
}
export default withRouter(Post)