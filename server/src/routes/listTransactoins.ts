import { Request, Response } from "express";
import { Transaction } from "../models/transaction";

export const listTransactions = async (req: Request, res: Response) => {
    console.log("control reached here");
    try {
        const { month = "3", search = "", page = "1", perPage = "10" } = req.query;

        const pageNo = Math.max(1, parseInt(page as string) || 1);
        const itemPerPage = Math.max(1, parseInt(perPage as string) || 10);
        const skip = (pageNo - 1) * itemPerPage;

        let filter: any = {};

        if (month && typeof month === "string") {
            filter = {
                ...filter,
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
                },
            };
        }

        if (search && typeof search === "string") {
            const searchFilter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { price: !isNaN(Number(search)) ? Number(search) : undefined },
                ].filter(Boolean),
            };
            filter = {
                ...filter,
                ...(Object.keys(searchFilter.$or).length > 0 ? searchFilter : {}),
            };
        }

        const transactions = await Transaction.find(filter)
            .skip(skip)
            .limit(itemPerPage);

        const total = await Transaction.countDocuments(filter);
        const totalPages = Math.ceil(total / itemPerPage);
        const hasNextPage = pageNo < totalPages;
        const hasPreviousPage = pageNo > 1;

        res.json({
            status: "success",
            data: {
                transactions,
                pagination: {
                    total,
                    page: pageNo,
                    perPage: itemPerPage,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error || "An error occurred",
        });
    }
};
