import React, { useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Heading, TextInputField, FilePicker, toaster } from 'evergreen-ui'

import Grid from '../components/Layout/Grid'
import { validationSchema } from '../utils/validations'

const handleValidations = async (url, file) => {
  const hasntUrlOrFile = !url || !file
  if (hasntUrlOrFile) return

  try {
    const isUrlValid = await validationSchema.validate({ url, file })
    if (isUrlValid) Router.push('/processing')
  } catch (error) {
    const { message } = error
    toaster.warning(message)
  }
}

const Form = () => {
  const fileElement = useRef(null)
  const [url, setUrl] = useState('')
  const [file, setFile] = useState()

  useEffect(() => {
    handleValidations(url, file)
  }, [url, file])

  const handleChangeUrl = ({ target }) => setUrl(target.value)
  const handleChangeFile = ([file]) => setFile(file)

  const handleKeyPress = ({ key }) => {
    if (key !== 'Enter' || !fileElement.current) return
    fileElement.current.fileInput.click()
  }

  return (
    <Grid>
      <div>
        <Heading size={800} marginTop={10} is="h2" color="white">
          Share your assets
        </Heading>
        <TextInputField
          value={url}
          marginTop={15}
          inputHeight={40}
          onKeyPress={handleKeyPress}
          onChange={handleChangeUrl}
          label="Insert your website url"
          placeholder="https://duckduckgo.com"
        />
        <FilePicker ref={fileElement} height={40} onChange={handleChangeFile} />
      </div>
    </Grid>
  )
}

export default Form
