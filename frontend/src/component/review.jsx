import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ bookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  const URL_LIVE = "https://bookswap-ten.vercel.app/api/v1/review";
  const URL_LOCAL = "http://localhost:6300/api/v1/review";

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${URL_LOCAL}/get-review/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // console.log("reviews",reviews)

  const handleReviewSubmit = async () => {
    if (!rating || !comment)
      return alert("Please provide both rating and comment");

    setLoading(true);
    try {
      await axios.post(
        `${URL_LOCAL}/submit-review`,
        { bookId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setRating(0);
      await fetchReviews();
    } catch (err) {
      console.error("Review submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Submit a Review</h3>
      <div className="flex items-center space-x-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Write your comment..."
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        onClick={handleReviewSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      <h3 className="text-lg font-semibold mt-6 mb-2">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-2">
          {reviews.map((r, i) => (
            <li key={i} className="border p-3 rounded shadow-sm bg-gray-50">
              <p className="font-medium">Rating: {r.rating} ★</p>
              <p className="text-gray-700">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
