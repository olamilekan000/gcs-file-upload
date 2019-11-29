const { gcsFileUpload } = require('../')
const path = require('path')
const fs = require('fs')

const serviceKey = path.join(__dirname, './storage.json')
const file = path.join(__dirname, './bakugo.jpg')
const file2 = path.join(__dirname, './stain.jpg')

const myFile = fs.readFileSync(file)
const myFile2 = fs.readFileSync(file2)

// object containing the file metadata
const fileMetaData = {
	originalname: 'bakugo',
	buffer: myFile
}

const fileMetaData2 = {
	originalname: 'stain',
	buffer: myFile2
}

const myBucket = new gcsFileUpload({
  keyFilename: serviceKey,
  projectId: 'hacker-bay',
}, "hacker-bay-store")

console.log(myBucket.getGCSBuckets())

myBucket
	.uploadFile(fileMetaData)
	.then((data: string) => {
		console.log(data)
	})
	.catch((err: string) => {
		console.log(err)
	})

myBucket
	.uploadFile(fileMetaData2, {
		gzip: true
	})
	.then((data: string) => {
		console.log(data)
	})
	.catch((err: string) => {
		console.log(err)
	})
