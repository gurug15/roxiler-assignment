import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const getStatistics = async (req: Request, res: Response) => {
  try {

    const month = parseInt(req.query.month as string);
    if (isNaN(month) || month < 1 || month > 12) {
      res.status(400).json({ message: "Invalid month parameter" });
      return;
    }

    const stats = await Transaction.aggregate([
      { 
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          soldItems: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] }
          },
          notSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] }
          }
        }
      }
    ]);

    res.json(stats[0] || {
      totalSaleAmount: 0,
      soldItems: 0,
      notSoldItems: 0
    });

  } catch (error) {
    res.status(500).json({ message: error});
  }
};
