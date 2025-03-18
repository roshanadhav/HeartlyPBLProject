'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

function HomeContent() {
  return (
    <div className="relative mt-20 min-h-screen flex flex-col items-center text-center bg-white">
      {/* Hero Section */}
      <motion.div
        className="w-full h-[700px] flex flex-col justify-center items-center 
                   bg-cover bg-center bg-no-repeat shadow-lg border-t border-gray-300 py-8 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute h-200 inset-0 bg-black bg-opacity-50"
          style={{
            backgroundImage: "url('https://scopeblog.stanford.edu/wp-content/uploads/2024/02/shutterstock_140225476.jpg')",
          }}
        ></div>{" "}
        {/* Overlay */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-[#ADD8E6]">
            Predict Your Heart Wellness
          </h1>
          <p className="mt-4 text-lg font-light text-gray-200">
            Get AI-powered insights into your heart health with personalized recommendations.
          </p>
          <Link href="/predict">
            <motion.button
              className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
              whileHover={{ scale: 1.1 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mt-50 mx-auto my-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
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
    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition border border-gray-300"
    whileHover={{ scale: 1.05 }}
  >
    <img
      src={img}
      alt={title}
      className="w-full h-40 object-cover rounded-md"
    />
    <h3 className="mt-4 text-xl font-semibold text-black">{title}</h3>
    <p className="mt-2 text-gray-700">{description}</p>
  </motion.div>
);
FeatureCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomeContent;