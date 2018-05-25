import React, { Component } from 'react';
import { VoicePlayer } from 'react-voice-components'

class PlayVoice extends Component {
    
    render() {
        return (
            <VoicePlayer
            play
            text={this.props.text}
            onEnd={this.props.onEnd}
          />
        )
    }
}

export default PlayVoice