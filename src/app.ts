import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import dotenv from "dotenv"
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc"
import bodyParser from "body-parser"
const PORT: string | number = process.env.PORT || 4000
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello To TODO API Document',
        version: '1.0.0',
      }
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
  };
  
  const openapiSpecification = swaggerJsdoc(options);

const app: Express = express()
dotenv.config();




app.use(cors())
app.use(bodyParser.json())
app.use(todoRoutes)

var swaggerUiOptions = {
    explorer: true
  };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification,swaggerUiOptions));

const uri: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGODB_DB}?retryWrites=true&w=majority&authSource=admin`
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
// mongoose.set("useFindAndModify", false)


mongoose.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch(error => {
    console.log(`Server error :`, error)
})