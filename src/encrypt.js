const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const { ALGORITHM, ENCRYPED_EXT } = require("./constants/constants");
const AppendInitVect = require("./helper/appendInitVect");
const getCipherKey = require("./helper/getCipherKey");

/*
===================================================================================
Example : encrypt({ file: './file.txt', password: 'dogzrgr8' })
===================================================================================
*/
const encrypt = ({ file, password }) => new Promise((resolve, reject) => {
  try {
    const initVect = crypto.randomBytes(16); // Generate a secure, pseudo random initialization vector.

    const CIPHER_KEY = getCipherKey(password); // Generate a cipher key from the password.
    const readStream = fs.createReadStream(file);
    const gzip = zlib.createGzip();
    const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, initVect);
    const appendInitVect = new AppendInitVect(initVect);

    const filePath = path.join(file + ENCRYPED_EXT); // Create a write stream with a different file extension.
    const writeStream = fs.createWriteStream(filePath);

    writeStream.on("close", () => {
      resolve(path.resolve(filePath));
    });

    readStream
      .pipe(gzip)
      .pipe(cipher)
      .pipe(appendInitVect)
      .pipe(writeStream);
  } catch (e) {
    reject(e);
  }
});

module.exports = encrypt;
