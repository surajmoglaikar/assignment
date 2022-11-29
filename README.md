# Backend Server

### Install all server dependencies.
#### Go to backend directory & run follwing command:
```bash
$ npm install
# or
$ yarn
# or
$ yarn install
```

### Need to add/update following environment variables in ".env" file inside "backend" directory. If file doesnot exist, create one. You can also use ".env.example" file for following snippet
```bash

NODE_ENV="development"
jwtPrivateKey = "test"
SOCKET_URL = "http://localhost:3000"

HTTPS=false
APP_PORT=3000
API_URL_BASE="localhost:3000"
CLIENT_URL="http://localhost:3000"
# SSL_CRT_FILE=""
# SSL_KEY_FILE=""

## Database Configuration
DB_TYPE="mysql"
DB_HOST="localhost"
DB_PORT=3306
DB_NAME=""
DB_USER=""
DB_PASS=""
DB_MAX_CON=10
DB_MIN_CON=0
DB_ACQUIRE_TIMEOUT=30000
DB_IDLE_TIMEOUT=10000

```
### Run database migration.
#### Go to backend directory & run follwing command:
```bash
$ sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

### To start node server, go to backend directory & run following command.
```bash
$ npm start
# or
$ yarn start
```