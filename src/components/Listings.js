import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import FlightListing from "./FlightListing";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

function extractFlights(deals) {
  const allDeals = [];

  for (const flightName in deals) {
    for (const eachIndex in deals[flightName]) {
      const d = {};
      for (const data in deals[flightName][eachIndex]) {
        d[data] = deals[flightName][eachIndex][data];
      }
      
      d["airlineName"] = flightName;
      d["id"] = eachIndex;
      allDeals.push(d);
    }
  }

  return allDeals;
}

function Listings() {
  const { listings: deals, currentUser, userQuery, saveDeal, token } = useAuth();
  const navigate = useNavigate();
  const [allDeals, setAllDeals] = useState(extractFlights(deals));
  // const allDeals = ;
  const extracted = [];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const titles = [
    "Economy Discount", 
    "Economy Saver", 
    "Economy Flexible"
  ];

  const handleSave = async (e, data) => {
    if (!currentUser) {
      localStorage.setItem("searchData", (userQuery || ""));
      
      navigate("/login");
      return;
    }

    try {
      setError("");
      setLoading(true);
      e.target.disabled = true;

      await saveDeal(data, token);
      
      setTimeout(() => {
            window.location.reload();
        }, 400);
      navigate("/dashboard");
      return;
    } catch(err) {
        if (err?.response?.status === 400) {
            setError("Could not save deal.");
        } else {
            setError("Failed to save deal.");
        }
    }
    
    e.target.disabled = false;
  }

  return (
    <div className="bg-light vh-1 d-flex py-7">
      <div className="width-wrapper">
        {error && <Alert variant="danger">{error}</Alert>}
        <article style={{maxWidth: "1300px"}} className="mx-auto flex-column bg-light">
          {
            allDeals.length > 0 && !loading ?  
              (<ul className="list-s-none listings d-flex flex-column gap-4">
                { allDeals && allDeals.map(element => {

                  element["Prices"].map((el, index) => {

                    return extracted.push(
                      <FlightListing key={element.id}
                        airlineName={element.airlineName}
                        departureTime={element["Departure Time"]}
                        departureLocation={element["depart"]}
                        departureAbbr={element["departure"]}
                        estimatedTime={"Unknown"}
                        estimatedStops={"1 Stop"}
                        handleSave={handleSave}
                        arrivalTime={element["Arrival Time"]}
                        arrivalLocation={element["dest"]}
                        arrivalAbbr={element["destination"]}
                  
                        price={el}
                        uid={element["id"]}
                        airlineUrl={element.url}
                        title={titles[index]}
                        save={true}
                      />
                    );
                  });
                  
                  return true;
                })}
                { extracted.map(el => el) }
              </ul>) : <div className="color-black text-center">Could not find a flight :). Please <Link to="/">try searching again</Link></div>
          }
        </article>
      </div>
    </div>
  )
}

export default Listings;