import { Link } from 'react-router-dom'
import { FaArrowRight, FaDownload } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background — bank building */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Centered card */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-10 py-10 text-white text-center max-w-xl w-full border border-white/10">

          {/* Globe SVG */}
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="3.5">
              <circle cx="50" cy="50" r="44" />
              <ellipse cx="50" cy="50" rx="22" ry="44" />
              <ellipse cx="50" cy="50" rx="44" ry="17" />
              <line x1="6" y1="50" x2="94" y2="50" />
            </svg>
          </div>

          {/* Brand name */}
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/80 mb-4">
            WORLD BANK GROUP
          </p>

          {/* Bengali headline */}
          <h1
            className="text-2xl md:text-3xl font-bold leading-snug mb-8"
            style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
          >
            সহজ, দ্রুত ও নিরাপদ লোন আপনার<br />দোরগোড়ায়।
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-full transition flex items-center gap-2 text-sm"
              style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
            >
              ঋণের জন্য আবেদন করুন <FaArrowRight />
            </Link>
            <a
              href="#"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-full transition flex items-center gap-2 text-sm"
              style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
            >
              অ্যাপ ডাউনলোড করুন <FaDownload />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
