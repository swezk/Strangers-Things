import React, { useEffect, useState } from "react";
import {  fetchAllPosts, deletePost } from "../api";
import { Navigate, Link } from 'react-router-dom'

const Posts = ({ isLoggedIn, token, currentUser, username, postList, setPostList }) => {
  
    const [postUpdate, setPostUpdate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [messageSubmit, setMessageSubmit] = useState(false);
    const [postId, setPostId] = useState('')
 

    
    useEffect(() =>  {
        let returnedPosts= []

        const getPosts = async () => {
            returnedPosts = await fetchAllPosts(token);
            setPostList(returnedPosts);
        }
        getPosts()
    }, [isLoggedIn, postUpdate])


    function postMatches(eachPost, searchTerm) {
            let instances = 0;
            let isItThere = false;
                let postTitleArray = eachPost.title.toLowerCase().split(" ")
                let postAuthArray = eachPost.author.username.toLowerCase().split(" ")
                let postPriceArray = eachPost.price.toLowerCase().split(" ")
                let postDescArray = eachPost.description.toLowerCase().split(" ")
                isItThere = postTitleArray.includes(searchTerm) || postDescArray.includes(searchTerm) || postAuthArray.includes(searchTerm) || postPriceArray.includes(searchTerm)
                if (isItThere) {
                    instances++
                }
            if (instances > 0) {
                isItThere = true;
            }
    return isItThere
    }

    const filteredPosts = postList.filter(eachPost => postMatches(eachPost, searchTerm))
    const postsToDisplay = searchTerm.length ? filteredPosts : postList;

    function messageSubmitHandler (postid) {
        setPostId(postid);
        setMessageSubmit(true);
    }
  

    return (
            <div id="posts-container">
                {
                 messageSubmit ?
                                            
                <Navigate to={`/add-message/:${postId}`} />
                :
                null
                }
                    <Link id="add-post-link" to='/add-post'>Add Post</Link>
                    
                        <input
                            id='search-words'
                            type='text'
                            value={searchTerm}
                            placeholder="Search Posts..."
                            onChange={(evt)=> setSearchTerm(evt.target.value)}
                        ></input>
                    
                    {
                        searchTerm.length 
                        ? 
                            postsToDisplay.map((eachPost,idx) => {
                                return (
                                    <section className="each-post-section" key={idx}>
                                        <span id="post-id">id:{eachPost._id}</span><br></br>
                                        <span className="post-label">Item: </span>
                                        <span className="post-title">{eachPost.title}</span><br></br>
                                        <span className="post-label">Location: </span>
                                        <span className="post-location">{eachPost.location}</span><br></br>
                                        <span className="post-label">Posted By: </span>
                                        <span className="post-author">{eachPost.author.username}</span><br></br>
                                        <span className="post-label">Status: </span>
                                        <span className="post-status">{eachPost.active ? "Active" : "No Longer Active"}</span><br></br>
                                        <span className="post-label">Description: </span>
                                        <span className="post-description">{eachPost.description}</span><br></br>
                                        <span className="post-label">Price: </span>
                                        <span className="post-price">{eachPost.price}</span><br></br>
                                        <span className="post-label">Delivery Available: </span>
                                        <span className="post-delivery">{eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                                        <button
                                                className='message-button'
                                                onClick={(evt) => {messageSubmitHandler(eachPost._id)}}>Message</button>
                                        <span><button
                                            className="delete-post"
                                            hidden={ username === eachPost.author.username ? false : true}
                                            onClick={(evt) => deletePost(token, eachPost._id)}
                                            onChange={(evt) => setPostUpdate('updated')}
                                            >Delete my post</button></span>
                                    </section>
                                )
                            })
                        :
                            postList.map((eachPost, idx) => {

                                return (
                                    <section className="each-post-section" key={idx}>
                                        <span id="post-id">id:{eachPost._id}</span><br></br>

                                        <span className="post-label">Item: </span>
                                        <span className="post-title">{eachPost.title}</span><br></br>
                                        <span className="post-label">Location: </span>
                                        <span className="post-location">{eachPost.location}</span><br></br>
                                        <span className="post-label">Posted By: </span>
                                        <span className="post-author">{eachPost.author.username}</span><br></br>
                                        <span className="post-label">Status: </span>
                                        <span className="post-status">{eachPost.active ? "Active" : "No Longer Active"}</span><br></br>
                                        <span className="post-label">Description: </span>
                                        <span className="post-description">{eachPost.description}</span><br></br>
                                        <span className="post-label">Price: </span>
                                        <span className="post-price">{eachPost.price}</span><br></br>
                                        <span className="post-label">Delivery Available: </span>
                                        <span className="post-delivery">{eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                                        <button
                                                className='message-button'
                                                onClick={(evt) => {messageSubmitHandler(eachPost._id)}}>Message</button>
                                        <span><button
                                            className="delete-post"
                                            hidden={ username === eachPost.author.username ? false : true}
                                            onClick={(evt) => deletePost(token, eachPost._id)}
                                            onChange={(evt) => setPostUpdate('updated')}
                                            >Delete my post</button></span>
                                   
                                        
                                    </section>
                                )
                            })
                    }
        </div>
    )
} 

export default Posts;