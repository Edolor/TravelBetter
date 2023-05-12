import React from 'react'
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
  
function AuthLayout() {
    return (
        <div className="bg-light">
            <div className="width-wrapper">
                <Container className="d-flex align-items-center justify-content-center pt-5 pb-5" style={{ minHeight: "100vh"}}>
                    <div className="w-100" style={{ maxWidth: "650px"}}>
                        <Outlet />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default AuthLayout