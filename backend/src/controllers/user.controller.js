import express from "express"     //Used to create routes and handle HTTP requests (like POST, GET).
import jwt from "jsonwebtoken"     //Used to generate JWT tokens after login.
import { OAuth2Client } from "google-auth-library";   //A Google-provided library to verify the login token from Google Sign-In.
import usermodels from "../models/usermodels.js";    //Mongoose model for storing users in MongoDB.

export const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)  //Helps verify the Google token

export const login =  async(req, res) => {
    const {token} = req.body;        //This gets the token sent by the frontend (Google ID token).

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
    //This line checks if the token really came from Google and is valid.audience = your Google Client ID → Google ensures it's for your app only.
        const payload = ticket.getPayload();
        const {email, name, picture} = payload;   //After verification, Google sends user data.

        let user = await usermodels.findOne({ email });   //Check if this Google user is already registered in your database.
        if(!user) {
            user = await usermodels.create({   //If the user doesn't exist, you create a new user in your database.
                name,
                email, 
                avatar:picture,         //profile picture from Google.
                provider:"google",     // helps you know this is a Google login.
            });
        }
       const jwtToken = jwt.sign({ id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});   //You create a JWT token with the user's ID.

       res.cookie("token", jwtToken, {
        httpOnly : true,   // Client-side JS cannot access the cookie (secure).
        secure: false,     //Allow HTTP for now (set to true in production with HTTPS).
        sameSite:   "Lax",

       });
       res.status(200).json({ success: true, user, token: jwtToken});   //Send back the user data and token to the frontend (React, 
    }catch (err) {
       console.log(err);
       res.status(400).json({success:false, error: "Google authentication failed"});
    } 
};


export const getUser = async(req, res) => {
    const user = await usermodels.findById(req.userId);
    res.status(200).json({success: true, user})
}


export const logout = async(req, res) => {
     res.clearCookie("token").json({succeess: true, message: "Logged out" });
}

