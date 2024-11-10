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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransactionData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fetchTransactionData = () => __awaiter(void 0, void 0, void 0, function* () {
    const API_URL = process.env.API_URL;
    if (!API_URL) {
        throw new Error('API_URL environment variable is not defined');
    }
    try {
        const response = yield axios_1.default.get(API_URL);
        const data = response.data;
        // const transformdata : ITransaction[] = data.map((item)=>({
        //     title: item.title,
        //     description: item.description,
        //     price: parseInt(item.price)
        // }))
        console.log("data is:", data);
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchTransactionData = fetchTransactionData;
