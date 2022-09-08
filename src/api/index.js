import React from "react";
export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const cohortName = '2204-ftb-et-web-ft-pt';

export const postMessage = async (colonlessPostId, token, messageContent) => {

    try {
        const response = await fetch (`${BASE_URL}/api/${cohortName}/posts/${colonlessPostId}/messages`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                "content": messageContent
                }
            })
        });
        const result = await response.json();

            return result;
    } catch(error) {
            console.error(error)
        }
}


export const patchEdit = async (colonlessPostId, token, title, description, price, location, willDeliver) => {
    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts/${colonlessPostId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    "title": title,
                    "description": description,
                    "price": price,
                    "location": location,
                    "willDeliver": willDeliver
                }
                })
        });
            const result = await response.json();
            return result;
    } catch(error) {
            console.error(error)
        }

}




export const deletePost = async (token, postID) => {
    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts/${postID}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
        } catch(error) {
            console.error(error)
        }
}

export const postPost = async (token, title, description, price, location, willDeliver) => {
    try{
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    "title": title,
                    "description": description,
                    "price": price,
                    "location": location,
                    "willDeliver": willDeliver
                }
                })

        }
        );
            const result = await response.json();
            return result.data.post;
    } catch(error) {
        console.error(error)
    }
}




export const getMe = async (token) =>  {

    try{
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
            const result = await response.json();
            return result;
    } catch(error) {
        console.error(error)
    }

}


export const postLogIn = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/login`, 
                {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user: {
                        "username": username,
                        "password": password
                    }
                    })
                }
        );
        const result = await response.json()
        return result;    
    } catch(error){
        console.log(error)
    }
}



export const postNewUser = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/register`, 
                {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user: {
                        "username": username,
                        "password": password
                    }
                    })
                }
            );
        const result = await response.json()
        return result; 
        }
        catch(error){
            console.log("Error")
        }
}

export const fetchPosts = async () => {
 
    try {
      const response = await fetch(`${ BASE_URL }/api/${ cohortName }/posts`);
      const data = await response.json();
      const actualPosts = data.data.posts
      return actualPosts;
    } catch (error) {
      console.error(error);
      }
  }

  export const fetchAllPosts = async (token) => {
    try {
        const response = await fetch(`${ BASE_URL }/api/${ cohortName }/posts`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        const actualPosts = data.data.posts
        return actualPosts;
    } catch (error) {
        console.error(error)
        } 
  }