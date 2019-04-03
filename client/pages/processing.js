import React, { useState, useEffect } from 'react'
import { Pane, Heading, Checkbox, Spinner, Text } from 'evergreen-ui'
import io from 'socket.io-client'

import Grid from '../components/Layout/Grid'

const Processing = ({ url, file }) => {
  const [messages, setMessages] = useState([{ text: 'Uploading image file', checked: false }])

  const handleMessage = (message, messages) => {
    if (message.text === 'Uploading image file') return setMessages([message])

    const messagesFinished = messages.map(message => ({ ...message, checked: true }))
    setMessages([...messagesFinished, message])
  }

  useEffect(() => {
    const socket = io('http://localhost:8080')
    socket.on('message', message => handleMessage(message, messages))

    return () => {
      socket.off('message', handleMessage)
      socket.close()
    }
  }, [messages])

  return (
    <Grid columns="520px">
      <div>
        <Heading size={800} marginTop={10} is="h2" color="white">
          Processing...
        </Heading>
        <Pane background="tint2" height={210} marginTop={10} padding={10} borderRadius={5}>
          {messages.map(({ text, checked }) =>
            checked ? (
              <Checkbox key={text} label={text} margin={15} checked />
            ) : (
              <Pane key={text} display="flex" flexDirection="row" margin={15}>
                <Spinner size={16} />
                <Text marginLeft={8} size={300}>
                  {text}
                </Text>
              </Pane>
            )
          )}
        </Pane>
      </div>
    </Grid>
  )
}

export default Processing
