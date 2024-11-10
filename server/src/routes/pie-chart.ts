import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const getPieChartData = async (req:Request, res:Response) => {
    try {
      const {month=""} = req.query;
      let filter: any = {};

        if (month && typeof month === "string") {
            filter = {
                ...filter,
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
                },
            };
        }
  
      const pieChartData = await Transaction.aggregate([
        { $match: filter },
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