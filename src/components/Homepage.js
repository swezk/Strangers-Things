import React from "react";
import { cohortName } from "../api";


const Homepage = ({ isLoggedIn, currentUser, token }) => {




    return (
        <div className="homepage-container">
            <h1>Welcome to Strangers Things!</h1>
            <br></br>
            {
                isLoggedIn ? 
                
                    <div id='homepage-logged-in display'>
                        <h2>Cohort: {cohortName}</h2>
                        <h3>We're logged in as {currentUser.username}</h3>

                    </div>
                
                : "Log In To Start!"
            }
            
                 
            

        </div>
    )
}

export default Homepage;
    
