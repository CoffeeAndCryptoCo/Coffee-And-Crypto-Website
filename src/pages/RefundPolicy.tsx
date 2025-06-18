import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, RotateCcw, Shield, Gift, Mail, CreditCard, Coins, Menu, X } from 'lucide-react';
import CryptoTicker from '../components/CryptoTicker';
import EventBookingModal from '../components/EventBookingModal';

function RefundPolicy() {
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
      <div className="w-full bg-gradient-to-r from-emerald-green to-steel-blue py-3">
        <div className="text-center">
          <p className="text-[#F5E6D3] font-semibold text-sm md:text-base">
            FREE SHIPPING on orders over $50 | $5 Flat Rate on all other orders | 10% discount on all $USDC
          </p>
        </div>
      </div>

      {/* Crypto Ticker */}
      <CryptoTicker />

      <div className="animated-bg">
        <div className="container mx-auto px-4 py-12">
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
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Header */}
          <div className="flex justify-center mb-16">
            <img 
              src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
              alt="Coffee & Crypto Coffee Co." 
              className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-auto"
            />
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold text-luxe-cream mb-6 flex items-center justify-center gap-4">
                <Shield className="w-12 h-12 text-emerald-green" />
                ☕ Refund & Return Policy
              </h1>
              <p className="text-xl text-luxe-cream/90 max-w-3xl mx-auto">
                At Coffee and Crypto Coffee Co., we're committed to delivering quality in every cup and every package. If something didn't go as planned, we're here to make it right.
              </p>
            </motion.div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {/* Returns & Exchanges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <RotateCcw className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">🔁 Returns & Exchanges</h2>
                </div>
                <div className="space-y-4 text-luxe-cream/90">
                  <p>We gladly accept returns on unopened coffee bags, unused merchandise, and apparel within 30 days of delivery.</p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-luxe-cream mb-3">To be eligible for a return:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Item must be unused and in original packaging</li>
                      <li>Proof of purchase is required (order confirmation or receipt)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-luxe-cream mb-3">You can choose between:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>A full refund to your original payment method</li>
                      <li>A store credit to use on a future order</li>
                      <li>An exchange for a product of equal value</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Non-Returnable Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">🚫 Non-Returnable Items</h2>
                <p className="text-luxe-cream/90">
                  Due to the perishable nature of coffee, opened coffee bags or used brewing equipment cannot be returned unless they arrived damaged or defective.
                </p>
              </motion.div>

              {/* Satisfaction Guarantee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Coffee className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">☕ Satisfaction Guarantee</h2>
                </div>
                <p className="text-luxe-cream/90">
                  If your coffee arrives damaged, stale, or simply doesn't meet your expectations, contact us within 7 days of delivery. We'll work with you to provide a replacement, refund, or store credit — no hassle, just good coffee vibes.
                </p>
              </motion.div>

              {/* Gift Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Gift className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">🎁 Gift Orders</h2>
                </div>
                <p className="text-luxe-cream/90">
                  Gifts are eligible for return or exchange with a valid order number. If you're the gift recipient, we'll provide you with store credit.
                </p>
              </motion.div>

              {/* How to Start a Return */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Mail className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">🧾 How to Start a Return</h2>
                </div>
                <div className="space-y-4 text-luxe-cream/90">
                  <p>Email us at <a href="mailto:support@coffeeandcryptocoffee.co" className="text-luxe-cream hover:text-luxe-cream/80 transition-colors font-medium">support@coffeeandcryptocoffee.co</a> with your order number and reason for return.</p>
                  <p>We'll respond within 48 hours with return instructions.</p>
                  <p>Once received and inspected, your refund or credit will be processed within 3–5 business days.</p>
                </div>
              </motion.div>

              {/* Return Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">📦 Return Shipping</h2>
                <p className="text-luxe-cream/90">
                  Customers are responsible for return shipping unless the item was incorrect or damaged. We recommend using a trackable shipping service or purchasing shipping insurance for higher-value items.
                </p>
              </motion.div>

              {/* Refund Timing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <CreditCard className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">💳 Refund Timing</h2>
                </div>
                <div className="space-y-3 text-luxe-cream/90">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Credit/Debit Card:</span>
                    <span className="text-luxe-cream">3–5 business days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Coffee & Crypto Store Credit:</span>
                    <span className="text-luxe-cream">issued instantly after inspection</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Crypto purchases:</span>
                    <span className="text-luxe-cream">We do not offer crypto refunds. Store credit will be issued instead.</span>
                  </div>
                </div>
              </motion.div>

              {/* Crypto Payment Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Coins className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">🪙 Crypto Payment Policy</h2>
                </div>
                <p className="text-luxe-cream/90">
                  Due to the volatility of digital assets, all sales made with cryptocurrency are final. If there's an issue with your order, we'll gladly offer store credit in USD value at the time of your purchase.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Need Help?</h2>
                <p className="text-xl text-luxe-cream/90 mb-6">
                  For any other questions, reach out to our team at{' '}
                  <a 
                    href="mailto:support@coffeeandcryptocoffee.co" 
                    className="text-luxe-cream hover:text-luxe-cream/80 transition-colors font-medium"
                  >
                    support@coffeeandcryptocoffee.co
                  </a>
                  . We're here to help!
                </p>
                <div className="text-4xl font-bold bg-gradient-to-r from-gold to-emerald-green bg-clip-text text-transparent">
                  Sip. Grow. Succeed.
                </div>
              </motion.div>
            </div>
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

      {/* Event Booking Modal */}
      <EventBookingModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
}

export default RefundPolicy;