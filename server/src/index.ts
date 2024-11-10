import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'

import { connectToDatabase } from './config/db';
import { listTransactions } from './routes/listTransactoins';
import { getStatistics } from './routes/statistics';
import { getBarChartData } from './routes/bar-chart';
import { getPieChartData } from './routes/pie-chart';
import { getCombinedData } from './routes/combined-data';

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
connectToDatabase();

const PORT = process.env.PORT || 5000


app.get("/api/transaction",listTransactions)
app.get("/api/statistics", getStatistics)
app.get("/api/bar-chart", getBarChartData)
app.get("/api/pie-chart", getPieChartData)
app.get("/api/combined", getCombinedData)




app.listen(PORT, ()=>{
    console.log("app is listning on port: ", PORT)
})