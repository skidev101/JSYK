"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const LandingPage: React.FC = () => {

  const [showNavbar, setShowNavbar] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showEmojiExplosion, setShowEmojiExplosion] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setShowEmojiExplosion(true)
        setTimeout(() => setShowEmojiExplosion(false), 3000)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLoginClick = () => {
    // Navigate to login page - you'll implement this with your router
    console.log("Navigate to /login")
  }

  const handleSignupClick = () => {
    // Navigate to signup page - you'll implement this with your router
    console.log("Navigate to /register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Custom Styles */}
      <style>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes emojiPop {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        .navbar-slide-in {
          animation: slideInFromTop 0.6s ease-out;
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse 3s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .emoji-explosion {
          animation: emojiPop 3s ease-out forwards;
        }

        .mesh-gradient {
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 mesh-gradient"></div>

      {/* Spray Paint Gradients */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-radial from-purple-200/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-radial from-pink-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-radial from-emerald-200/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-radial from-orange-200/20 to-transparent rounded-full blur-3xl"></div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            filter: "blur(1px)",
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          }}
        />
      ))}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${showNavbar ? "navbar-slide-in" : "opacity-0 -translate-y-full"}`}
      >
        <div className="backdrop-blur-md bg-white/10 border-b border-white/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold shimmer-text">JSYK</div>
            <div className="flex gap-4">
              <button
                onClick={handleLoginClick}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Floating Message Bubbles */}
          {[
            { text: "tell me something...", top: "10%", left: "2%", delay: "0s" },
            { text: "you're amazing! 💫", top: "20%", right: "10%", delay: "1s" },
            { text: "secret confession 🤫", top: "60%", left: "8%", delay: "2s" },
            { text: "anonymous thoughts", top: "70%", right: "15%", delay: "0.5s" },
            { text: "be yourself ✨", top: "40%", left: "5%", delay: "1.5s" },
            { text: "no judgment here", top: "50%", right: "5%", delay: "2.5s" },
          ].map((bubble, index) => (
            <div
              key={index}
              className="absolute bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-white/30 float-animation pulse-glow"
              style={{
                ...bubble,
                animationDelay: bubble.delay,
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <span className="text-sm font-medium text-gray-700">{bubble.text}</span>
            </div>
          ))}

          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
            <span className="shimmer-text">anonymous</span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">messages</span>
            <br />
            <span className="shimmer-text">real fun</span>
            <br />
            <span className="shimmer-text">~ jsyk ~</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Share your thoughts anonymously. Get honest feedback.
            <br />
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              No names, just real conversations.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
              Start Messaging
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 text-lg font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-xl border border-white/30 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Choose JSYK?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "100% Anonymous",
                description: "No names, no profiles. Just pure, honest communication.",
                icon: "👻",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Safe Space",
                description: "Share your thoughts without fear of judgment or consequences.",
                icon: "🛡️",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Real Conversations",
                description: "Get authentic feedback and genuine connections.",
                icon: "💬",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Easy to Use",
                description: "Simple, clean interface. No complicated setup required.",
                icon: "⚡",
                gradient: "from-orange-500 to-red-500",
              },
              {
                title: "Privacy First",
                description: "Your data stays private. We don't track or store personal info.",
                icon: "🔒",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                title: "Fun & Engaging",
                description: "Discover new perspectives and enjoy meaningful interactions.",
                icon: "🎉",
                gradient: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of people sharing their thoughts anonymously. Your voice matters, and your privacy is
                protected.
              </p>
              <button className="px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-xl hover:scale-105">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/40 backdrop-blur-sm border-t border-white/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold shimmer-text mb-4">JSYK</div>
          <p className="text-gray-600 mb-6">Anonymous messaging made simple and safe.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </footer>

      {/* Emoji Explosion */}
      {showEmojiExplosion && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {["💬", "🎉", "✨", "👻", "🔥", "💫", "🚀", "💝", "🌟", "🎊", "💭", "⚡"].map((emoji, index) => (
            <div
              key={index}
              className="absolute text-4xl emoji-explosion"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LandingPage
