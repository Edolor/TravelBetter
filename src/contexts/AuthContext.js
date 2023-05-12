import React, { createContext, useContext , useState, useEffect } from 'react';
import axios from "axios";
import { Spinner } from "react-bootstrap";

const AuthContext = createContext();

// const baseURL = "http://192.168.8.3:8000";
const baseURL = "http://flightfinder-env.eba-ccsm8awd.us-east-1.elasticbeanstalk.com";

const client = axios.create({
    baseURL: baseURL
});

function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [savedDeals, setSavedDeals] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);
    const [userQuery, setUserQuery] = useState(null);

    // HANDLE SETTING OF currentUser
    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token")

            if (token) {
                try {
                    let details = await getUserDetails(token);
                    let url = await getUserPhoto(token);
                    let deals = await getSavedDeals(token);
                    
                    setSavedDeals(deals);
                    setToken(token);
                    setCurrentUser({...details, ...url});
                } catch {}
            }

            setLoading(false); //done loading here
        }

        getData();
    }, []);

    function signup(firstname, lastname, email, password) {

        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        return client.post(
            "/user/register/", user
        );
    }

    function login(email, password) {
        const user = {
            email: email,
            password: password
        }

        return client.post(
            "/user/login/", user
        );
    }

    function resetPassword(email) {
        const user = {
            email: email
        }

        return client.post(
            "/user/reset-password/", user
        );
    }

    async function getUserDetails(token) {
        const result = await client.get(
            "/user/details/",
            {
                headers: { 'Authorization': `Token ${token}`}
            }
        )

        return result.data;
    }
    
    async function getUserPhoto(token) {
        const result = await client.get(
            "/user/profile/picture/",
            {
                headers: { 'Authorization': `Token ${token}`}
            }
        )

        return result.data;
    }

    async function getSavedDeals(token) {
        return await client.get(
            "/deal/retrieve/",
            {
                headers: { 'Authorization': `Token ${token}`}
            }
        )
    }

    async function saveDeal(data, token) {
        return await client.post(
            "/deal/save/", data,
            {
                headers: { 'Authorization': `Token ${token}`}
            }
        );
    }

    function getUserDeals(data) {
        return client.post(
            "/deal/find/", data
        );
    }

    async function logout() {
        return await client.get(
            "/user/logout/",
            {
                headers: { 'Authorization': `Token ${token}`}
            }
        );
    }

    function updateEmail(email) {
        const user = {
            email: email
        }

        return client.post(
            "/user/details/", user, {
                headers: { 'Authorization': `Token ${token}`}
            }
        );
    }

    function updateName(firstname, lastname) {
        const user = {
            firstname: firstname,
            lastname: lastname
        }

        return client.post(
            "/user/details/", user, {
                headers: { 'Authorization': `Token ${token}`}
            }
        );
    }
    
    function updatePhoto(data) {

        return client.post(
            "/user/profile/picture/", data, {
                headers: { 
                    'Authorization': `Token ${token}`,
                    "Content-type": "multipart/form-data",
                }
            }
        );
    }

    function updatePassword(oldPassword, newPassword) {
        const user = {
            oldpassword: oldPassword,
            newpassword: newPassword
        }

        return client.post(
            "/user/change-password/", user, {
                headers: { 'Authorization': `Token ${token}`}
            }
        );
    }

    const value = {
        currentUser,
        login,
        signup,
        logout,
        token,
        updateEmail,
        updateName,
        updatePassword,
        updatePhoto,
        getUserDetails,
        setCurrentUser,
        resetPassword,
        savedDeals,
        getUserDeals,
        getUserPhoto,
        setListings,
        listings,
        setUserQuery,
        userQuery,
        saveDeal,
        getSavedDeals
    };

    const spinner = (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <Spinner animation="grow" size="xl" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

  return ( // Use the loading to render after login check if made, one can also render a spinner here
    <AuthContext.Provider value={value}>
        { !loading ? children : spinner}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth };