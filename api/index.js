const { promisify } = require('util')
const cors = require('cors')
const bodyParser = require('body-parser')
const filestack = require('filestack-js')
const BlinkDiff = require('blink-diff')
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const download = require('image-downloader')
const puppeteer = require('puppeteer')
const sizeOf = promisify(require('image-size'))

require('dotenv').config()

const PORT = process.env.PORT || 8080
const filestackClient = filestack.init(process.env.FILESTACK_API_KEY)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api', async (req, res) => {
  const { clientUrl, fileUrl } = req.body
  console.log('TCL: clientUrl', clientUrl)
  console.log('TCL: fileUrl', fileUrl)

  // Data arrived OK
  io.emit('message', { text: 'Uploading image file', checked: true })

  // Download image
  io.emit('message', { text: 'Getting resolutions of uploaded image', checked: false })
  const downloading = await download.image({ url: fileUrl, dest: `${__dirname}/images/design.png` })

  // Get downloaded image resolution
  const { width, height } = await sizeOf(`${__dirname}/images/design.png`)

  // Take screenshot at image resolution
  io.emit('message', { text: `Taking screenshot to client at ${width}x${height}`, checked: false })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(clientUrl)
  await page.screenshot({ path: `${__dirname}/images/client.png` })
  await browser.close()

  /* Compare using pixelmatch by Mapbox / blink-diff by Yahoo, etc */
  io.emit('message', { text: `Comparing using BlinkDiff algorithm`, checked: false })

  const blinkDiff = new BlinkDiff({
    imageAPath: `${__dirname}/images/client.png`,
    imageBPath: `${__dirname}/images/design.png`,

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: `${__dirname}/images/blink-diff`,
  })

  blinkDiff.run(async (error, result) => {
    if (error) return

    const { url } = await filestackClient.upload(`${__dirname}/images/blink-diff`)
    console.log('TCL: url', url)

    io.emit('message', { text: `First result ${url}`, checked: true })

    console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed')
    console.log('Found ' + result.differences + ' differences.')
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
