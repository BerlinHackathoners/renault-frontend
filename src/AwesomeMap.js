import React, { Component } from 'react';
import { GoogleMap, Marker } from "react-google-maps"
import { withGoogleMap,withScriptjs } from 'react-google-maps';

const AwesomeMap = withScriptjs(withGoogleMap(props => {
    return <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>
  }));

export default AwesomeMap