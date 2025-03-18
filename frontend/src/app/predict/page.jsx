'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

function PredictPage() {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/heartbeat.mp3') : null);

  const handlePredict = () => {
    setLoading(true);
    if (audio) audio.play();
    setTimeout(() => {
      setPrediction('Low Risk'); // Replace with API response
      setLoading(false);
      setShowResults(true);
      if (audio) audio.pause();
    }, 3000);
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  if (showResults) {
    return(
        <HeartWellnessResults setShowResults={setShowResults}/>
    )
      
  }

  return (
    <div
      className="inset-0 bg-black bg-opacity-50 flex justify-center"
      style={{ backgroundImage: "url('https://scopeblog.stanford.edu/wp-content/uploads/2024/02/shutterstock_140225476.jpg')" }}
    >
      <motion.div
        className="relative w-[500px] mt-32 mb-32 bg-opacity-10 bg-white rounded-3xl shadow-2xl p-10 border border-gray-400 backdrop-blur-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-extrabold text-white">Heart Wellness Prediction</h1>
        <p className="mt-4 text-gray-300 text-md">Upload your medical report or enter health parameters for AI-powered insights.</p>
        
        {/* Heart Animation */}
        <div className="flex justify-center mt-6">
          <motion.img
            src="/pngtree-detailed-artificial-heart-with-soft-glowing-lifeforce-png-image_14807787-removebg-preview.png"
            alt="Heartbeat Loader"
            className="w-32 h-32"
            animate={{ scale: loading ? [1, 1.2, 1] : 1 }}
            transition={loading ? { repeat: Infinity, duration: 0.5 } : {}}
          />
        </div>
        
        {/* Drag & Drop File Upload */}
        <div className="mt-6 border-2 border-dashed border-gray-500 p-6 rounded-xl bg-opacity-20 bg-white cursor-pointer hover:bg-opacity-30 transition">
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="flex flex-col items-center justify-center">
            <FiUploadCloud className="text-6xl text-gray-200" />
            <p className="mt-2 text-gray-300 text-lg">Drag & Drop or Click to Upload Heart Report</p>
            {file && <p className="text-sm text-green-400 mt-2">{file.name} uploaded</p>}
          </label>
        </div>

        {/* Predict Button */}
        <div className="mt-6">
          <button
            onClick={handlePredict}
            className="mt-4 w-full py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-indigo-500 hover:to-blue-600 hover:shadow-blue-500/50 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                </svg>
                <span>Analyzing...</span>
              </span>
            ) : (
              'Predict'
            )}
          </button>
        </div>
      </motion.div>
      
      <Link href="/" className="mt-6 text-blue-400 hover:underline text-lg">Go Back</Link>
    </div>
  );
}

export default PredictPage;



export const HeartWellnessResults = ({ prediction, confidence, setShowResults }) => {
  // Determine progress bar color based on confidence percentage
  const getProgressBarColor = () => {
    if (confidence > 70) return "bg-green-500"; // Safe
    if (confidence > 40) return "bg-yellow-500"; // Caution
    return "bg-red-500"; // Danger
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-20 bg-gray-900 p-6">
      <motion.div
        className="w-full max-w-2xl bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-extrabold text-white text-center">
          Heart Wellness Results
        </h1>
        <p className="mt-4 text-gray-300 text-center text-md">
          Based on your inputs, here are your results and health suggestions.
        </p>

        {/* Prediction Box */}
        <motion.div
          className="mt-6 p-6 text-white font-semibold rounded-xl text-lg text-center shadow-lg bg-blue-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Prediction: {prediction}
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="mt-4">
          <h3 className="text-white text-center font-semibold">Confidence Level</h3>
          <div className="w-full bg-gray-600 rounded-full h-6 mt-2 overflow-hidden">
            <motion.div
              className={`h-full ${getProgressBarColor()} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="text-gray-300 text-center mt-2">{confidence}% Confidence</p>
        </div>

        {/* Recommendations */}
        <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-inner">
          <h2 className="text-xl font-semibold text-white">Health Recommendations:</h2>
          <ul className="mt-3 text-gray-300 list-disc list-inside">
            <motion.li whileHover={{ scale: 1.1 }}>✅ Maintain a balanced diet rich in vegetables and whole grains.</motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>✅ Engage in at least 30 minutes of exercise daily.</motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>✅ Monitor your heart rate regularly.</motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>✅ Stay hydrated and manage stress levels.</motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>✅ Consult a doctor if you experience any unusual symptoms.</motion.li>
          </ul>
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => setShowResults(false)}
          className="mt-6 w-full py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 bg-blue-500 shadow-lg hover:bg-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Prediction
        </motion.button>
      </motion.div>
    </div>
  );
};






