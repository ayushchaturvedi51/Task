import express from "express"
import dotenv from "dotenv"
const app=express();
import router from "./routes";
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*"}));
app.use("/",router)

app.listen(PORT,()=>{
  console.log(`Your SERVER is RUNNING at ${PORT}`)
})