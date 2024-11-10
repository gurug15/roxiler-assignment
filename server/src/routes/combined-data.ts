import axios from "axios";
import { Request, Response } from "express";

export const getCombinedData = async (req: Request, res: Response) => {
  try {
    const month = parseInt(req.query.month as string);
    if (isNaN(month) || month < 1 || month > 12) {
      res.status(400).json({ message: "Invalid month parameter" });
      return;
    }

    const [statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/api/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:5000/api/pie-chart?month=${month}`)
    ]);

    res.json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};
