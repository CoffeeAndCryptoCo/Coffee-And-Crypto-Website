import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle, Clock, Coffee, Menu, X } from 'lucide-react';
import CryptoTicker from '../components/CryptoTicker';
import EventBookingModal from '../components/EventBookingModal';

function Contact() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
              <h1 className="text-responsive-xl font-bold text-luxe-cream mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                Contact Information
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-luxe-cream/90 max-w-2xl mx-auto px-4">
                If you'd like to get in touch with our team, we have several convenient options available for you.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Contact Cards */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="glass-card p-6 sm:p-8 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-green/20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-green" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-2">Email</h3>
                        <p className="text-luxe-cream/70 mb-3 sm:mb-4 text-sm sm:text-base">Send us a message anytime</p>
                        <a 
                          href="mailto:coffeeandcryptocoffee@gmail.com"
                          className="text-luxe-cream hover:text-luxe-cream/80 transition-colors text-base sm:text-lg font-medium break-all"
                        >
                          coffeeandcryptocoffeeco@proton.me
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 sm:p-8 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-green/20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-green" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-2">Phone</h3>
                        <p className="text-luxe-cream/70 mb-3 sm:mb-4 text-sm sm:text-base">Call us during business hours</p>
                        <a 
                          href="tel:+16784606504"
                          className="text-luxe-cream hover:text-luxe-cream/80 transition-colors text-base sm:text-lg font-medium"
                        >
                          +1 (678) 930 3030
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 sm:p-8 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-green/20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-green" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream mb-2">Location</h3>
                        <p className="text-luxe-cream/70 mb-3 sm:mb-4 text-sm sm:text-base">Our physical location</p>
                        <div className="text-luxe-cream text-base sm:text-lg font-medium">
                          Coming Spring 2026
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="glass-card p-6 sm:p-8 rounded-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center sm:justify-start">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-green" />
                    <h3 className="text-xl sm:text-2xl font-bold text-luxe-cream">Business Hours</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                      <span className="text-luxe-cream/70 text-sm sm:text-base">Monday - Friday</span>
                      <span className="text-luxe-cream font-medium text-sm sm:text-base">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                      <span className="text-luxe-cream/70 text-sm sm:text-base">Saturday</span>
                      <span className="text-luxe-cream font-medium text-sm sm:text-base">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left">
                      <span className="text-luxe-cream/70 text-sm sm:text-base">Sunday</span>
                      <span className="text-luxe-cream font-medium text-sm sm:text-base">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 sm:p-8 rounded-2xl"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center sm:justify-start">
                  <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-green" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-luxe-cream">Send us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-luxe-cream font-medium mb-2 text-sm sm:text-base">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-luxe-cream font-medium mb-2 text-sm sm:text-base">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-luxe-cream font-medium mb-2 text-sm sm:text-base">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream focus:border-emerald-green focus:outline-none transition-colors text-sm sm:text-base"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="orders">Order Support</option>
                      <option value="wholesale">Wholesale Opportunities</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="technical">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-luxe-cream font-medium mb-2 text-sm sm:text-base">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors resize-none text-sm sm:text-base"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-green to-emerald-green text-[#F5E6D3] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg hover:from-emerald-green/80 hover:to-emerald-green/80 transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </motion.button>
                </form>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
                  <p className="text-luxe-cream/80 text-sm leading-relaxed">
                    <strong className="text-luxe-cream">Response Time:</strong> We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Additional Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 sm:mt-16 glass-card p-6 sm:p-8 lg:p-12 rounded-2xl text-center"
            >
              <h2 className="text-responsive-md font-bold text-luxe-cream mb-4 sm:mb-6">Ready to Join the Revolution?</h2>
              <p className="text-base sm:text-lg lg:text-xl text-luxe-cream/90 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                Whether you're interested in our premium coffee blends, want to learn about our Web3 initiatives, 
                or have questions about our exclusive membership program, we're here to help you on your journey.
              </p>
              <div className="text-responsive-lg font-bold bg-gradient-to-r from-gold to-emerald-green bg-clip-text text-transparent">
                Sip. Grow. Succeed.
              </div>
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

export default Contact;