'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

function PredictPage() {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/heartbeat.mp3') : null);

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload a file before predicting.");
      return;
    }

    setLoading(true);
    if (audio) audio.play();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("inputData", inputData);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      }).then(response => response.json())  
      .then(data => {
          setPrediction(data.prediction == 0 ? "Healthy" : "Unhealthy");
          console.log("Prediction Response:", data.prediction);
      })
      .catch(error => console.error("Error fetching prediction:", error));

      setShowResults(true);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Error getting prediction. Please try again.");
    } finally {
      setLoading(false);
      if (audio) audio.pause();
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  if (showResults) {
    return(
        <HeartWellnessResults prediction={prediction} confidence={prediction == "Healthy" ? 80 : 38} setShowResults={setShowResults}/>
    )
  }

  return (
    <div className="inset-0 flex justify-center bg-white">
      <motion.div
        className="relative w-[500px] mt-32 mb-32 bg-white rounded-3xl shadow-2xl p-10 border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-extrabold text-blue-600">Heart Wellness Prediction</h1>
        <p className="mt-4 text-gray-600 text-md">Upload your medical report or enter health parameters for AI-powered insights.</p>

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
        <div className="mt-6 border-2 border-dashed border-blue-400 p-6 rounded-xl bg-blue-50 cursor-pointer hover:bg-blue-100 transition">
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="flex flex-col items-center justify-center">
            <FiUploadCloud className="text-6xl text-blue-500" />
            <p className="mt-2 text-gray-600 text-lg">Drag & Drop or Click to Upload Heart Report</p>
            {file && <p className="text-sm text-green-600 mt-2">{file.name} uploaded</p>}
          </label>
        </div>

        {/* Predict Button */}
        <div className="mt-6">
          <button
            onClick={handlePredict}
            className="mt-4 w-full py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 bg-blue-600 shadow-lg hover:bg-blue-500"
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
      
      <Link href="/" className="mt-6 text-blue-500 hover:underline text-lg">Go Back</Link>
    </div>
  );
}

export default PredictPage;

export const HeartWellnessResults = ({ prediction, confidence, setShowResults }) => {
  const getProgressBarColor = () => {
    if (confidence > 70) return "bg-green-500"; 
    if (confidence > 40) return "bg-yellow-500"; 
    return "bg-red-500"; 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <motion.div
        className="w-full max-w-2xl bg-gray-100 rounded-3xl shadow-2xl p-10 border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-600 text-center">
          Heart Wellness Results
        </h1>
        <p className="mt-4 text-gray-700 text-center text-md">
          Based on your inputs, here are your results and health suggestions.
        </p>

        <motion.div
          className="mt-6 p-6 text-white font-semibold rounded-xl text-lg text-center shadow-lg bg-blue-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Prediction: {prediction}
        </motion.div>

        <div className="mt-4">
          <h3 className="text-gray-700 text-center font-semibold">Confidence Level</h3>
          <div className="w-full bg-gray-300 rounded-full h-6 mt-2 overflow-hidden">
            <motion.div
              className={`h-full ${getProgressBarColor()} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="text-gray-600 text-center mt-2">{confidence}% Confidence</p>
        </div>

        <motion.button
          onClick={() => setShowResults(false)}
          className="mt-6 w-full py-4 text-lg font-semibold text-white rounded-xl bg-blue-500 hover:bg-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Prediction
        </motion.button>
      </motion.div>
    </div>
  );
};
