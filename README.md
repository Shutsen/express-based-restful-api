# An express based RESTful API from scratch

## Project setup
```
npm install
```
In order for the new products POST API to work, add an "uploads" folder in the root dir

### Database setup
This project uses MongoDB Atlas as a database.
Create an account on: <a href="https://cloud.mongodb.com/user#/atlas/login" target="_blank">https://cloud.mongodb.com/user#/atlas/login</a>

Choose the free plan and set it up with the default settings.
In your Atlas cluster, click "connect" > "connect your application" and change / compare this project's app.js file: 
"mongoose.connect..." with the provided URI connection string and your own user credentials

### Environment variables `.env`
```
MONGO_ATLAS_USERNAME=<your username for MongoDB atlas>
MONGO_ATLAS_PASSWORD=<your password for MongoDB atlas>
JWT_KEY=<a random created secret>
```

### Run the following command for HMR development
```
npm run start
```