import { string, object, mixed } from 'yup'

const FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const validationSchema = object().shape({
  clientUrl: string().required('A text is required'),
  file: mixed()
    .required('A file is required')
    .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
    .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
})

export { validationSchema }
