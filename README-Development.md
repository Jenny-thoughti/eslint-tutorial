# eslint-tutorial 👋

## 🏠 [Homepage](https://www.example.com)

## For Local or Development environment

### Go to web directory & run following command

```bash
git clone <Repo_url>
```

### Install all dependencies

```sh
$ npm install
# or
$ npm i
# or
$ yarn
```

### For initial setup, we will need to add/update following environment variables in `.env` file inside root directory. If file does not exist, create one. You can also use `.env.example` file or following snippet

```sh
## Application Configuration
NODE_ENV="development"
APP_PORT=5000
APP_URL="http://localhost:5000"
HTTPS=false
# ## Not required in production or running app on HTTP
# SSL_CRT_FILE=""
# ## Not required in production or running app on HTTP
# SSL_KEY_FILE=""
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

### Start app in local / development environment

```sh
npm run dev
# or
yarn dev
```

### Application will start at `APP_URL` configured in `.env` file

## Copyright © 2023 [Example](https://www.example.com)
