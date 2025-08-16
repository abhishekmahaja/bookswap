import axios from "axios";
import { catchError } from "../utlis/helper";
import { AUTH_URL, REVIEW_URL, BOOK_URL } from "./client";

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

export const addBook = async (formData, token) => {
  try {
    const response = await axios.post(`${BOOK_URL}/addBook`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("token", token);
    return response.data;
  } catch (error) {
    return catchError(error); 
  }
};

export const getBook = async () => {
  try {
    const response = await axios.get(`${BOOK_URL}/getBook`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
export const swapBook = async () => {
  try {
    const response = await axios.get(`${AUTH_URL}/get-swaps-history`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};


export const submitReview = async (bookId, reviewData, token) => {
  return await axios.post(
    `${REVIEW_URL}/submit-review`,
    reviewData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getReviews = async (bookId, token) => {
  return await axios.get(`http://localhost:6300/api/v1/books/${bookId}/reviews`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};