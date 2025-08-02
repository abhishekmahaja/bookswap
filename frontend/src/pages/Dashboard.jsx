import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FiPlus,
  FiX,
  FiBookOpen,
  FiUser,
  FiInfo,
  FiUpload,
} from "react-icons/fi";
import { getBook } from "../apis/server";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBook();
      setBooks(response?.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("author", newBook.author);
      formData.append("description", newBook.description);

      if (newBook.imageFile) {
        formData.append("image", newBook.imageFile);
      } else if (newBook.image) {
        formData.append("imageUrl", newBook.image);
      }

      await axios.post(
        "https://bookswap-ten.vercel.app/api/v1/books/addBook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showToast("Book added successfully!", "success");
      setOpenAddModal(false);
      setNewBook({
        title: "",
        author: "",
        description: "",
        image: "",
        imageFile: null,
      });
      setPreviewImage(null);
      fetchBooks();
    } catch (err) {
      showToast("Failed to add book", "error");
      console.error(err);
    }
  };

  const handleRequestBook = async () => {
    try {
      await axios.post(
        `https://bookswap-ten.vercel.app/api/v1/books/requestBook/${selectedBook?._id}`
      );
      showToast("Book request sent successfully!", "success");
      setOpenRequestDialog(false);
    } catch (err) {
      showToast("Failed to send request", "error");
      console.error(err);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook({
        ...newBook,
        image: "",
        imageFile: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setNewBook({
      ...newBook,
      image: e.target.value,
      imageFile: null,
    });
    setPreviewImage(e.target.value || null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setOpenDetailModal(true);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 p-4 md:p-8 w-full ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Book Dashboard</h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Book
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* Books Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => handleBookClick(book)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={book.image || "https://via.placeholder.com/300x200"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm truncate">
                  by {book.author}
                </p>
                <div className="mt-3">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Book Modal */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Book
              </h2>
              <button
                onClick={() => setOpenAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Book title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Author name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Book description"
                  ></textarea>
                </div>

                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Book Cover
                  </label>

                  {/* Image Preview */}
                  {previewImage && (
                    <div className="mb-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-40 object-contain rounded-md border border-gray-200"
                      />
                    </div>
                  )}

                  <div className="flex flex-col space-y-3">
                    {/* File Upload */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-100 hover:bg-gray-50"
                      >
                        <FiUpload className="mr-2 text-gray-100" />
                        Upload Image
                      </button>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="mx-2 text-gray-500">OR</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* URL Input */}
                    <div>
                      <input
                        type="text"
                        name="image"
                        value={newBook.image}
                        onChange={handleImageUrlChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBook}
                  disabled={
                    !newBook.title ||
                    !newBook.author ||
                    !newBook.description ||
                    (!newBook.image && !newBook.imageFile)
                  }
                  className={`px-4 py-2 rounded-md text-white ${
                    !newBook.title ||
                    !newBook.author ||
                    !newBook.description ||
                    (!newBook.image && !newBook.imageFile)
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Detail Modal */}
      {openDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedBook?.title}
              </h2>
              <button
                onClick={() => setOpenDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <img
                    src={
                      selectedBook?.image ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={selectedBook?.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiUser className="mr-2" />
                    <span className="font-medium">
                      by {selectedBook?.author}
                    </span>
                  </div>
                  <div className="flex items-start text-gray-600 mb-4">
                    <FiInfo className="mr-2 mt-1" />
                    <p className="text-gray-700">{selectedBook?.description}</p>
                  </div>
                  <button
                    onClick={() => setOpenRequestDialog(true)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Request This Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Confirmation Dialog */}
      {openRequestDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Book Request
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-100 mb-6">
                Are you sure you want to request "{selectedBook?.title}" by{" "}
                {selectedBook?.author}?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setOpenRequestDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-100 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestBook}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex items-center">
            <span>{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-4"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
