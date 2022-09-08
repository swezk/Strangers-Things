import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getMe, deletePost } from '../api'


const Profile = ( { token, setToken, isLoggedIn, currentUser, username } ) => {
    const [myPosts, setMyPosts] = useState([]);
    const [myMessages, setMyMessages] = useState([])



 
    
    useEffect(() => {
        
        const getMyProfile = async () => {

            const userObject = await getMe(JSON.parse(localStorage.token));
            setMyPosts(userObject.data.posts)
            setMyMessages(userObject.data.messages)

        }

      getMyProfile();
      console.log("isLoggedin:", isLoggedIn)

    
    }, [isLoggedIn, setMyPosts])







    return (
        <div className="profile-container">
            {
                !isLoggedIn
                    ? 
                    <Navigate to="/log-in/"/>
                    :
                        
                    <div>
                        <h1 id='welcome'>Welcome, {username}</h1>
                        <section id='my-messages-container'>
                        <h1 id="messages-title">My Messages</h1>
                            {
                            myMessages.length === 0
                            ?
                                <h3>You Don't Have Any Messages</h3>
                            :
                                myMessages.map((message, idx) => {
                                                                        
                                    return (
                                        <section className='each-post-section' key={idx}>
                                            <span className="message-label">Item: </span>
                                            <span className="message-detail">{message.post.title}</span><br></br>
                                            <span className="message-label">From User: </span>
                                            <span className="message-detail">{message.fromUser.username}</span><br></br>
                                            <span className="message-label">Message: </span>
                                            <span className="message">{message.content}</span><br></br>
                                        </section>
                                    )
                                })
                            }
                        </section>
                        <section className='my-posts-container'>
                        <h1 id='posts-title'>My Posts</h1>
                            {
                            myPosts.length === 0
                            ?
                                <h3>You Don't Have Any Posts</h3>
                            :
                                myPosts.map((mypost, idx) => {
                                    
                    
                                    return (
                                        <section 
                                            className='each-post-section' 
                                            key={idx}
                                            id= { mypost.active ? "active-post" : "deleted-post" }
                                        >   
                                            <span id="post-id">id:{mypost._id}</span><br></br>
                                            <span className="post-label">Item: </span>
                                            <span className="post-title">{mypost.title}</span><br></br>
                                            <span className="post-label">Location: </span>
                                            <span className="post-location">{mypost.location}</span><br></br>
                                            <span className="post-label">Status: </span>
                                            <span className="post-status">{mypost.active ? "Active" : <em>"No Longer Active"</em>}</span><br></br>
                                            <span className="post-label">Description: </span>
                                            <span className="post-description">{mypost.description}</span><br></br>
                                            <span className="post-label">Price: </span>
                                            <span className="post-price">{mypost.price}</span><br></br>
                                            <span className="post-label">Delivery Available: </span>
                                            <span className="post-delivery">{mypost.willDeliver ? "Yes" : "No"}</span><br></br>
                                            <button
                                                    className='delete-post'
                                                    disabled= {mypost.active ? false : true }
                                                    onChange= {(evt) => deletePost(token, mypost._id)}
                                                
                                                    >Delete Post
                                                </button>
                                            <span className='edit-post'>
                                            <div id='edit-post-link'
                                                    hidden={!mypost.active}>
                                                        <Link to={`/edit-post/:${mypost._id}`} >Edit Post</Link>
                                            </div>
                                            </span>
                                        </section>
                                        )
                                })
                                
                            }
                        </section>
                    </div>
            }  
        </div>
    )
}

export default Profile;