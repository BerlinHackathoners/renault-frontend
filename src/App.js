import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { get_api_call_test, get_knowledge_async, get_description_async } from './IO/ApiCalls'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import {VoicePlayer, VoiceRecognition} from 'react-voice-components';
import PlayVoice from './PlayVoice';
import AwesomeMap from './AwesomeMap';


class App extends Component {

  state = {
    persons: "false",
    playVoice: false,
    startRecording: false,
    stopRecording: false,
    lastRecordedSentence: "",
    lat: 48.0391667,
    long: 2.525
  };

  componentDidMount() {
    get_api_call_test().then(res => {
      const persons = res.data;
      this.setState({
        persons: persons

      })
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
  }

  googleMapsClick = (e,v) => {
console.log(e.latLng)
this.setState({
  lat: e.latLng.lat(),
  lon: e.latLng.lng()
})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Renault Challenge</h1>
        </header>
        {this.state.playVoice ? <PlayVoice
          text={this.state.lastRecordedSentence}
          onEnd={() => this.onVoiceEnd()}
        /> : null }
        <button onClick={() => this.setState({ startRecording: true })}>start</button>
        <button onClick={() => this.setState({ stopRecording: true })}>stop</button>
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
        <Button bsStyle="primary" onClick={this.handleKnowledgeClick.bind(this)}>Primary</Button>
        <p className="App-intro">
          To get started, edit <code>{this.state.lastRecordedSentence}</code> and save to reload.
        </p>
        <AwesomeMap 
        				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={10}
                defaultCenter={{ lat: 48.0391667, lng: 2.525 }}
                googleMapsClick={this.googleMapsClick}
                lat={this.state.lat}
                lon={this.state.lon}
        />
      </div>
    );
  }
}

export default App;
