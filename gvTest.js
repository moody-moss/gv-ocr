const express = require('express')
const cors = require('cors')
const vision = require('@google-cloud/vision')

const app = express()

app.use(cors({ origin: '*' }))
app.options('*', cors()) // enable preflight across-the-board --> include bfeore other route

app.get('/coffee', (req, res) => {
    res.send({
        resCoffee: 'got it!'
    })
})

//C:/Users/nurathirah.bajan/Documents/AR Project/GV/fourth-buffer-325405-04aa91f83467.json
process.env.GOOGLE_APPLICATION_CREDENTIALS = './fourth-buffer-325405-04aa91f83467.json'

async function gv_ocr() {

    // Creates a client
    const client = new vision.ImageAnnotatorClient()

    // Performs label detection on the image file -> https://qwe-1.herokuapp.com/out.jpeg
    client.textDetection('https://qwe-1.herokuapp.com/out.jpeg')
        .then(results => {
            const result = results[0].textAnnotations
            console.log(`Text Annotation Result: ${JSON.stringify(result, null, 2)}`)

            app.get('/gv-txt', (req, res) => {
                res.send(
                    JSON.stringify(result)
                )
            })

        })
        .catch(err => {
            console.log('Error:', err)
        })
}

gv_ocr()

const server = app.listen(process.env.PORT || 1000, () => {
    const port = server.address().port
    console.log(`Express working in port: ${port}`)
})