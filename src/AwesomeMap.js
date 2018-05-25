import React, { Component } from 'react';
import HEREMap, { Marker } from 'react-here-maps';

export default class Map extends Component {
    render() {
        const center = { lat: 0, lng: 0 };
        return (
            <HEREMap 
            appId= 'NsjvkdO6HINUXCU1xAwV'
            appCode= 'rvodtjJNT8Ywk8Bnp-Hxbw'

                zoom={14}
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