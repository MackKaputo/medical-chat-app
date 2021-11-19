import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from './components'
import "stream-chat-react/dist/css/index.css"
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
  const [createType, setCreateType] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing ] = useState(false)

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating} /** Using context would be best here to pass these props */
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}

        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating} /** Using context would be best here to pass these props */
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}

        />
      </Chat>
    </div>
  )

}

export default App;
