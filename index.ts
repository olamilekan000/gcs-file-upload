import Cloud = require('@google-cloud/storage')
import util = require('util')

const { format } = util;
const CloudStorage = Cloud.Storage;

interface ProjectKeyId {
	keyFilename: string,
	projectId: string,
}

interface uploadFile {
	originalname: string,
	buffer: number[]
}

interface uploadOptions {
	resum?: boolean,
	gcszip?: boolean
}

export class gcsFileUpload extends CloudStorage {
  constructor(public obj: ProjectKeyId, public bucketName: string) {
    super(obj);
    this.bucketName = bucketName;
  }

  async createGCSBucket(bucketName: string): Promise<string> {
    await this.createBucket(bucketName);
    return `Bucket ${bucketName} created.`;
  }

  getGCSBuckets(): {} {
    return this.bucket(this.bucketName);
  }

  uploadFile(file: uploadFile, options?: uploadOptions): Promise<string> {
    return new Promise((resolve, reject) => {
		  const { originalname, buffer } = file;

		  const bucket = this.bucket(this.bucketName);
		  const blob = bucket.file(originalname.replace(/ /g, '_'));
		  const blobStream = blob.createWriteStream({
		    resumable: options ? options.resum : false,
		    gzip: options ? options.gcszip : false,
		  });
		  blobStream.on('finish', () => {
		    const publicUrl: string = format(
		      `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
		    );
		    resolve(publicUrl);
		  })
		  .on('error', () => {
		    reject('Unable to upload file, something went wrong');
		  })
		  .end(buffer);
    });
  }
}
