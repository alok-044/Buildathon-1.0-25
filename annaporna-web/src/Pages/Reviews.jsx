import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            size={28}
            className={`cursor-pointer transition-all
                        transform hover:scale-125
                        ${starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      `}
            onClick={() => setRating(starValue)}
          />
        );
      })}
    </div>
  );
};

const Reviews = () => {
  const { user } = useAuth();
  const isDonor = user?.role === 'donor';

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    alert("Review Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 page-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ratings & Reviews</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Review</h2>
              
              <p className="text-gray-600 mb-6">
                {isDonor ? (
                    <>You just completed a donation with <span className="font-semibold text-brand-green">Helping Hands NGO</span>.</>
                ) : (
                    <>You just received a donation from <span className="font-semibold text-brand-green">Spice Garden Restaurant</span>.</>
                )}
                {" "}Please rate your experience.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                  <StarRating rating={rating} setRating={setRating} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add a comment (optional)</label>
                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={isDonor ? "Was the pickup on time?" : "Was the food quality good?"}
                    className="w-full p-3 border rounded-md bg-gray-50 transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-brand-orange"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-brand-orange text-white rounded-lg font-semibold hover:bg-opacity-90 
                             transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Send size={18} /> Submit Review
                </button>
              </form>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Review History</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02]">
                  <div className="p-3 bg-green-100 rounded-full h-fit">
                    <CheckCircle className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">You rated "{isDonor ? 'City Bakery' : 'Helping Hands'}"</h4>
                    <div className="flex items-center my-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-sm text-gray-600 italic">"Great experience, very professional."</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02]">
                  <div className="p-3 bg-green-100 rounded-full h-fit">
                    <CheckCircle className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">"{isDonor ? 'Helping Hands' : 'City Bakery'}" rated you</h4>
                    <div className="flex items-center my-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-sm text-gray-600 italic">"Smooth coordination and timely {isDonor ? 'pickup' : 'delivery'}."</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;