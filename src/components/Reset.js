import React, { useRef, useState } from 'react'
import { Form, Card, Alert, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import world from "../Assets/img/world.svg"

function Reset() {
    const emailRef = useRef();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            
            return form.classList.add("was-validated");
        } else {
            form.classList.remove("was-validated");
        }
        
        try {
            setSuccess("");
            setError("");
            setLoading(true)
    
            await resetPassword(emailRef.current.value);

            setSuccess("Check you inbox for instructions and recover your password.")
            setValidated(true);
        } catch(err) {
            if (err?.response?.status === 400) {
                setError("Email already exists.");
            } else {
                setError("Could not recover password.");
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

        <h2 className="text-center heading-4 margin-bottom-2">Reset your account</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

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

                    <Button type="submit" disabled={loading} className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">
                        {
                            !loading ? <span>Reset Password</span> : (
                            <>
                                <span className="vanish">Reset Password</span>
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
            Already have an account? <Link to="/login" className="fw-bolder text-primary">Login</Link>
        </div>
    </>
  )
}

export default Reset;