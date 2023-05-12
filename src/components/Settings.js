import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Settings() {
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const photoRef = useRef();
  const lastNameRef = useRef();

  const { currentUser, updatePassword, updateName, updateEmail, updatePhoto } = useAuth();

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const [nameSuccess, setNameSuccess] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [photoSuccess, setPhotoSuccess] = useState("");
  

  const [emailLoading, setEmailLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  async function handleName(e) {
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
        setNameError("");
        setNameSuccess("");
        setNameLoading(true);

        await updateName( 
                firstNameRef.current.value, 
                lastNameRef.current.value,
        );

        setValidated(true);

        setNameSuccess("Name changed successfully.")
        
        form.reset();
    } catch(err) {
        if (err?.response?.status === 400) {
            setNameError("Change failed, check your input");
        } else {
            setNameError("Name change failed");
        }
    }

    setNameLoading(false);
  }
  
  async function handlePhoto(e) {
    e.preventDefault();
    
    if (!photoRef.current.files[0]) {
        return setPhotoError("Please select a photo.");;
    }
    
    const fileData = photoRef.current.files[0];
    const data = new FormData();
    data.append("profilepic", fileData);

    try {
        setPhotoError("");
        setPhotoSuccess("");
        setPhotoLoading(true);

        await updatePhoto(data);

        setValidated(true);

        setPhotoSuccess("Photo changed successfully.");
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } catch(err) {
        if (err?.response?.status === 400) {
            setPhotoError("Change failed, check your input");
        } else {
            setPhotoError("Photo change failed");
        }
    }

    setPhotoLoading(false);
  }

  async function handlePassword(e) {
    e.preventDefault();

      const form = e.currentTarget;

    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        
        return form.classList.add("was-validated");
    } else {
        form.classList.remove("was-validated");
    }

    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      return setPasswordError("New and Confirm passwords don't match");
    }

    try {
        setPasswordError("");
        setPasswordSuccess("");
        setPasswordLoading(true)

        await updatePassword( 
                oldPasswordRef.current.value, 
                newPasswordRef.current.value,
        );

        setValidated(true);

        setPasswordSuccess("Password changed successfully.")
        
        form.reset();
    } catch(err) {
        if (err?.response?.status === 400) {
            setPasswordError("Old password is incorrect");
        } else {
            setPasswordError("Password change failed");
        }
    }

    setPasswordLoading(false);
  }

  async function handleEmail(e) {
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
        setEmailError("");
        setEmailSuccess("");
        setEmailLoading(true);

        await updateEmail( 
          emailRef.current.value
        );

        setValidated(true);

        setEmailSuccess("Email changed successfully.")
        
        form.reset();
    } catch(err) {
        if (err?.response?.status === 400) {
            setEmailError("Email format is invalid");
        } else {
            setEmailError("Email change failed");
        }
    }

    setEmailLoading(false);
  }

  return (
    <>
    <h1 className="text-center bg-grey--light-2 py-3 font-weight-600">Update Account</h1>
    
    <Card className="py-4 px-4 btn--bare width-wrapper">
        <div className="d-flex justify-center">
            <figure className="profile__picture">
                <img src={currentUser.profilePicUrl} alt="User profile photo image" />
            </figure>
        </div>
    
        <Card.Body>
            {photoError  && <Alert variant="danger">{photoError}</Alert>}
            {photoSuccess  && <Alert variant="success">{photoSuccess}</Alert>}

            <Form encType="multipart/form-data" onSubmit={handlePhoto}>
              <div className="d-grid col-1-2 gap-3 align-items-center mb-3">
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control className="pd-input" type="file" ref={photoRef} required />
                    </Form.Group>
    
                <Button type="submit" disabled={photoLoading} className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">
                  {
                      !photoLoading ? <span>Upload Image</span> : (
                      <>
                          <span className="vanish">Update Image</span>
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
                </div>
            </Form>
        </Card.Body>
    </Card>

      <Card className="py-4 px-4 btn--bare width-wrapper">
          <Card.Body>
              {nameError  && <Alert variant="danger">{nameError}</Alert>}
              {nameSuccess  && <Alert variant="success">{nameSuccess}</Alert>}

              <Form noValidate validated={validated} onSubmit={handleName}>
                  <div className="d-grid col-1-2 gap-3 align-items-center mb-3">
                    <Form.Group>
                        <Form.Label id="firstname">Firstname</Form.Label>
                        <Form.Control className="pd-input" type="text" defaultValue={currentUser.firstname} ref={firstNameRef} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid firstname.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="lastname">Lastname</Form.Label>
                        <Form.Control className="pd-input" type="text" defaultValue={currentUser.lastname} ref={lastNameRef} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid lastname.
                        </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <Button type="submit" disabled={nameLoading} className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">
                      {
                          !nameLoading ? <span>Update Account</span> : (
                          <>
                              <span className="vanish">Update Account</span>
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

      <div className="bg-grey--light-2">
        <Card className="py-4 px-4 btn--bare width-wrapper bg-none">
            <Card.Body>
                {emailError  && <Alert variant="danger">{emailError}</Alert>}
                {emailSuccess  && <Alert variant="success">{emailSuccess}</Alert>}

                <Form noValidate validated={validated} onSubmit={handleEmail}>
                    <Form.Group className="mt-4 mb-3">
                        <Form.Label id="email">Email</Form.Label>
                        <Form.Control className="pd-input" type="email" defaultValue={currentUser.email} ref={emailRef} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" disabled={emailLoading} className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">
                        {
                            !emailLoading ? <span>Update Email</span> : (
                            <>
                                <span className="vanish">Update Email</span>
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
      </div>

      <Card className="py-4 px-4 mb-5 btn--bare width-wrapper">
          <Card.Body>
              {passwordError  && <Alert variant="danger">{passwordError}</Alert>}
              {passwordSuccess  && <Alert variant="success">{passwordSuccess}</Alert>}

              <Form noValidate validated={validated} className="mb-3" onSubmit={handlePassword}>
                  <div className="d-grid col-1-3 align-items-center gap-3">
                    <Form.Group className="mt-4">
                      <Form.Label id="oldpassword">Old Password</Form.Label>
                      <Form.Control className="pd-input" type="password" id="oldpassword" ref={oldPasswordRef} required />
                      <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4">
                      <Form.Label id="newpassword">New Password</Form.Label>
                      <Form.Control className="pd-input" type="password" id="newpassword" required ref={newPasswordRef} />
                      <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4">
                      <Form.Label id="confirmpassword">Confirm Password</Form.Label>
                      <Form.Control className="pd-input" type="password" id="confirmpassword" required ref={confirmPasswordRef} />
                      <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <Button type="submit" disabled={passwordLoading} className="mt-3 px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold pos-rel">
                      {
                          !passwordLoading ? <span>Update Password</span> : (
                          <>
                              <span className="vanish">Update Password</span>
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
    </>
  )
}

export default Settings;