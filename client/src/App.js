import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer} from './components'
import './App.css'

const getstream_secret = "fg77s487fqvvgea94hru66c8bd3d3xq5knfsbt8kh38eg8zdp2b4jk994d9jkjge"
const apiKey = "9drb87pa7zrk"

const client = StreamChat.getInstance(apiKey)
function App() {
  return (
    <div className="app_wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
        
        />

        <ChannelContainer 
        
        />
      </Chat>
    </div>
  )

}

export default App;
