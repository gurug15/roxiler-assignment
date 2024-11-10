import { model, Schema } from "mongoose"

export interface ITransaction {
    title: string,
    price:number,
    description: string,
    category: string,
    image: string,
    sold: boolean,
    dateOfSale: Date
}


const transactionSchema = new Schema<ITransaction>({
    title: { type: String , required: true},
    price:{ type: Number , required: true},
    description: { type: String , required: true},
    category: { type: String , required: true},
    image: { type: String , required: true},
    sold: { type: Boolean , required: true},
    dateOfSale: { type: Date , required: true},
})



export const Transaction = model<ITransaction>("Transaction", transactionSchema)