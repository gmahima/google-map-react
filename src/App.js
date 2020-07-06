import GoogleMapReact from 'google-map-react';
import React, {Component} from 'react';
import {Marker, InfoWindow }from './Marker'
import Geocode from "react-geocode";


Geocode.setApiKey('insert api key');

Geocode.enableDebug();


class App extends Component{
  state = {
    positions: null
    
  }


  componentDidMount(){
    let arr = []  
    fetch('./address.json').then(response => {
      return response.json();
    }).then(heatMapData => {
    
          heatMapData.addresses.forEach( (item) =>{
            Geocode.fromAddress(item.name).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                return({location:[lat, lng], weight: [item.weight]})
              }).then(r => arr.push(r))
            }
          )   
    })
    .then(() =>{ 
      this.setState({
        positions: arr
      })}
      
    ).catch(err => {
      console.log("Error Reading data " + err);
    })
  }
  

  render(){
    if(this.state.positions){
      return <MapComponent {...this.props} positions={this.state.positions}/>
    } 
    return null;
  }

}



class MapComponent extends Component {
  center = {lat: 0.00, lng: 0.00}
 state = {
  center: {lat: 0.00, lng: 0.00}, 
  zoom: 4,
  isTooltipVisible: false,
  lat: 0.00,
  lng: 0.00,
  img: "hi"
}
onChildMouseEnter = (...args) => {
  console.log("args:  ", ...args);
  this.setState(() => ({
    isTooltipVisible:true,
    lat: args[1].lat,
    lng: args[1].lng,
    img: args[1].img
  }))
}
onChildMouseLeave = (...args) => {
  this.setState(() => ({
    isTooltipVisible:false
  }))
}
 render(){
   const options = {   
    radius: 20,   
    opacity: 0.6
    }
    const data = {
      positions: this.props.positions,
      options: options
    }
   return(
    <div style={{ height: '100vh', width: '100%' }}>


 <GoogleMapReact
      bootstrapURLKeys={{ key:"insert api key", libraries: ['visualization']}}
      defaultCenter={this.center}
      defaultZoom={this.state.zoom}
      heatMapLibrary={true}
      onChildMouseEnter={this.onChildMouseEnter}
      onChildMouseLeave={this.onChildMouseLeave}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) => {
        let heatmap = new maps.visualization.HeatmapLayer({
          data: data.positions.map(point => (
            {location: new maps.LatLng(point['location'][0], point['location'][1]),
            weight: point['weight']}))
        });
        heatmap.setMap(map);
      }}
    >
          {data.positions.map((point, i) => {
            console.log("its mapping! ", point)
            return (
            
            <Marker lat={point['location'][0]} lng={point['location'][1]} key={i.toString()} />
          )})}
          <InfoWindow
            lat={this.state.lat}
            lng={this.state.lng}
            img={this.state.img}
            show={this.state.isTooltipVisible}
          />
  </GoogleMapReact>


  </div>
   )

 }
}


export default App;








