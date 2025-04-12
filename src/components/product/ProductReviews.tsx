import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Flag } from 'lucide-react';

// Review data model
interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  comment: string;
  helpfulCount: number;
  userImage?: string;
}

// Props interface
interface ProductReviewsProps {
  productId: string | number;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
}) => {
  // Component states
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative'>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  // Default review data (if no reviews are provided)
  const defaultReviews: Review[] = [
    {
      id: 1,
      username: 'John Smith',
      date: 'March 15, 2025',
      rating: 5,
      comment: 'Amazing product! High quality and excellent materials. Will definitely buy again.',
      helpfulCount: 24,
      userImage: '/api/placeholder/30/30',
    },
    {
      id: 2,
      username: 'Sarah Johnson',
      date: 'March 10, 2025',
      rating: 4,
      comment: 'Very good product but shipping took longer than expected. The size fits well and quality is excellent.',
      helpfulCount: 15,
      userImage: '/api/placeholder/30/30',
    },
    {
      id: 3,
      username: 'Michael Davis',
      date: 'March 5, 2025',
      rating: 2,
      comment: 'The product is not worth the price. Quality is lower than expected and colors differ from photos.',
      helpfulCount: 7,
      userImage: '/api/placeholder/30/30',
    },
  ];

  // Use provided reviews or default reviews if none provided
  const reviewsToDisplay = reviews.length > 0 ? reviews : defaultReviews;

  // Filter reviews based on active tab
  const filteredReviews = reviewsToDisplay.filter((review) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'positive') return review.rating >= 4;
    if (activeTab === 'negative') return review.rating <= 2;
    return true;
  });

  // Calculate average rating if not provided
  const calculatedAverageRating =
    averageRating > 0
      ? averageRating
      : reviewsToDisplay.reduce((acc, review) => acc + review.rating, 0) / reviewsToDisplay.length;

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could add code to send the review to your server
    console.log('Review submitted:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
    // After successful submission, you could update the review list
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= rating ? '#FFD700' : 'none'}
            color={star <= rating ? '#FFD700' : '#D1D5DB'}
          />
        ))}
      </div>
    );
  };

  // Function to mark a review as helpful
  const handleMarkHelpful = (reviewId: number) => {
    console.log('Marked as helpful:', reviewId);
    // Here you would update the helpfulCount on your server
  };

  return (
    <div className="w-full mt-12 mb-16">
      <h2 className="text-2xl font-bold mb-6">Product Reviews</h2>

      {/* Review summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{calculatedAverageRating.toFixed(1)}</div>
              <div className="flex flex-col ml-2">
                {renderStars(Math.round(calculatedAverageRating))}
                <span className="text-sm text-gray-500 mt-1">
                  {totalReviews || reviewsToDisplay.length} reviews
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review form */}
      {showReviewForm && (
        <div className="bg-white p-6 mb-8 border rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Share Your Experience</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="cursor-pointer"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    fill={star <= newReview.rating ? '#FFD700' : 'none'}
                    color={star <= newReview.rating ? '#FFD700' : '#D1D5DB'}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block mb-2 text-sm font-medium">
                Your Review
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Share your thoughts about the product..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Review tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 mr-4 ${
            activeTab === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Reviews
        </button>
        <button
          className={`py-2 px-4 mr-4 ${
            activeTab === 'positive'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('positive')}
        >
          Positive
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'negative'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('negative')}
        >
          Negative
        </button>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {review.userImage ? (
                    <img
                      src={review.userImage}
                      alt={review.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                      {review.username.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{review.username}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-700 my-3">{review.comment}</p>
              
              <div className="flex items-center mt-4">
                <button 
                  onClick={() => handleMarkHelpful(review.id)}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <ThumbsUp size={14} className="mr-1" />
                  Helpful ({review.helpfulCount})
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 ml-4">
                  <Flag size={14} className="mr-1" />
                  Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews found for the selected filter.
          </div>
        )}
      </div>

      {/* Pagination could be added here */}
      {reviewsToDisplay.length > 5 && (
        <div className="flex justify-center mt-8">
          <button className="px-4 py-2 border rounded-md mr-2 text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;