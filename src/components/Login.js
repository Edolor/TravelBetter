import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import world from "../Assets/img/world.svg"

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login, setCurrentUser, getUserDetails, getUserPhoto } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            
            return form.classList.add("was-validated");
        } else {
            form.classList.remove("was-validated");
        }

        try {
            setError("");
            setLoading(true)
    
            const result = await login( 
                    emailRef.current.value, 
                    passwordRef.current.value
            );

            setValidated(true);
            const token = result?.data?.Token;
            
            let details = await getUserDetails(token);
            let url = await getUserPhoto(token);
            setCurrentUser({...details, ...url});

            // Save Token
            localStorage.setItem("token", token);

            // Redirect user
            return navigate("/dashboard");
        } catch(err) {
            if (err?.response?.status === 400) {
                setError("Incorrect username of password.");
            } else {
                setError("Login failed");
            }
        }

        setLoading(false);
    }


  return (
    <>  
        <h1 className="text-center mb-4 font-heading">
            <Link to="/" className="d-flex align-items-center justify-content-center color-grey--dark-2 text-decoration-none">
                <div className="d-flex align-items-center gap-3">
                    <img src={world} alt="world icon" style={{marginBottom: "-4px"}} />
                    <span>Travelbetter</span>
                </div>
            </Link>
        </h1>

        <h2 className="text-center heading-4 margin-bottom-2">Login to your account</h2>

        { error && <Alert variant="danger">{error}</Alert>}

        <Card className="py-4 px-4 border-0 box-shadow--light">
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label id="email">Email</Form.Label>
                        <Form.Control className="pd-input" type="email" ref={emailRef} placeholder="Enter your email address" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="formBasicPassword">
                        <Form.Label id="password">Password</Form.Label>
                        <Form.Control className="pd-input" type="password" ref={passwordRef} placeholder="Enter your password" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button disabled={loading} type="submit" className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">

                        { !loading ? <span>Login</span> : (
                            <>
                                <span className="vanish">Login</span>
                                <span className="pos-abs center-h-v">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </span>
                            </>)
                        }
                    </Button>
                </Form>
            </Card.Body>
        </Card>

        <div className="w-100 mt-4 text-center text-secondary body-copy">
            New to Travelbetter? <Link to="/signup" className="fw-bolder text-primary">Sign up</Link>
        </div>
        <div className="w-100 mt-2 text-center text-secondary body-copy">
            Forgot your password? <Link to="/reset-password" className="fw-bolder text-primary">Reset it here</Link>
        </div>
    </>
  )
}

export default Login