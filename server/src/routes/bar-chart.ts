import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const getBarChartData = async (req:Request, res:Response) => {
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
  
      const ranges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity }
      ];
  
      const barChartData = await Promise.all(
        ranges.map(async ({ min, max }) => {
          const count = await Transaction.countDocuments({
            ...filter,
            price: { $gte: min, $lt: max === Infinity ? Number.MAX_VALUE : max }
          });
  
          return {
            range: `${min}-${max === Infinity ? 'above' : max}`,
            count
          };
        })
      );
  
      res.json(barChartData);
    } catch (error) {
      res.status(500).json({ message: error});
    }
  };
  