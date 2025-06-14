const Feedback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback</h2>
        <p className="text-gray-600 mb-4">We’d love to hear your thoughts!</p>
        <textarea
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your feedback here..."
        ></textarea>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
