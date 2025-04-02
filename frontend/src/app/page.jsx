'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PropTypes from 'prop-types';

function HomeContent() {
  return (
    <div className="relative mt-20 min-h-screen flex flex-col items-center text-center bg-white">
      {/* Hero Section */}
      <motion.div
        className="w-full h-[580px] flex flex-col lg:flex-row justify-between items-center bg-white 
                    py-8 px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Hero Image */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img 
            src="https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/gty_240411_doctor_artificial_intelligence_800x450.jpg" 
            alt="Doctor Consultation"
            className="w-[500px] h-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left lg:pl-10">
          <motion.h1
            className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Predict Your Heart Wellness
          </motion.h1>
          <p className="mt-4 text-lg font-light text-gray-700 max-w-xl">
            Get AI-powered insights into your heart health with personalized recommendations.
          </p>
          <Link href="/predict">
            <motion.button
              className="mt-6 px-8 py-3 text-lg font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mb-20 mt-16 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        <FeatureCard
          img="https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_776422_17123165547518811.jpg"
          title="Heart Risk Analysis"
          description="Understand your heart's risk factors with AI-driven analysis."
        />
        <FeatureCard
          img="https://cdn.prod.website-files.com/6284f87fcb6ba2a6ad7d4875/62a06c133319b795a629532d_MacBook%20Pro%2016_%20-%206%20(15).png"
          title="Personalized Suggestions"
          description="Get customized recommendations to improve heart health."
        />
        <FeatureCard
          img="https://media.licdn.com/dms/image/v2/D4D12AQH7i-cZB4r0Tg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682418575718?e=2147483647&v=beta&t=A8QYkNcWCSYKAvCK_RFvW8uRZ5A34rfHotxXabSgRB8"
          title="Healthy Lifestyle Tips"
          description="Follow expert-backed health tips for a better heart."
        />
      </div>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ img, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200 transition-all hover:shadow-2xl hover:scale-105 transform duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <img src={img} alt={title} className="w-full h-40 object-cover rounded-lg" />
    <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
);
FeatureCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomeContent;
