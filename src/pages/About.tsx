import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, Zap, Users, TrendingUp, Menu, X } from 'lucide-react';
import CryptoTicker from '../components/CryptoTicker';
import EventBookingModal from '../components/EventBookingModal';

function About() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Coffee Club', path: '/subscribe' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Brew Paper', path: '/brew-paper' },
    { name: 'Event Booking', action: () => setIsEventModalOpen(true) },
  ];

  return (
    <div className="min-h-screen">
      {/* Shipping Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-green to-steel-blue py-2 sm:py-3">
        <div className="text-center">
          <p className="text-[#F5E6D3] font-semibold text-xs sm:text-sm md:text-base px-4">
            FREE SHIPPING on orders over $50 | $5 Flat Rate on all other orders | 10% discount on all $USDC
          </p>
        </div>
      </div>

      {/* Crypto Ticker */}
      <CryptoTicker />

      <div className="animated-bg">
        <div className="container mx-auto container-responsive spacing-responsive">
          {/* Navigation - positioned to align with back button */}
          <div className="absolute top-12 sm:top-16 right-4 sm:right-6 z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-steel-blue/90 text-luxe-cream hover:bg-steel-blue hover:text-gold transition-colors p-2 rounded-lg border border-emerald-green/30"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              ) : (
                <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute right-0 top-16 sm:top-20 bg-steel-blue/90 backdrop-filter backdrop-blur-8 border border-emerald-green/30 rounded-2xl py-2 min-w-[180px] sm:min-w-[200px] shadow-lg"
              >
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        navigate(item.path);
                      }
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-luxe-cream hover:text-gold hover:bg-steel-blue/60 transition-colors text-sm sm:text-base"
                    className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-luxe-cream hover:text-gold hover:bg-black transition-colors text-sm sm:text-base"
                  >
                    {item.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Back Button - positioned to align with dropdown menu */}
          <div className="flex justify-between items-start mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-[#F5E6D3] hover:text-emerald-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Header */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <img 
              src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
              alt="Coffee & Crypto Coffee Co." 
              className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto"
            />
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl mb-8 sm:mb-12"
            >
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-responsive-xl font-bold text-luxe-cream mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <Coffee className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-green" />
                  About Us
                </h1>
                <h2 className="text-responsive-md font-semibold text-luxe-cream mb-6 sm:mb-8">
                  Where Craft Coffee Meets the Future.
                </h2>
              </div>

              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
                <p className="text-luxe-cream/90 text-center sm:text-left">
                  Welcome to Coffee & Crypto Coffee Co., where every sip fuels your journey — and your ownership.
                </p>

                <p className="text-luxe-cream/90">
                  We're not just a coffee brand. We're a movement at the intersection of quality and culture, merging the bold richness of Guatemalan specialty coffee with the cutting-edge power of Web3 technology. From farmers to founders, from your first morning pour to your next investment move, we're building a new kind of ecosystem — one where every cup is a step toward freedom, wealth, and belonging.
                </p>

                <p className="text-luxe-cream/90">
                  Through our flagship line Web3 Wake™, our exclusive memberships, and our luxury-focused brand experiences, we empower a growing network of dreamers, builders, and conscious consumers. When you brew with us, you're not just drinking coffee — you're buying into ownership, education, and a lifestyle that's smart, sexy, and sovereign.
                </p>

                <div className="text-center py-6 sm:py-8">
                  <h3 className="text-responsive-lg font-bold bg-gradient-to-r from-gold to-emerald-green bg-clip-text text-transparent mb-4">
                    Sip. Grow. Succeed.
                  </h3>
                  <p className="text-lg sm:text-xl text-luxe-cream/90 italic">
                    Because your morning ritual should do more than wake you up — it should wake up your world.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid-responsive-3 gap-6 sm:gap-8 mb-8 sm:mb-12"
            >
              <div className="glass-card p-6 sm:p-8 rounded-2xl text-center">
                <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-green mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-3 sm:mb-4">Premium Quality</h3>
                <p className="text-sm sm:text-base text-luxe-cream/80">
                  Sourced from the finest Guatemalan farms, our coffee represents the pinnacle of craft and quality.
                </p>
              </div>

              <div className="glass-card p-6 sm:p-8 rounded-2xl text-center">
                <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-green mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-3 sm:mb-4">Web3 Innovation</h3>
                <p className="text-sm sm:text-base text-luxe-cream/80">
                  Pioneering the future of coffee through blockchain technology, NFTs, and decentralized ownership.
                </p>
              </div>

              <div className="glass-card p-6 sm:p-8 rounded-2xl text-center">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-green mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-3 sm:mb-4">Community First</h3>
                <p className="text-sm sm:text-base text-luxe-cream/80">
                  Building a network of conscious consumers who value quality, innovation, and shared success.
                </p>
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl text-center"
            >
              <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-green mx-auto mb-4 sm:mb-6" />
              <h2 className="text-responsive-md font-bold text-luxe-cream mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg lg:text-xl text-luxe-cream/90 leading-relaxed max-w-3xl mx-auto">
                To revolutionize the coffee industry by creating an ecosystem where exceptional quality meets cutting-edge technology, 
                empowering our community to own their coffee experience while building wealth and connections that last a lifetime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-steel-blue/90 border-t border-emerald-green/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand Column */}
              <div className="space-y-6">
                <img 
                  src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
                  alt="Coffee & Crypto Coffee Co." 
                  className="w-40 sm:w-48 md:w-56 h-auto"
                />
                <p className="text-luxe-cream/70 text-sm leading-relaxed">
                  Where blockchain meets exceptional coffee. Crafted for the ambitious and forward-thinking.
                </p>
              </div>

              {/* Coffee & Shop */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Coffee & Shop</h3>
                <ul className="space-y-3">
                  <li><a href="/shop" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Shop Coffee</a></li>
                  <li><a href="/merch" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Shop Merch</a></li>
                  <li><a href="/gift-cards" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Gift Cards</a></li>
                  <li><a href="/locations" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Cafe Locations</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="/contact" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Contact Us</a></li>
                  <li><a href="/about" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">About Us</a></li>
                  <li><a href="/terms" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Terms of Service</a></li>
                  <li><a href="/refund-policy" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Refund Policy</a></li>
                </ul>
              </div>

              {/* Account & Community */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Account & Community</h3>
                <ul className="space-y-3">
                  <li><a href="/login" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Account Login</a></li>
                  <li><a href="https://discord.gg/gaBCj5XYgb" target="_blank" rel="noopener noreferrer" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Join Our Discord</a></li>
                </ul>
                
                {/* Community Message */}
                <div className="mt-6 p-4 glass-card rounded-xl">
                  <p className="text-[#F5E6D3]/80 text-sm leading-relaxed">
                    Make friends, ask questions, drink coffee and share your story.
                  </p>
                </div>
              </div>
            </div>

            {/* Hashtag Section */}
            <div className="text-center py-8 border-t border-gold/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold via-emerald-green to-gold bg-clip-text text-transparent mb-2">
                  #SipAndSucceed
                </h2>
                <p className="text-[#F5E6D3]/60 text-sm">
                  Join the movement. Share your journey.
                </p>
              </motion.div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-8 border-t border-emerald-green/20 text-center">
              <p className="text-[#F5E6D3]/50 text-sm">
                © 2025 Coffee & Crypto Coffee Co. All rights reserved. | Powered by blockchain innovation.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Event Booking Modal */}
      <EventBookingModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
}

export default About;