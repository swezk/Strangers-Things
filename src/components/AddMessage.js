import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postMessage, fetchAllPosts } from "../api";




const AddMessage = ({ username, token, isLoggedIn}) => {
    const { postId } = useParams();
    const [messageContent, setMessageContent] = useState('');
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [newMessageDisplay, setNewMessageDisplay] = useState('')
    const [allPosts, setAllPosts] = useState([]);

    let postIdArray = postId.split('');
    postIdArray.shift();
    let colonlessPostId = postIdArray.join('')

    useEffect(() =>  {
        
        const getPosts = async () => {
            let returnedPosts = await fetchAllPosts(token);
            setAllPosts(returnedPosts);
        }


    getPosts();
    }, [])

   

    const submitMessage = async (evt) => {
        evt.preventDefault();
            console.log("token: ", token)
            console.log("postId: ", colonlessPostId)
            console.log("messagecontent: ", messageContent)
        const result = await postMessage(colonlessPostId, token, messageContent)
        if (result.success) {
            setMessageSuccess(true)}
            setNewMessageDisplay(result.data.message.content)
        return result;
    }


    return (
        <section id="add-message-container">
            {
                allPosts.map((eachPost, index) => {
                    { 
                        if (eachPost._id === colonlessPostId) {
                            return (
                            <section className ="each-post-section" key={index}>
                                <span className="post-label">Item: </span>
                                <span className="post-title">{eachPost.title}</span><br></br>
                                <span className="post-label">Location: </span>
                                <span className="post-location">{eachPost.location}</span><br></br>
                                <span className="post-label">Description: </span>
                                <span className="post-description">{eachPost.description}</span><br></br>
                                <span className="post-label">Price: </span>
                                <span className="post-price">{eachPost.price}</span><br></br>
                                <span className="post-label">Delivery Available: </span>
                                <span className="post-delivery">{eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                            </section>)
                        }
                    }
                })
                    
            }

            <form id= 'message-form'
                onSubmit={submitMessage}>
                <input
                    id='message-box'
                    type='text'
                    value={messageContent}
                    placeholder="message content"
                    onChange={(evt) => setMessageContent(evt.target.value)}
                    >
                </input>
                <input
                    id="submit-message"
                    type="submit"
                    disabled= {isLoggedIn ? false : true}
                    value={isLoggedIn ? "Submit" : "Please Log In"} >
                </input>
            </form>
            {
                messageSuccess ?
                <section className="each-post-section">
                    <span className="message-label">Message: </span>
                    <span className="message-content">{newMessageDisplay}</span><br></br>                 
                </section>
                :
                null
            }
           
        </section>
    )

}

export default AddMessage;