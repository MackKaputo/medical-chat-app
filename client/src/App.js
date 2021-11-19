import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from './components'
import './App.css'

const cookies = new Cookies()

const apiKey = "9drb87pa7zrk"

const client = StreamChat.getInstance(apiKey)

// const authToken = false //*Available only if we've logged in
const authToken = cookies.get("token")


if(authToken) {

  //* user is created if not yet created

  client.connectUser({
    id: cookies.get("userId"),  // "id" is used here @getstream
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    image: cookies.get("avatarURL"),
    phoneNumber: cookies.get("phoneNumber"),
    hashedPassword: cookies.get("hashedPassword")
    
  }, authToken)
}

function App() {
  
  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  )

}

export default App;
