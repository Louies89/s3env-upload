/* eslint-disable no-console */
const fs = require("fs");
const AWS = require("aws-sdk");
const encrypt = require("./encrypt");

const uploadFile = async (encryptedFilePath, s3FileName) => {
  try {
    const {
      S3_BUCKET_PATH, S3_BUCKET_SUB_PATH,
      S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
    } = process.env;

    const s3 = new AWS.S3({
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY
    });

    fs.readFile(encryptedFilePath, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: `${S3_BUCKET_PATH}/${S3_BUCKET_SUB_PATH}`, // bucket name & subpath
        Key: s3FileName, // file name <env_file_name>.<with_extension>
        Body: data
      };

      s3.upload(params, (s3Err, info) => {
        if (s3Err) throw s3Err;
        console.log(`####### File uploaded successfully at ${info.Location}`);
        fs.unlink("encryptedFilePath", () => {}); // Delete the file
      });
    });
  } catch (e) {
    console.error("####### Upload error :-", e);
  }
};

/*
===================================================================================
Example :  uploadEnvFile("../envFilesToUpload/.env.production", "env.production")
===================================================================================
*/
const uploadEnvFile = async (envFilePath, s3FileName) => {
  const {
    S3_BUCKET_PATH, S3_BUCKET_SUB_PATH,
    S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY,
    ENV_FILE_ENCRYPTION_SECRET
  } = process.env;

  if (!S3_BUCKET_PATH || !S3_BUCKET_SUB_PATH || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY
       || !ENV_FILE_ENCRYPTION_SECRET) {
    console.error("####### Insufficient Environment variables");
    console.table({
      ERROR: true,
      ERR_CODE: "INSUFFICIENT_ENV_VARIABLE",
      S3_BUCKET_PATH,
      S3_BUCKET_SUB_PATH,
      S3_ACCESS_KEY_ID,
      S3_SECRET_ACCESS_KEY,
      ENV_FILE_ENCRYPTION_SECRET
    });
    return;
  }

  encrypt({ file: envFilePath, password: ENV_FILE_ENCRYPTION_SECRET }) // encrypt the env file
    .then((encryptedFilePath) => {
      uploadFile(encryptedFilePath, s3FileName);
    })
    .catch((e) => {
      console.log("####### File Encrypt error :", e);
    });
};

module.exports = uploadEnvFile;
