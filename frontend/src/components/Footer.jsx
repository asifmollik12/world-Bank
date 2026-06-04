import { FaUniversity, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 rounded-full p-2">
                <FaUniversity className="text-white text-lg" />
              </div>
              <div>
                <div className="text-white font-bold">World Bank Group</div>
                <div className="text-xs text-blue-400">Your Trusted Loan Partner</div>
              </div>
            </div>
            <p className="text-sm text-blue-300 leading-relaxed">
              Providing easy, fast & secure loan services to help you achieve your financial goals.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition"><FaFacebook /></a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition"><FaTwitter /></a>
              <a href="#" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/loan-plans" className="hover:text-white transition">Loan Plans</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h4 className="text-white font-semibold mb-4">Loan Types</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">Personal Loan</li>
              <li className="hover:text-white cursor-pointer transition">Business Loan</li>
              <li className="hover:text-white cursor-pointer transition">Home Loan</li>
              <li className="hover:text-white cursor-pointer transition">Education Loan</li>
              <li className="hover:text-white cursor-pointer transition">Emergency Loan</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FaPhone className="text-blue-400" /> 01700-000000</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-blue-400" /> support@worldbankgroup.com</li>
              <li className="flex items-start gap-2"><FaMapMarkerAlt className="text-blue-400 mt-0.5" /> Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} World Bank Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
