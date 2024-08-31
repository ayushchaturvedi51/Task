import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../models/schema"
import dotenv from "dotenv"
dotenv.config()


export let client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: false,
});

client.connect().then(()=>{
  console.log("Postgress Client is Connected Successfully")
  
}).catch((err:any)=>{
  console.log("Error connecting DB : ",err)
  
});

const postgresdb = drizzle(client,{schema:{...schema}});

export default postgresdb