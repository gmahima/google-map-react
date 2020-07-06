import React, {Component} from 'react';
import styled from 'styled-components'


const IW = styled.div`
  color: palevioletred;
  background: papayawhip;
  width: 150px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;
  const IMG = styled.img`
      padding: 5px;
      display: inline-flex;
      border-radius: 4px;`

const Marker = props => (
  
    <React.Fragment>
      {console.log("marker props: ", props)}
      <div
        style={{
          visibility: "hidden",
          height: 50,
          width: 50
        }}
      />

    </React.Fragment>
  )
  class InfoWindow extends Component { 

    
    render(){
      console.log("props")
      console.log(this.props)
    return(
      <React.Fragment>
          {this.props.show && (
        <IW>
            <IMG src={this.props.img}></IMG>
            text
        </IW>
      )}
      </React.Fragment>
    ) }
  }
export {Marker, InfoWindow};  