import React, { useState, useEffect } from 'react'
import { Heading, TextInputField, FilePicker, Text, toaster } from 'evergreen-ui'
import Router from 'next/router'

import Grid from '../components/Layout/Grid'
import { filestackClient } from '../utils/filestack'
import { validationSchema } from '../utils/validations'

const handleValidations = async ({ clientUrl, file }) => {
  try {
    const isSchemaValid = await validationSchema.validate({ clientUrl, file })
    return isSchemaValid
  } catch (error) {
    const { message } = error
    toaster.warning(message)
  }
}

const handleUploadFile = async ({ file }) => {
  try {
    const { url } = await filestackClient.upload(file)
    return url
  } catch (error) {
    toaster.warning(error.toString())
  }
}

const handleSendAssets = async ({ clientUrl, fileUrl }) => {
  try {
    const response = await fetch('http://localhost:8080/api', {
      method: 'POST',
      body: JSON.stringify({ clientUrl, fileUrl }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    const message = await response.json()
    return message
  } catch (error) {}
}

const onDidMount = async ({ clientUrl, file }) => {
  const hasClientUrlOrFile = clientUrl && file
  if (!hasClientUrlOrFile) return

  const isSchemaValid = await handleValidations({ clientUrl, file })
  if (!isSchemaValid) return

  Router.push('/processing')

  /*
    TODO: In Processing page we need to do the following steps:
      1 - Show message that file is being uploaded and sending to server
      2 - Connect through WebSockets using Socket.io to receive first message "We are processing files"
      3 - When final message / step is received move to /results and display a 4x4 grid with different diffings
  */

  const fileUrl = await handleUploadFile({ file })
  const message = await handleSendAssets({ clientUrl, fileUrl })
}

const Form = () => {
  const [file, setFile] = useState()
  const [clientUrl, setClientUrl] = useState('')

  useEffect(() => {
    onDidMount({ clientUrl, file })
  }, [clientUrl, file])

  const handleChangeFile = ([file]) => setFile(file)
  const handleChangeUrl = ({ target: { value } }) => setClientUrl(value)

  return (
    <Grid columns="400px">
      <div>
        <Heading size={800} marginTop={10} is="h2" color="white">
          Share your assets
        </Heading>
        <TextInputField
          marginTop={15}
          value={clientUrl}
          inputHeight={40}
          onChange={handleChangeUrl}
          label="Insert your client url"
          placeholder="https://duckduckgo.com"
        />
        <FilePicker height={40} onChange={handleChangeFile} />
      </div>
    </Grid>
  )
}

export default Form
