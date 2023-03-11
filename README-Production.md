# eslint-tutorial 👋

## 🏠 [Homepage](https://www.example.com)

## For Staging or Production environment

### Go to web directory & run following command

```bash
git clone <Repo_url>
```

### Install all dependencies

```sh
$ npm install --production
# or
$ npm i --production
# or
$ yarn install --production
```

### For initial setup, we will need to add/update following environment variables in `.env` file inside root directory. If file does not exist, create one. You can also use `.env.example` file or following snippet

```sh
## Application Configuration
NODE_ENV="production"
APP_PORT=5000
APP_URL="http://localhost:5000"
SESSION_SECRET="%-usqaU_0sq1uhbws&UUaE_YAnHDoXMa"

## Logger Configuration
LOGGER_SIZE="10M"
LOGGER_MAX_SIZE="1G"
LOGGER_INTERVAL="1M"

## Error Configuration
ERR_404="Resource not found."
ERR_501="Method not implemented."
```

### Update env according to server details such as `Application Configuration`, etc

(Please note, `SSL_CRT_FILE` & `SSL_KEY_FILE` are used in local / development environment only if you want to run node server over `HTTPS`.)

### Start app in staging / production environment

```sh
npm start
# or
yarn start
```

### Application will start at `APP_URL` configured in `.env` file

## Copyright © 2023 [Example](https://www.example.com)
