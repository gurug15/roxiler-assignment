import { connectToDatabase } from "../config/db"
import { Transaction } from "../models/transaction"
import { fetchTransactionData } from "../utils/fetchdata"


const seedDatabase =  async ()=>{
    try {
        console.log("seeding the database.....")
        await connectToDatabase()
        //await Transaction.deleteMany({});
        const insertData = await fetchTransactionData()
        await Transaction.insertMany(insertData)

        console.log('Database seeding completed successfully');
        return { success: true, message: 'Database seeded successfully' };
    } catch (error) {
          console.error('Error seeding database:', error);
          throw error;
    }
} 

seedDatabase()


