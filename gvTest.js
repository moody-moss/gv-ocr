const express = require('express')
const cors = require('cors')
const vision = require('@google-cloud/vision')
const fs = require('fs')
const path = require('path')
const { json } = require('express')

const app = express()

//app.use(express.json())

app.use(cors({ origin: '*' }))
app.options('*', cors()) // enable preflight across-the-board --> include bfeore other route

app.use(express.text({ limit: '50mb' }))

// credential
process.env.GOOGLE_APPLICATION_CREDENTIALS = './fourth-buffer-325405-04aa91f83467.json'

app.get('/coffee', (req, res) => {
    res.send({
        resCoffee: 'got it!'
    })
})

app.use(express.static('public'))
app.use('/images', express.static(path.join(__dirname, '/public')))

app.post('/post-base64', (req, res) => {
    let strBase64 = req.body
    console.log(strBase64)

    // Save img as 'label.jpeg'/'out.jpeg'
    fs.writeFile(__dirname + '/public/out.jpeg', strBase64, 'base64', (err, data) => {
        if (err) {
            console.log(`error: ${err}`)
            res.send({
                sendStatus: `error: ${err}`
            })
        }
        
        console.log('base64 -> jpeg succeeded')

        async function quickstart() {
            // Creates a client
            const client = new vision.ImageAnnotatorClient();

            // Performs label detection on the image file
            const [result] = await client.textDetection(__dirname + '/public/out.jpeg');
            const labels = result.textAnnotations;
            console.log(labels);

            res.send(
                {
                    sendStatus: 'succeeded',
                    dirPath: `${__dirname} ${'/public/out.jpeg'}`,
                    txt: labels
                }
            )

            labels.forEach(label => {
                console.log(label.description)
            });
        }

        quickstart()
    })

})

app.use(express.static('public'))
app.use('/files', express.static(path.join(__dirname, '/public')))
app.post('/post-serial', (req, res) => {
    let serial = req.body
    console.log(`scanned value: ${serial}`)

    fs.writeFile(__dirname +'/public/serial.txt', serial, (err, data) => {
        if (err) {
            console.log(`error: ${err}`)
            res.send({
                sendStatus: `error: ${err}`
            })
        }
        res.send({
            sendStatus: serial
        })
        console.log('serial -> json succeeded')
    })
})


const server = app.listen(process.env.PORT || 1000, () => {
    const port = server.address().port
    console.log(`Express working in port: ${port}`)
})