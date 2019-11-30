# gcs-file-upload

Upload files to Google Cloud Storage easily and with less code.

## Installation

```sh
- npm install gcs-file-upload
- yarn add gcs-file-upload
```
## Usage

```sh
const { gcsFileUpload } = require('gcs-file-upload')
const path = require('path')
const fs = require('fs')

# (path to file and service account key)
const serviceKey = path.join(__dirname, './storage.json')

const myBucket = new gcsFileUpload({
  keyFilename: serviceKey,
  projectId: 'your project Id',
}, "Your Bucket name")

const file = path.join(__dirname, './bakugo.jpg')
const myFile = fs.readFileSync(file)

const fileMetaData = {
  originalname: 'bakugo',
  buffer: myFile
}

myBucket
  .uploadFile(fileMetaData)
  .then((data) => {
	console.log(data)
  })
  .catch((err) => {
	console.log(err)
  })

myBucket
  .uploadFile(fileMetaData2, {
    gzip: true
  })
  .then((data) => {
	console.log(data)
  })
  .catch((err) => {
	console.log(err)
  })

```

### License

MIT License. See the [LICENSE](LICENSE) file.