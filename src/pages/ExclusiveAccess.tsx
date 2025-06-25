import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock, Star, Coffee, TrendingUp, Users, Zap, Crown, Download, Menu, X } from 'lucide-react';
import CryptoTicker from '../components/CryptoTicker';
import PaymentModal from '../components/PaymentModal';
import EventBookingModal from '../components/EventBookingModal';
import { stripeService } from '../services/stripeService';

function ExclusiveAccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Coffee Club', path: '/subscribe' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Brew Paper', path: '/brew-paper' },
    { name: 'Event Booking', action: () => setIsEventModalOpen(true) },
  ];

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      
      // Check if user is returning from successful payment
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        try {
          const result = await stripeService.verifyPayment(sessionId);
          if (result.success && result.accessToken) {
            stripeService.storeAccessToken(result.accessToken);
            setHasAccess(true);
            // Clean up URL
            navigate('/exclusive', { replace: true });
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      } else {
        // Check existing access
        setHasAccess(stripeService.hasValidAccess());
      }
      
      setIsLoading(false);
    };

    checkAccess();
  }, [searchParams, navigate]);

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setHasAccess(true);
  };

  const handleLogout = () => {
    stripeService.clearAccess();
    setHasAccess(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-luxe-cream text-lg">Checking access...</p>
        </div>
      </div>
    );
  }

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
          {/* Navigation */}
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
                    className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-luxe-cream hover:text-gold hover:bg-black transition-colors text-sm sm:text-base"
                  >
                    {item.name}
                  </button>
                ))}
                {hasAccess && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-red-300 hover:text-red-200 hover:bg-black transition-colors text-sm sm:text-base border-t border-luxe-cream/20"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Back Button */}
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

          {!hasAccess ? (
            /* Payment Required View */
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Lock className="w-12 h-12 text-emerald-green" />
                  <h1 className="text-responsive-xl font-bold text-luxe-cream">Exclusive Access</h1>
                </div>
                <p className="text-responsive-md text-luxe-cream/90 max-w-2xl mx-auto">
                  Unlock premium content, secret recipes, and exclusive perks reserved for our most dedicated coffee enthusiasts.
                </p>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              >
                <div className="glass-card p-6 rounded-2xl text-center">
                  <Coffee className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">Secret Menu</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    Access to exclusive coffee blends and recipes not available to the public
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-center">
                  <TrendingUp className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">Wholesale Pricing</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    Special bulk pricing for businesses and serious coffee enthusiasts
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-center">
                  <Users className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">Private Community</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    Join our exclusive Discord for crypto insights and coffee culture
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-center">
                  <Star className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">Early Access</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    First to try new blends and limited edition releases
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-center">
                  <Zap className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">Market Insights</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    Monthly crypto market analysis and trading insights
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-center">
                  <Crown className="w-12 h-12 text-emerald-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-luxe-cream mb-3">NFT Rewards</h3>
                  <p className="text-luxe-cream/80 text-sm">
                    Exclusive NFTs and blockchain-based loyalty rewards
                  </p>
                </div>
              </motion.div>

              {/* Pricing Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">One-Time Access Fee</h2>
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-luxe-cream mb-2">$49.99</div>
                    <div className="text-luxe-cream/70">Card Payment</div>
                  </div>
                  <div className="text-center relative">
                    <div className="absolute -top-3 -right-3 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full">
                      10% OFF
                    </div>
                    <div className="text-4xl font-bold text-emerald-green mb-2">$44.99</div>
                    <div className="text-luxe-cream/70">Crypto Payment</div>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsPaymentModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-green to-gold text-luxe-cream font-bold py-4 px-8 rounded-full text-xl hover:from-gold hover:to-emerald-green transition-all shadow-lg"
                >
                  Get Instant Access
                </motion.button>

                <p className="text-luxe-cream/60 text-sm mt-4">
                  Lifetime access • No recurring fees • Instant activation
                </p>
              </motion.div>

              {/* Testimonials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-luxe-cream/90 mb-4">
                    "The exclusive blends are incredible! The wholesale pricing has saved my café thousands. 
                    Best investment I've made for my business."
                  </p>
                  <div className="text-luxe-cream font-medium">- Sarah M., Café Owner</div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-luxe-cream/90 mb-4">
                    "The crypto insights alone are worth the price. Plus the coffee community is amazing. 
                    Great value for serious coffee and crypto enthusiasts."
                  </p>
                  <div className="text-luxe-cream font-medium">- Mike T., Crypto Trader</div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Exclusive Content View */
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Crown className="w-12 h-12 text-gold" />
                  <h1 className="text-responsive-xl font-bold text-luxe-cream">Welcome to the Inner Circle</h1>
                </div>
                <p className="text-responsive-md text-luxe-cream/90 max-w-2xl mx-auto">
                  You now have access to our most exclusive content and perks. Explore everything below.
                </p>
              </motion.div>

              {/* Exclusive Content Sections */}
              <div className="space-y-8">
                {/* Secret Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <Coffee className="w-8 h-8 text-emerald-green" />
                    <h2 className="text-3xl font-bold text-luxe-cream">Secret Coffee Menu</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-emerald-green/10 p-6 rounded-xl border border-emerald-green/20">
                      <h3 className="text-xl font-bold text-luxe-cream mb-3">Blockchain Brew</h3>
                      <p className="text-luxe-cream/80 mb-4">
                        A complex blend of Ethiopian and Colombian beans with notes of dark chocolate and citrus. 
                        Perfect for late-night coding sessions.
                      </p>
                      <div className="text-emerald-green font-bold">Exclusive Recipe Included</div>
                    </div>

                    <div className="bg-emerald-green/10 p-6 rounded-xl border border-emerald-green/20">
                      <h3 className="text-xl font-bold text-luxe-cream mb-3">Crypto Cold Brew</h3>
                      <p className="text-luxe-cream/80 mb-4">
                        24-hour cold extraction process with Guatemalan beans. Smooth, low-acid, 
                        high-caffeine for maximum focus.
                      </p>
                      <div className="text-emerald-green font-bold">Brewing Guide Available</div>
                    </div>

                    <div className="bg-emerald-green/10 p-6 rounded-xl border border-emerald-green/20">
                      <h3 className="text-xl font-bold text-luxe-cream mb-3">DeFi Decaf</h3>
                      <p className="text-luxe-cream/80 mb-4">
                        Swiss water processed Colombian beans with rich chocolate and nutty flavors. 
                        All the taste, none of the jitters.
                      </p>
                      <div className="text-emerald-green font-bold">Limited Availability</div>
                    </div>
                  </div>
                </motion.div>

                {/* Wholesale Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <TrendingUp className="w-8 h-8 text-emerald-green" />
                    <h2 className="text-3xl font-bold text-luxe-cream">Wholesale Pricing</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-luxe-cream mb-2">5-10 lbs</div>
                      <div className="text-emerald-green font-bold text-xl mb-2">15% OFF</div>
                      <div className="text-luxe-cream/70">Perfect for small cafés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-luxe-cream mb-2">11-25 lbs</div>
                      <div className="text-emerald-green font-bold text-xl mb-2">25% OFF</div>
                      <div className="text-luxe-cream/70">Ideal for restaurants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-luxe-cream mb-2">25+ lbs</div>
                      <div className="text-emerald-green font-bold text-xl mb-2">35% OFF</div>
                      <div className="text-luxe-cream/70">Enterprise pricing</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button className="bg-emerald-green text-luxe-cream font-bold py-3 px-6 rounded-xl hover:bg-emerald-green/80 transition-colors">
                      Contact for Wholesale Orders
                    </button>
                  </div>
                </motion.div>

                {/* Downloads */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <Download className="w-8 h-8 text-emerald-green" />
                    <h2 className="text-3xl font-bold text-luxe-cream">Exclusive Downloads</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-emerald-green/10 rounded-xl border border-emerald-green/20">
                      <div>
                        <h3 className="text-lg font-bold text-luxe-cream">Complete Brewing Guide</h3>
                        <p className="text-luxe-cream/70 text-sm">50-page PDF with professional techniques</p>
                      </div>
                      <button className="bg-emerald-green text-luxe-cream px-4 py-2 rounded-lg hover:bg-emerald-green/80 transition-colors">
                        Download
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-green/10 rounded-xl border border-emerald-green/20">
                      <div>
                        <h3 className="text-lg font-bold text-luxe-cream">Crypto Market Report</h3>
                        <p className="text-luxe-cream/70 text-sm">Monthly analysis and insights</p>
                      </div>
                      <button className="bg-emerald-green text-luxe-cream px-4 py-2 rounded-lg hover:bg-emerald-green/80 transition-colors">
                        Download
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-green/10 rounded-xl border border-emerald-green/20">
                      <div>
                        <h3 className="text-lg font-bold text-luxe-cream">Recipe Collection</h3>
                        <p className="text-luxe-cream/70 text-sm">Exclusive coffee recipes and variations</p>
                      </div>
                      <button className="bg-emerald-green text-luxe-cream px-4 py-2 rounded-lg hover:bg-emerald-green/80 transition-colors">
                        Download
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-green/10 rounded-xl border border-emerald-green/20">
                      <div>
                        <h3 className="text-lg font-bold text-luxe-cream">Business Starter Kit</h3>
                        <p className="text-luxe-cream/70 text-sm">Guide to starting a coffee business</p>
                      </div>
                      <button className="bg-emerald-green text-luxe-cream px-4 py-2 rounded-lg hover:bg-emerald-green/80 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Community Access */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass-card p-8 rounded-2xl text-center"
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Users className="w-8 h-8 text-emerald-green" />
                    <h2 className="text-3xl font-bold text-luxe-cream">Private Community</h2>
                  </div>
                  <p className="text-luxe-cream/90 mb-6 max-w-2xl mx-auto">
                    Join our exclusive Discord server where coffee enthusiasts and crypto experts share insights, 
                    discuss market trends, and connect over their shared passions.
                  </p>
                  <button className="bg-gradient-to-r from-emerald-green to-gold text-luxe-cream font-bold py-4 px-8 rounded-xl text-lg hover:from-gold hover:to-emerald-green transition-all shadow-lg">
                    Join Private Discord
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-steel-blue/90 border-t border-emerald-green/20 mt-16">
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
            <div className="text-center py-8 border-t border-emerald-green/20">
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

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Event Booking Modal */}
      <EventBookingModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
}

export default ExclusiveAccess;