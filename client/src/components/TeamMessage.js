import React from 'react'
import { MessageTeam, useMessageContext } from 'stream-chat-react';

export default function TeamMessage() {
  const { handleOpenThread, message } = useMessageContext();

  return (
      <MessageTeam
          message={{ ...message, user: {}}}
          // handleOpenThread={}
      />
  )
}
