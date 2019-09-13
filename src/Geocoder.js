import React, { Component } from 'react';
import L from 'leaflet';
import {mapboxToken, geocoderSearchPlaceholderText} from './Config';
import 'leaflet-control-geocoder';
import './Geocoder/images/geocoder.png';
import './Geocoder/images/throbber.gif';
import './Geocoder/Control.Geocoder.css';
import './Geocoder.css';


class Geocoder extends Component {

  constructor(props) {
    super(props);
    this.mapboxToken = mapboxToken;
  }
 
  componentDidMount(){
    //console.log("Geocoder mounted");
    let that = this;
    this.map = L.map('hidden-geocoder-map');
    this.geocoderObj = new L.Control.Geocoder(
      {
        "geocoder": new L.Control.Geocoder.Mapbox(
          this.mapboxToken,
          //By uncommenting geocodingQueryParams below, you can restrict geocoding results
          //to a specific region using country and bbox. By default it is a world-wide geocoder.
          // {
          //   "geocodingQueryParams": {
          //     "country": "US",
          //     "bbox":"-97.35122680664064,35.9357645138553, -96.75178527832033,36.324530335021876"
          //   }
          // }
        ),
        "collapsed": false,
        "placeholder": geocoderSearchPlaceholderText,
        "suggestMinLength": 3,
        "queryMinLength": 1,
        "defaultMarkGeocode": false
      });
    this.geocoderObj.addTo(this.map);
    this.geocoderObj.on("markgeocode", e => that.transmitGeocode(e));
    let container = this.geocoderObj.getContainer();
    window.document.getElementById("Geocoder").appendChild(container);
  }

  transmitGeocode(geocode){
    this.props.transmitGeocode(geocode);
  }

  render() {
    return (
      <div id='Geocoder' className={'Geocoder'}>
        <div id='hidden-geocoder-map'></div>
      </div>
    );
  }
}

export default Geocoder;

