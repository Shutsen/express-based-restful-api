# An express based RESTful API from scratch

## Project setup
```
npm install
```
In order for the new products POST API to work, add an "uploads" folder in the root dir

### Database setup
This repo works with Mongo DB, and mongoose, to connect your database download Robo 3T, create your DB there and specify the DB name in the env variables

### Create a folder in the root dir '/config' and add following environment variables in /config/dev.env (used by the dev script)
```
MONGODB_URL=mongodb://127.0.0.1:27017/<yourdatabasename>
JWT_KEY=<randomcreatedsecret>
PORT=3000
```
### For testing purposes, add a local test database. Add /config/test.env (used by the test script) and use the same env vars as dev.env but now with your test db name
```
MONGODB_URL=mongodb://127.0.0.1:27017/<YOUR-TEST-DATABASE-NAME>
JWT_KEY=<randomcreatedsecret>
PORT=3000
```

### Run the following command for HMR development
```
npm run dev
```

### Run tests
```
npm run test
```
