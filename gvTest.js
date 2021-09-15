const express = require('express')
const cors = require('cors')
const vision = require('@google-cloud/vision')
const { json } = require('express')

const app = express()

//app.use(express.json())

app.use(cors({ origin: '*' }))
app.options('*', cors()) // enable preflight across-the-board --> include bfeore other route

app.get('/coffee', (req, res) => {
    res.send({
        resCoffee: 'got it!'
    })
})

// credential
process.env.GOOGLE_APPLICATION_CREDENTIALS = './fourth-buffer-325405-04aa91f83467.json'

async function x() {
    const client = new vision.ImageAnnotatorClient()
    const URL_Path = `https://qwe-1.herokuapp.com/out.jpeg`

    const [result] = await client.textDetection(URL_Path)
    const detections = result.textAnnotations

    console.log('Text Detected: ')

    detections.forEach(element =>
        console.log(element)
    );

}

function gv_ocr() {

    // Creates a client
    const client = new vision.ImageAnnotatorClient()

    // Performs label detection on the image file -> https://qwe-1.herokuapp.com/out.jpeg
    client.textDetection('https://qwe-1.herokuapp.com/out.jpeg')
        .then(results => {
            const result = results[0].textAnnotations
            const resultGet = JSON.stringify(result)
            console.log(`Text Annotation Result: ${resultGet}`)


            app.get('/gv-txt', (req, res) => {
                res.send(
                    {resultGet}
                )
            })

        })
        .catch(err => {
            console.log('Error:', err)
        })
}

gv_ocr()


function gv_ocr_1() {

    // Creates a client
    const client = new vision.ImageAnnotatorClient()

    // Performs label detection on the image file -> https://qwe-1.herokuapp.com/out.jpeg
    client.textDetection('https://qwe-1.herokuapp.com/out.jpeg')
        .then(results => {
            const result = results[0].textAnnotations
            console.log(`Text Annotation Result: ${JSON.stringify(result[0].description)}`)

            txtFromImg = JSON.stringify(result[0].description)

            // app.get('/gv-txt-var', (req, res) => {
            //     res.send({
            //         GVtxt: txtFromImg
            //     })
            // })
        })
        .catch(err => {
            console.log('Error:', err)
        })
}

async function quickstart() {

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.textDetection('https://qwe-1.herokuapp.com/out.jpeg');
    const labels = result.textAnnotations;
    console.log(labels);

    app.get('/gv-txt-1' , (req, res) => {
        res.send(
            labels
        )
    })

    labels.forEach(label => {
        console.log(label.description)
    });


}

//quickstart()


// app.get('/gv-test-003', (req, res) => {
//     const client = new vision.ImageAnnotatorClient();

//     // Performs label detection on the image file
//     const [result] = await client.textDetection('https://qwe-1.herokuapp.com/out.jpeg');
//     const labels = result.textAnnotations;
//     console.log('Labels:');

//     labels.forEach(label => {
//         console.log(typeof label.description)
//     });

   
// })


const server = app.listen(process.env.PORT || 1000, () => {
    const port = server.address().port
    console.log(`Express working in port: ${port}`)
})