import axios from "axios";
import { catchError } from "../utlis/helper";
import { AUTH_URL, BOOK_URL } from "./client";

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const addBook = async (formData) => {
  try {
    const response = await axios.post(`${BOOK_URL}/addBook`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
