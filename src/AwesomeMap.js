import React, { Component } from 'react';
import { GoogleMap, Marker } from "react-google-maps"
import { withGoogleMap,withScriptjs } from 'react-google-maps';

const AwesomeMap = withScriptjs(withGoogleMap(props => {
    return <GoogleMap 
    onClick={props.googleMapsClick}
    {...props} ref={props.onMapMounted}>{props.children}

    <Marker position={{ lat: props.lat, lng: props.lon }} />
    </GoogleMap>
  }));

export default AwesomeMap