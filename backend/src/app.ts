import express from "express"
import dotenv from "dotenv"
const app=express();
import router from "./routes";
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT

app.use(cors({
  origin: '*', // You can restrict this to specific domains for more security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
 }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/",router)

app.listen(PORT,()=>{
  console.log(`Your SERVER is RUNNING at ${PORT}`)
})