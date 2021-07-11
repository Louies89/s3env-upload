const fs = require("fs");
const path = require("path");
const uploadEnvFile = require("./uploadEnvFile");

/*
===================================================================================
Example :  uploadAllEnvFiles()
===================================================================================
*/
const uploadAllEnvFiles = async () => {
  const ENV_FILES_PATH = path.resolve(__dirname, "../envFilesToUpload");
  const allFiles = [];

  fs.readdirSync(ENV_FILES_PATH).forEach((file) => {
    allFiles.push({ name: file, path: path.join(ENV_FILES_PATH, file) });
  });

  await Promise.all(allFiles.map(async (file) => {
    await uploadEnvFile(file.path, file.name);
  }));
};

module.exports = uploadAllEnvFiles;
