"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const transaction_1 = require("../models/transaction");
const fetchdata_1 = require("../utils/fetchdata");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("seeding the database.....");
        yield (0, db_1.connectToDatabase)();
        //await Transaction.deleteMany({});
        const insertData = yield (0, fetchdata_1.fetchTransactionData)();
        yield transaction_1.Transaction.insertMany(insertData);
        console.log('Database seeding completed successfully');
        return { success: true, message: 'Database seeded successfully' };
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
});
seedDatabase();
