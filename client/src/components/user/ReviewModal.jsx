import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from '../../config/axios.js';

const ReviewModal = ({ isOpen, onClose, foodId, foodName, foodImage }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(`/food/${foodId}/review`, {
        rating,
        comment: comment.trim()
      });
      
      toast.success('Review submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error?.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md p-6 rounded-xl border border-surface bg-card">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-off-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-off-white mb-4">Rate Your Experience</h2>
        
        {/* Food item info */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={foodImage} 
            alt={foodName} 
            className="h-14 w-14 rounded object-cover"
          />
          <div className="font-semibold text-off-white">{foodName}</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-off-white mb-2">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 ${star <= rating ? 'text-primary' : 'text-muted'}`}
                    fill={star <= rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Comment */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-off-white mb-2">Your Review (Optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full p-3 rounded-lg border border-surface bg-black text-off-white placeholder:text-muted focus:border-primary focus:outline-none"
              rows="3"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-600 text-off-white font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;