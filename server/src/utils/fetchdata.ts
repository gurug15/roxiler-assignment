import axios from 'axios';
import dotenv from 'dotenv'
import { ITransaction } from '../models/transaction';
import { title } from 'process';

dotenv.config();

export const fetchTransactionData = async (): Promise<ITransaction[]> => {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    throw new Error('API_URL environment variable is not defined');
  }

  try {
    const response = await axios.get(API_URL);
    const data: ITransaction[] = response.data;
    console.log("data is:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};