import React, { useEffect, useState } from 'react';
import axios from "axios";

function useFetch({ user, task="login" }) {
    const loginPath = '/user/login';
    const registerPath = '/user/register';
    const baseURL = "http://192.168.0.134:8000";

    const client = axios.create({
        baseURL: baseURL
    });

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    // function login() {
    //     client.post(`{loginPath}`, 
    //         body: user
    //     ).then(res => setPost(res.data)).catch(
    //         err => setError(err)
    //     );
    // }

    if (error) return `Error ${error}`;
    if (!post) return `No post`;

  return (
    <div>useFetch</div>
  )
}

export { useFetch };