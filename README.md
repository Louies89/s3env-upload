In this world where data is getting more and more important every day, we need to make sure we handle it carefully & secuerly.

Our serverside code are getting more heavy with business logic and using lots of third party services or database services.

Whether it is 3rd party services or data in database, we have to protect the data secuerly & access the data secuerly.

To connect to database or third party services, we use some authentication machanism which has authentication secret keys to be used to access the service or database.

This library is used to secuerly store the secret keys in a file in AWS S3 (`also can be used with any other store which are based on S3 object storage mechanism`), so that the file can be downloaded by server during initialisation and use those secrets in different apis.

Make sure your production environment is using [dotenv-flow](https://www.npmjs.com/package/dotenv-flow) to load environment secrets

**Installation**:

git clone https://github.com/Louies89/s3env-upload.git

    Note: 
    1 . **npm i s3env-upload** is **not** required as this is a stand alone package and shall be used to upload the secret environment files to S3

    2. if you want to use this with some other project then use **npm i s3env-upload** to add this package to your project

**Usage**:

After cloning the repo to your local

```bash
cd s3env-upload
```

Add your environment files to the directory "./envFilesToUpload"

Remove all the sample environment files and keep your environment files in "./envFilesToUpload"

Example:
```bash
# .env.production
MY_DB_URL="https://some-remote-db-url.com"
MY_DB_USER="secret-user"
MY_DB_PASSWORD="secret-password"
```

Then 