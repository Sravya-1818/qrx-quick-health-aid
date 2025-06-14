import { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("⚠️ Please write some feedback before submitting.");
      return;
    }

    // 🔧 Replace this with actual backend/Firestore API if needed
    console.log("Feedback submitted:", feedback);

    setSubmitted(true);
    setFeedback("");

    // Optionally reset submission after delay
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-xl w-full bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">📝 Feedback</h2>
        <p className="text-gray-600 mb-4">We’d love to hear your thoughts!</p>

        <textarea
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your feedback here..."
        ></textarea>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>

        {submitted && (
          <p className="text-green-600 mt-3">✅ Thank you for your feedback!</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
