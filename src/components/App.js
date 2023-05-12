import React from 'react';
import Login from "./Login";
import Signup from "./Signup";
import Reset from "./Reset";
import Listings from "./Listings";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import NoPage from "./NoPage";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AuthLayout from "./AuthLayout";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const { currentUser, listings } = useAuth();
  
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<AuthRoute user={currentUser} />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<Reset />} />
          </Route>
        </Route>

        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute user={listings} redirectPath="/" />} >
            <Route path="/flight/listings" element={<Listings />} />
          </Route>

          <Route path="*" element={<NoPage />} />
          <Route element={<ProtectedRoute user={currentUser} redirectPath="/login" />}>
            <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
            <Route path="/settings" element={<Settings user={currentUser} />} />
          </Route>
        </Route>
      </Routes>
  )
}

export default App;