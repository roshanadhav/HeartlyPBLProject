"use client";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaLaptopMedical, FaShieldAlt, FaChartLine, FaHandsHelping } from "react-icons/fa";

export default function About() {
  return (
    <div className="mt-20 min-h-screen bg-white text-black p-6 flex flex-col items-center text-center">
      <motion.h1
            className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            About Heart Wellness Prediction
          </motion.h1>
          
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <FeatureCard 
          icon={<FaHeartbeat size={50} className="text-red-500" />} 
          title="Accurate Predictions" 
          description="Using AI models, we provide reliable heart disease risk assessment." 
        />
        <FeatureCard 
          icon={<FaUsers size={50} className="text-red-500" />} 
          title="User-Friendly" 
          description="Our intuitive interface ensures accessibility for everyone." 
        />
        <FeatureCard 
          icon={<FaLaptopMedical size={50} className="text-red-500" />} 
          title="Health Insights" 
          description="Get detailed insights and preventive measures for heart wellness." 
        />
        <FeatureCard 
          icon={<FaShieldAlt size={50} className="text-red-500" />} 
          title="Secure & Private" 
          description="Your health data remains confidential and protected." 
        />
        <FeatureCard 
          icon={<FaChartLine size={50} className="text-red-500" />} 
          title="Data-Driven Analysis" 
          description="Our platform uses advanced analytics for better predictions." 
        />
        <FeatureCard 
          icon={<FaHandsHelping size={50} className="text-red-500" />} 
          title="Community Support" 
          description="Engage with a health-conscious community for better well-being." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className="bg-gray-100 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
    >
      {icon}
      <h2 className="text-xl font-semibold mt-3 text-black">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
}
