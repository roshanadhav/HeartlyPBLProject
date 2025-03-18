import { Facebook, Twitter, Linkedin, Mail, Send } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white py-8 px-6 sm:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold">Hartly</h2>
          <p className="mt-2 text-gray-300">
            Connecting hearts, creating moments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition-all">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-all">Features</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-all">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-all">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="mt-2 text-gray-300">Subscribe to get the latest updates and news.</p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition-all">
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400">© 2025 Hartly. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-blue-400 transition-all"><Facebook size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-all"><Twitter size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-all"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-blue-400 transition-all"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
