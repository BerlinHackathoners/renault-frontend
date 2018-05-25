import React, { Component } from 'react';
import HEREMap, { Marker } from 'react-here-maps';

export default class Map extends Component {
    render() {
        const center = { lat: 0, lng: 0 };
    
        return (
            <HEREMap 
                appId="{your app_id}"
                appCode="{your app_code}"
                center={center}
                zoom={14}
            >
                <Marker {...center}>
                    <div className="circle-marker"></div>
                </Marker>
            </HEREMap>
        )
    }
}