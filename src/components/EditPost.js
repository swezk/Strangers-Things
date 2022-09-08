import React, { useState, useEffect }from "react";
import { useParams} from 'react-router-dom';
import { fetchAllPosts, patchEdit } from "../api";



const EditPost = ({ isLoggedIn, token }) => {
    const { postId } = useParams();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('[On Request]')
    const [willDeliver, setWillDeliver]= useState(false)
    const [postList, setPostList] = useState([])
    const [editSuccess, setEditSuccess] = useState(false);

    let postIdArray = postId.split('');
    postIdArray.shift();
    let colonlessPostId = postIdArray.join('')


    useEffect(() =>  {
        
        
        const getPosts = async () => {
            const returnedPosts = await fetchAllPosts(token);
            setPostList(returnedPosts);
        }

    getPosts();
    }, [isLoggedIn])


   

    const submitEdits = async (evt) => {
        evt.preventDefault();
        const result = await patchEdit(colonlessPostId, token, title, description, price, location, willDeliver)
        if (result.success) {
            setEditSuccess(result.success)
            setTitle(result.data.post.title)
            setLocation(result.data.post.location)
            setDescription(result.post.data.description)
            setPrice(result.data.post.price)
            setWillDeliver(result.data.post.willDeliver)
        }
        console.log(result)
        return result;
    }
    


    return (
        <section id='edit-post-container'>
            {
                postList.map((eachPost, idx) => {
                    {
                        if (eachPost._id === colonlessPostId) {
                            return (
                            <section className="each-post-section" key={idx}>
                                <h1>My Post</h1>
                                <p hidden={!editSuccess}>*UPDATED*</p>
                                <span className="post-label">Item: </span>
                                <span className="post-title">{ editSuccess ? title : eachPost.title}</span><br></br>
                                <span className="post-label">Location: </span>
                                <span className="post-location">{ editSuccess ? location : eachPost.location}</span><br></br>
                                <span className="post-label">Description: </span>
                                <span className="post-description">{ editSuccess ? description : eachPost.description}</span><br></br>
                                <span className="post-label">Price: </span>
                                <span className="post-price">{ editSuccess ? price : eachPost.price}</span><br></br>
                                <span className="post-label">Delivery Available: </span>
                                <span className="post-delivery">{ editSuccess ? willDeliver : eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                             </section>
                            )
                        }
                    }
                })

            }
   
            <h1>Edit Post</h1>          

            
                <form
                    id='edit-post-form'
                    onSubmit={submitEdits}
                >
                    <input
                        type='text'
                        placeholder="Title"
                        required
                        onChange={(evt) => setTitle(evt.target.value)}
                    ></input>
                    <input
                        type='text'
                        required
                        placeholder="Location"
                        onChange={(evt) => setLocation(evt.target.value)}
                    ></input>
                    <input
                        type='text'
                        required
                        placeholder="Description"
                        onChange={(evt) => setDescription(evt.target.value)}
                    ></input>
                    <input
                        type='text'
                        required
                        placeholder="Price"
                        onChange={(evt) => setPrice(evt.target.value)}
                    ></input>                    
                    <label id='delivery-label'>Willing to Deliver?</label>
                    <input
                        type='checkbox'
                        id="willdeliverycheckbox"
                        onChange={(evt) => setWillDeliver(!willDeliver)}
                    ></input>
                    <input
                        type="submit"
                        disabled= {isLoggedIn ? false : true}
                        value="Edit My Post"
                    ></input>
                </form>
            
        </section>
    )
}



export default EditPost;