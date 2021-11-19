
import React from 'react'
import { Channel, MessageTeam } from 'stream-chat-react'

import { ChannelInner, CreateChannel, EditChannel } from "./"


export default function ChannelContainer({ 
  isCreating, setIsCreating, isEditing,setIsEditing, createType

  }  ) {

  // const { Channel }  = useChatContext()

  //chech if we are creating the channel or editing it
  if(isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if(isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }
  
  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">Your chat history starts here</p>
      <p className="channel-empty__second">Send messages, emojis, links, attachments, and more! </p>
    </div>
  )

  return (
    <div className="channel__container">
      <Channel
          EmptyStateIndicator={EmptyState}
          Message={(messageProps, index) => <MessageTeam key={index} {...messageProps} />}
      >

        <ChannelInner setIsEditing={setIsEditing}/>

      </Channel>
    </div>
  )
}

