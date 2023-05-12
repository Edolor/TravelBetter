import React, { useState, useEffect, useRef } from 'react';
import FlightListing from './FlightListing';
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { getSavedDeals, token, savedDeals } = useAuth();
  const [loading, setLoading] = useState();
  const allData = useRef(savedDeals);

  const handleDelete = (e) => {};
  console.log(allData.current);

  return (
    <>
    <div className="bg-grey--light-2">
      <div className="width-wrapper">
        <h1 className="py-3 font-weight-600">Saved Flights</h1>

        <article style={{maxWidth: "1300px"}} className="mx-auto flex-column pos-rel">
            {
              loading ? (
                <span className="pos-abs center-h-v height-80">
                  {/* <Spinner
                      as="span"
                      animation="border"
                      size="lg"
                      role="status"
                      aria-hidden="true"
                  /> */}
                  Loading....
                </span>
              ) : (
                  allData?.current?.data?.length > 0 ?  
                    (<ul className="list-s-none listings d-flex flex-column gap-4">
                        { allData?.current?.data && allData?.current?.data.map((element, index) => {
                          return (
                            <FlightListing key={element.id}
                              airlineName={element.flightprovider}
                              departureTime={element.time_departure}
                              departureLocation={element.departure}
                              departureAbbr={element.depart}
                              estimatedTime={"Unknown"}
                              estimatedStops={"1 Stop"}
                              handleSave={""}
                              handleDelete={handleDelete}
                              arrivalTime={element.time_arrival}
                              arrivalLocation={element.destination}
                              arrivalAbbr={element.dest}
                              price={element.price}
                              save={false}
                              uid={index}
                              airlineUrl={element.url}
                              title={element.type}
                            />
                          );
                        })
                      }
                          
                    </ul>) : (<div className="color-black text-center">No saved flights. <Link to="/">Add some flights :).</Link></div>)
              )
            }
        </article>
      </div>

    </div>
    </>
  )
}

export default Dashboard