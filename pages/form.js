import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Pane, Heading, Paragraph, TextInputField, FilePicker } from 'evergreen-ui'
import { string, object, mixed } from 'yup'
import Router from 'next/router'

const Grid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  align-content: center;
  grid-template-columns: 400px;

  > div {
    align-self: center;
  }
`
const FILE_SIZE = 160 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/png']

const validationSchema = object().shape({
  url: string().required('A text is required'),
  file: mixed()
    .required('A file is required')
    .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
    .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
})

const handleValidations = async (url, file) => {
  const isUrlValid = await validationSchema.isValid({ url, file })
  if (isUrlValid) Router.push('/processing')
}

const Form = () => {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState()

  const handleChangeUrl = ({ target }) => setUrl(target.value)
  const handleChangeFile = ([file]) => setFile(file)

  useEffect(() => {
    handleValidations(url, file)
  }, [url, file])

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
          onChange={handleChangeUrl}
          label="Insert your website url"
          placeholder="https://duckduckgo.com"
        />
        <FilePicker height={40} onChange={handleChangeFile} />
      </div>
    </Grid>
  )
}

export default Form
