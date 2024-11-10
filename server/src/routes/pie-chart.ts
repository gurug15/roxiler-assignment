import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const getPieChartData = async (req:Request, res:Response) => {
    try {
      const month  = parseInt(req.query.month as string);
      if(isNaN(month) || month < 1 || month > 12){
         res.status(400).json({message: "Invalid month"})
         return;
      }
      
      const monthFilter = {
        $expr: {
          $eq: [{ $month: '$dateOfSale' },month]
        }
      };
  
      const pieChartData = await Transaction.aggregate([
        { $match: monthFilter },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            _id: 0
          }
        }
      ]);
  
      res.json(pieChartData);
    } catch (error) {
      res.status(500).json({ message: error});
    }
  };