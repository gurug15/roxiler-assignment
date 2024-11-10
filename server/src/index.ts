import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'

import { connectToDatabase } from './config/db';
import { listTransactions } from './routes/listTransactoins';
import { getStatistics } from './routes/statistics';
import { getBarChartData } from './routes/bar-chart';

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase();

const PORT = process.env.PORT || 5000


app.get("/api/transaction",listTransactions)
app.get("/api/statictics", getStatistics)
app.get("/api/bar-chart", getBarChartData)
// app.get("/api/pie-chart", listTransactoins)
// app.get("/api/combined", listTransactoins)




app.listen(PORT, ()=>{
    console.log("app is listning on port: ", PORT)
})