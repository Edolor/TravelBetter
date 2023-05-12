import React from 'react';
import circles from "../Assets/img/circles.svg";
import { Button } from "react-bootstrap";

function FlightLisitng(props) {
      const data = {
        price: props.price,
        time_arrival: props.arrivalTime,
        time_departure: props.departureTime,
        flightprovider: props.airlineName,
        url: props.airlineUrl,

        departure: props.departureLocation,
        depart: props.departureAbbr,

        destination: props.arrivalLocation,
        dest: props.arrivalAbbr,
        type: props.title
      };
    
      return (
        <li className="listing pos-rel d-flex align-items-center justify-content-between box-shadow--light bg-white px-5 py-7">
          <h3 className="text-primary body-copy fw-bold">{props.airlineName}</h3>
    
          <div className="listing__desc d-flex align-items-center gap-5">
            <div className="listing__block">
              <div className="listing__time text-black fw-bold">
                {props.departureTime} {`(${props.departureAbbr})`}
              </div>
    
              <div className="listing__location text-black">
                {props.departureLocation}
              </div>
            </div>
    
            <div className="listing__block d-flex flex-column gap-2 align-items-center">
              <img src={circles} alt="circles" />
    
              <div className="listing__location text-black">
                {props.estimatedStops}
              </div>
            </div>
    
        <div className="listing__block">
            <div className="listing__time text-black fw-bold">
            {props.arrivalTime} {`(${props.arrivalAbbr})`}
            </div>

            <div className="listing__location text-black">
            {props.arrivalLocation}
            </div>
        </div>
        </div>

        <div className="listing__details d-flex flex-column align-items-end gap-4">
        <div className="listing__price heading-2 lh-1 fw-bolder">{props.price}</div>

        <div className="listing__buttons d-flex align-items-center gap-3">
            { 
              props.save && (
                <Button size="lg" onClick={(e) => { props.handleSave(e, data) }} variant="button" className="btn btn-primary px-7 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white">Save</Button>
              )
            }
            <a size="lg" href={props.airlineUrl} className="btn btn-primary px-7 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white">View</a>
        </div>
        </div>

        <div className="listing__title pos-abs bg-grey--light-3 text-primary">{props.title}</div>

        {
          // !props.save && (
          //   <Button size="lg" onClick={(e) => { props.handleDelete(e, data) }} variant="button" className="btn btn-primary px-7 py-6 rounded-1 lh-1 body-copy--big fw-bold body-copy text-white">Delete</Button>
          // )
        }
    </li>
    );
}

export default FlightLisitng;