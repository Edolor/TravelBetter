import React, { useRef, useState } from 'react'
import { Form, Button, Card, CardGroup, Spinner } from "react-bootstrap";
import arrowRight from "../Assets/img/chevron_right.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { getUserDeals, setListings, setUserQuery } = useAuth();
  const fromRef = useRef();
  const toRef = useRef();
  const leaveRef = useRef();
  const returnGroupRef = useRef();
  const returnRef = useRef();
  const adultRef = useRef();
  const childrenRef = useRef();
  const infantsRef = useRef();
  const navigate = useNavigate();
  const dateObj = new Date(Date.now() + (48 * 3600 * 1000));
  const futureDateObj = new Date(Date.now() + (96 * 3600 * 1000));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(2);

  const handleRadio = (e) => {
    setRadioValue(value => e.target.value);

    e.target.value === 1 ?
      returnGroupRef.current.classList.add("opacity-0") : returnGroupRef.current.classList.remove("opacity-0");
  };

  const defaultLocation = "enu";
  const locations = [
    {
      id: "1",
      abbr: "los",
      text: "Lagos",
    },

    {
      id: "2",
      abbr: "abv",
      text: "Abuja",
    },

    {
      id: "3",
      abbr: "enu",
      text: "Enugu",
    },

    {
      id: "4",
      abbr: "qow",
      text: "Owerri",
    },

    {
      id: "5",
      abbr: "phc",
      text: "Port Harcourt",
    },
  ];

  let todayDate = dateObj.toLocaleDateString("en-GB");
  let futureDate = futureDateObj.toLocaleDateString("en-GB");

  todayDate = todayDate.split("/");
  futureDate = futureDate.split("/");

  if (todayDate) {
    todayDate = `${todayDate[2]}-${parseInt(todayDate[1]) + 1}-${futureDate[0]}`;
    futureDate = `${futureDate[2]}-${parseInt(futureDate[1]) + 1}-${futureDate[0]}`;
  }

  const data = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    data["type"] = radioValue;
    data["adults"] = adultRef.current.value;
    data["infants"] = infantsRef.current.value;
    data["children"] = childrenRef.current.value;
    data["departure"] = fromRef.current.value;
    data["destination"] = toRef.current.value
    data["date_departure"] = leaveRef.current.value

    if (radioValue === 2) {
      data["date_arrival"] = returnRef.current.value;
      if ((new Date(returnRef.current.value)).getTime() < (new Date(leaveRef.current.value)).getTime()) {
        return setError("Return date must be greater than departure date.");
      }
    }

    try {
      setError("");
      setLoading(true)
      const result = await getUserDeals(data);

      // Set user query for researching
      setUserQuery(data);

      // Settings the listings for the result page
      setListings(result.data);

      navigate("/flight/listings");
    } catch(err) {
        if (err?.response?.status === 400) {
            setError("Could not find deals.");
        } else {
            setError("Failed to find deals.");
        }
    }
    
    setLoading(false);
  }

  return (
    <div className="bg-p--light vh-100 d-flex align-items-center">
      <div className="width-wrapper">
        <article style={{maxWidth: "1266px", marginTop: "-100px"}} className="mx-auto flex-column bg-black-0">
          <Form onSubmit={handleSubmit} className="p-5">
            <Form.Group className="mb-2 d-flex gap-3">
                <div className="grp">
                  <Form.Check
                    inline
                    name="group1"
                    id="group1"
                    type="radio"
                    onChange={handleRadio}
                    value="2"
                    defaultChecked={true}
                  />
                  <Form.Label className="text-white" style={{marginLeft: "-4px"}} htmlFor="group1">Round Trip</Form.Label>
                </div>

                <div className="grp">
                  <Form.Check
                    inline
                    name="group1"
                    id="group2"
                    value="1"
                    onChange={handleRadio}
                    type="radio"
                  />
                  <Form.Label className="text-white" style={{marginLeft: "-4px"}} htmlFor="group2">One-way Trip</Form.Label>
                </div>

            </Form.Group>

            <CardGroup className="gap-5">
              <Card className="border-0 rounded-0 bg-none">
                <Card.Body className="pl-0">
                  <div className="d-flex mb-5 gap-4 ">
                    <Form.Group className="hero-custom-input pos-rel">
                      <Form.Label htmlFor="fromWhere">From where ?</Form.Label>

                      <Form.Select id="fromWhere" 
                        aria-label="select a destination" 
                        ref={fromRef}
                        required="required"
                        style={{transform: "translateX(-4px)"}}
                      >
                        { locations && locations.map(el => {
                          return (
                            <option key={el.id} value={el.abbr}>{el.text}</option>
                          )
                        }) }
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="hero-custom-input">
                      <Form.Label htmlFor="toWhere">To where ?</Form.Label>

                      <Form.Select id="toWhere" 
                        aria-label="select an arrival location" 
                        defaultValue={defaultLocation}
                        ref={toRef}
                        required="required"
                        style={{transform: "translateX(-4px)"}}
                      >
                        { locations && locations.map(el => {
                          return (
                            <option key={el.id} value={el.abbr}>{el.text}</option>
                          )
                        }) }
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>

              <Card className="border-0 rounded-0 bg-none">
                <Card.Body className="pl-0">
                  <div className="d-flex mb-5">
                    <Form.Group className="hero-custom-input flex-b-40">
                        <Form.Label style={{transform: "translateX(4px)"}} htmlFor="leaveDate">Leaving on</Form.Label>
                        <Form.Control
                          type="date"
                          id="leaveDate"
                          min={todayDate}
                          defaultValue={todayDate}
                          ref={leaveRef}
                          className="rounded-0"
                          required="required"
                        />
                    </Form.Group>

                    <Form.Group ref={returnGroupRef} className="hero-custom-input flex-b-40">
                        <Form.Label style={{transform: "translateX(4px)"}} htmlFor="returnDate">Returning on</Form.Label>
                        <Form.Control
                          type="date"
                          id="returnDate"
                          min={todayDate}
                          defaultValue={todayDate}
                          ref={returnRef}
                          className="rounded-0"
                          required="required"
                        />
                    </Form.Group>
                  </div>
              
                  <div className="d-flex gap-4">
                    <div className="d-flex flex-fw">
                      <Form.Group className="hero-custom-input">
                        <Form.Label htmlFor="adult">Adults(12+)</Form.Label>
                        <Form.Control
                          type="number"
                          id="adult"
                          min="1"
                          ref={adultRef}
                          defaultValue="1"
                          className="rounded-0"
                          required="required"
                        />
                      </Form.Group>

                      <Form.Group className="hero-custom-input">
                        <Form.Label htmlFor="children">Children(2-12)</Form.Label>
                        <Form.Control
                          type="number"
                          id="children"
                          min="0"
                          ref={childrenRef}
                          defaultValue="0"
                          className="rounded-0"
                          required="required"
                        />
                      </Form.Group>

                      <Form.Group className="hero-custom-input">
                        <Form.Label htmlFor="infants">infants(0-2)</Form.Label>
                        <Form.Control
                          type="number"
                          id="infants"
                          min="0"
                          ref={infantsRef}
                          defaultValue="0"
                          className="rounded-0"
                          required="required"
                        />
                      </Form.Group>
                    </div>

                    <Button disabled={loading} variant="primary" className="pos-rel text-nowrap home-btn btn btn-primary px-6 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white" size="lg" type="submit">

                      { !loading ? (<div className="d-flex align-items-center gap-2">
                                    <span className="lh-1">Search Flight</span>
                                    <img style={{marginBottom: "-4px"}} src={arrowRight} alt="Right arrow" />
                                </div>) : (
                            <>
                                <span className="vanish d-flex align-items-center gap-2">
                                  <span className="lh-1">Search Flight</span>
                                  <img style={{marginBottom: "-4px"}} src={arrowRight} alt="Right arrow" />
                                </span>
                                <span className="pos-abs center-h-v">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="md"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </span>
                            </>)
                        }
                    </Button>
                  </div>

                </Card.Body>
              </Card>
            </CardGroup>
              {
                error && (
                  <div className="mt-3 bg-white px-3 py-1 color-red d-inline-block">{error}</div>
                )
              }
          </Form>
        </article>
      </div>
    </div>
  )
}

export default Home;