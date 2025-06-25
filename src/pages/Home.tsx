import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, CoffeeIcon, Bitcoin, Menu, X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { coffeeBlends } from '../data/coffeeBlends';
import CryptoTicker from '../components/CryptoTicker';
import WalletConnect from '../components/WalletConnect';
import EventBookingModal from '../components/EventBookingModal';

function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Coffee Club', path: '/subscribe' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Brew Paper', path: '/brew-paper' },
    { name: 'Exclusive Access', path: '/exclusive' },
    { name: 'Event Booking', action: () => setIsEventModalOpen(true) },
  ];

  return (
    <div className="min-h-screen">
      {/* Shipping Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-green to-steel-blue py-2 sm:py-3">
        <div className="text-center">
          <p className="text-luxe-cream font-semibold text-xs sm:text-sm md:text-base px-4">
            FREE SHIPPING on orders over $50 | $5 Flat Rate on all other orders | 10% discount on all $USDC
          </p>
        </div>
      </div>

      {/* Crypto Ticker */}
      <CryptoTicker />

      {/* Main Content */}
      <div className="animated-bg">
        <div className="container mx-auto container-responsive spacing-responsive">
          {/* Wallet Connect Component */}
          <WalletConnect />

          {/* Navigation */}
          <div className="absolute top-12 sm:top-16 right-0 p-4 sm:p-6 z-50">
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
                className="absolute right-2 sm:right-4 top-16 sm:top-20 bg-steel-blue/90 backdrop-filter backdrop-blur-8 border border-emerald-green/30 rounded-2xl py-2 min-w-[180px] sm:min-w-[200px] shadow-lg"
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
                    className={`w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-luxe-cream hover:text-gold hover:bg-black transition-colors text-sm sm:text-base flex items-center gap-2 ${
                      item.name === 'Exclusive Access' ? 'border-t border-luxe-cream/20' : ''
                    }`}
                  >
                    {item.name === 'Exclusive Access' && <Lock className="w-4 h-4 text-gold" />}
                    {item.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Header */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <img 
              src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
              alt="Coffee & Crypto Coffee Co." 
              className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto"
            />
          </div>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h1 className="text-responsive-xl font-bold mb-4 sm:mb-6 text-luxe-cream text-shadow px-4">
              Own Your Coffee Experience
            </h1>
            <p className="text-responsive-md text-luxe-cream/90 text-shadow max-w-2xl mx-auto px-4">
              Where blockchain meets exceptional coffee. Pre-order your coffee today and mint your limited NFT to unlock PERKS.
            </p>
          </motion.div>

          {/* Exclusive Access CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-gold" />
                <h2 className="text-2xl sm:text-3xl font-bold text-luxe-cream">Unlock Exclusive Access</h2>
              </div>
              <p className="text-luxe-cream/90 mb-6">
                Get access to secret recipes, wholesale pricing, and our private community. 
                Pay with crypto and save 10%!
              </p>
              <motion.button
                onClick={() => navigate('/exclusive')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold to-emerald-green text-luxe-cream font-bold py-3 px-8 rounded-full text-lg hover:from-emerald-green hover:to-gold transition-all shadow-lg"
              >
                Explore Exclusive Content
              </motion.button>
            </div>
          </motion.div>

          {/* Featured Coffee Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-responsive-lg font-bold text-luxe-cream text-shadow px-4">
              Featured Coffee
            </h2>
          </motion.div>

          {/* Coffee Blends */}
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-16 sm:mb-24 lg:mb-32">
            {coffeeBlends.map((blend) => (
              <motion.div
                key={blend.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card p-4 sm:p-6 lg:p-8 rounded-2xl cursor-pointer transition-all hover:bg-black/80"
                onClick={() => navigate(`/product/${blend.id}`)}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-full sm:w-20 md:w-24 h-48 sm:h-20 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={blend.imageUrl} 
                      alt={blend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-luxe-cream">{blend.name}</h3>
                    <p className="text-base sm:text-lg text-luxe-cream/80 mb-2">{blend.origin}</p>
                    <p className="text-sm sm:text-base text-luxe-cream/70 mb-3 sm:mb-0">{blend.description}</p>
                    <div className="mt-2 sm:mt-4 text-xl sm:text-2xl font-bold text-luxe-cream">${blend.price}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Our Story Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center glass-card p-6 sm:p-8 lg:p-12 rounded-2xl"
          >
            <h2 className="text-responsive-lg font-bold text-luxe-cream mb-6 sm:mb-8">Our Story</h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-luxe-cream/90 mb-6 sm:mb-8">
              In a world moving at the speed of innovation, Coffee and Crypto was born at the intersection of ritual and revolution. More than a luxury coffee brand, it's a mindset— crafted for the ambitious and forward- thinking. Each cup sparks clarity, focus, and exploration into the world of crypto. Because success isn't just hustle—it's rhythm, awareness, and intentional growth.
            </p>
            <h3 className="text-responsive-lg font-bold bg-gradient-to-r from-gold to-emerald-green bg-clip-text text-transparent">
              Sip. Grow. Succeed.
            </h3>
          </motion.div>
          {/* Membership Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mt-16 sm:mt-24 lg:mt-32"
          >
            <div className="grid-responsive-2 gap-8 sm:gap-12 items-center">
              {/* Image Side */}
              <div className="relative order-2 md:order-1">
                <img 
                  src="/Screen Shot 2025-06-08 at 6.38.09 PM.png" 
                  alt="Coffee & Crypto Coffee Co. Premium Experience"
                  className="w-full max-w-md mx-auto aspect-square object-contain"
                />
              </div>

              {/* Content Side */}
              <div className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl order-1 md:order-2">
                <div className="text-center mb-6 sm:mb-8">
                  <p className="text-luxe-cream font-semibold text-sm sm:text-base lg:text-lg tracking-wider uppercase mb-4">
                    BECOME A HODLER
                  </p>
                  <h2 className="text-responsive-lg font-bold text-luxe-cream mb-4 sm:mb-6">
                    Crypto Coffee Club
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-luxe-cream/90 mb-6 sm:mb-8">
                    Join our exclusive membership and unlock the future of coffee rewards through blockchain technology.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-luxe-cream rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-luxe-cream/80">
                      <span className="font-semibold text-luxe-cream">Unlimited Premium Brews</span> - Access to all signature blends with member pricing
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-luxe-cream rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-luxe-cream/80">
                      <span className="font-semibold text-luxe-cream">NFT Rewards</span> - Earn exclusive Coffee & Crypto NFTs with every purchase
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-luxe-cream rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-luxe-cream/80">
                      <span className="font-semibold text-luxe-cream">Crypto Cashback</span> - 5% back in $BREW tokens on all orders
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-luxe-cream rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-luxe-cream/80">
                      <span className="font-semibold text-luxe-cream">Early Access</span> - First to try new blends and limited releases
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-luxe-cream rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-luxe-cream/80">
                      <span className="font-semibold text-luxe-cream">Blockchain Perks</span> - Exclusive access to crypto education content and market insights
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-emerald-green to-gold text-luxe-cream font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:from-gold hover:to-emerald-green transition-all shadow-lg"
                >
                  Join the Club
                </motion.button>

                <p className="text-center text-luxe-cream/60 text-xs sm:text-sm mt-3 sm:mt-4">
                  Monthly membership • Cancel anytime • Blockchain secured
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-steel-blue/90 border-t border-emerald-green/20">
        <div className="container mx-auto container-responsive py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid-responsive-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Brand Column */}
              <div className="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 lg:col-span-1">
                <img 
                  src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
                  alt="Coffee & Crypto Coffee Co." 
                  className="w-32 sm:w-40 md:w-48 h-auto"
                />
                <p className="text-luxe-cream/70 text-sm leading-relaxed">
                  Where blockchain meets exceptional coffee. Crafted for the ambitious and forward-thinking.
                </p>
              </div>

              {/* Coffee & Shop */}
              <div>
                <h3 className="text-luxe-cream font-bold text-base sm:text-lg mb-3 sm:mb-4">Coffee & Shop</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><a href="/shop" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Shop Coffee</a></li>
                  <li><a href="/merch" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Shop Merch</a></li>
                  <li><a href="/gift-cards" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Gift Cards</a></li>
                  <li><a href="/locations" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Cafe Locations</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-luxe-cream font-bold text-base sm:text-lg mb-3 sm:mb-4">Support</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><a href="/contact" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Contact Us</a></li>
                  <li><a href="/about" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">About Us</a></li>
                  <li><a href="/terms" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Terms of Service</a></li>
                  <li><a href="/refund-policy" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Refund Policy</a></li>
                </ul>
              </div>

              {/* Account & Community */}
              <div>
                <h3 className="text-luxe-cream font-bold text-base sm:text-lg mb-3 sm:mb-4">Account & Community</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><a href="/login" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Account Login</a></li>
                  <li><a href="https://discord.gg/gaBCj5XYgb" target="_blank" rel="noopener noreferrer" className="text-luxe-cream/70 hover:text-gold transition-colors text-sm sm:text-base">Join Our Discord</a></li>
                  <li><a href="/exclusive" className="text-gold hover:text-gold/80 transition-colors text-sm sm:text-base flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Exclusive Access
                  </a></li>
                </ul>
                
                {/* Community Message */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 glass-card rounded-xl">
                  <p className="text-luxe-cream/80 text-sm leading-relaxed">
                    Make friends, ask questions, drink coffee and share your story.
                  </p>
                </div>
              </div>
            </div>

            {/* Hashtag Section */}
            <div className="text-center py-6 sm:py-8 border-t border-emerald-green/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold via-emerald-green to-gold bg-clip-text text-transparent mb-2">
                  #SipAndSucceed
                </h2>
                <p className="text-luxe-cream/60 text-sm">
                  Join the movement. Share your journey.
                </p>
              </motion.div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-6 sm:pt-8 border-t border-emerald-green/20 text-center">
              <p className="text-luxe-cream/50 text-sm">
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

export default Home;