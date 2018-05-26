import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { get_routes_async, get_api_call_test, get_landmarks_async, get_knowledge_async, get_description_async, get_response_async } from './IO/ApiCalls'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { VoicePlayer, VoiceRecognition } from 'react-voice-components';
import PlayVoice from './PlayVoice';
import AwesomeMap from './AwesomeMap';



class App extends Component {

  state = {
    persons: "false",
    playVoice: false,
    startRecording: false,
    stopRecording: false,
    lastRecordedSentence: "",
    responseSentence: "",
    lat: 48.0391667,
    long: 2.525
  };

  componentDidMount() {
    this.setState({
      lat: 48,
      long: 2.525
    })

  }

  handleKnowledgeClick() {
    console.log("knowledge click")
    this.setState({
      playVoice: true
    })
    console.log(this.state)
  }

  resetTranscript() {
    console.log("Resetting transcript")

  }

  onVoiceEnd() {
    this.setState({
      playVoice: false
    })

  }

  onRecordingEnd = () => {
    this.setState({ startRecording: false, stopRecording: false })
  }

  onResult = ({ finalTranscript }) => {
    const result = finalTranscript
    this.setState({ startRecording: false, lastRecordedSentence: finalTranscript })
  }

  onStart = () => {
    console.log("Start recording")
  }

  onEnd = () => {
    // SEND RESULTS
    console.log("Ending recording")
    get_response_async(this.state.lastRecordedSentence).then(res => {
      console.log(res.data)
      this.setState({
        responseSentence: res.data,
        playVoice: true
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.responseSentence !== this.state.responseSentence) {
      window.responsiveVoice.speak(this.state.responseSentence)
    }
  }

  runSimulation() {
    get_routes_async(this.state.lat, this.state.lon, )
  }

  googleMapsClick = (e) => {
    const lat = e.latLng.lat()
    const lon = e.latLng.lng()
    get_landmarks_async(lat, lon).then(res => {
      console.log("Landmarks data: ", res.data)
      this.setState({
        responseSentence: res.data,
        playVoice: true
      })
    })
    this.setState({
      lat: lat,
      lon: lon
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Renault Challenge - Renault Guide by The Berliners</h1>
        </header>
        {false ? <PlayVoice
          text={this.state.responseSentence}
          onEnd={() => this.onVoiceEnd()}
        /> : null}
         <Button bsStyle="primary" onMouseDown={() => this.setState({ startRecording: true })} onMouseUp={() => this.setState({ stopRecording: true })}>Talk to the car</Button>
        {this.state.startRecording && (
          <VoiceRecognition
            onStart={this.onStart}
            onEnd={this.onEnd}
            onResult={this.onResult}
            continuous={true}
            lang="en-US"
            stop={this.state.stopRecording}
          />
        )}
        <div className="App-intro">
          <code>{this.state.lastRecordedSentence ? this.state.lastRecordedSentence : null}</code>
        </div>
        <AwesomeMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultZoom={10}
          defaultCenter={{ lat: this.state.lat ? this.state.lat : 48.0391667, lng: this.state.lon ? this.state.lon : 2.525 }}
          googleMapsClick={this.googleMapsClick}
          lat={this.state.lat}
          lon={this.state.lon}
        />
      </div>
    );
  }
}

export default App;
