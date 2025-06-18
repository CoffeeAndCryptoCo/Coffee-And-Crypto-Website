import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Scale, Users, AlertTriangle, Globe, Mail, Menu, X } from 'lucide-react';
import CryptoTicker from '../components/CryptoTicker';
import EventBookingModal from '../components/EventBookingModal';

function TermsOfService() {
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
                <FileText className="w-12 h-12 text-emerald-green" />
                📝 Terms of Service
              </h1>
              <p className="text-xl text-luxe-cream/90 max-w-3xl mx-auto mb-4">
                Coffee and Crypto Coffee Co.
              </p>
              <p className="text-lg text-luxe-cream/70">
                Effective Date: June 7, 2025
              </p>
            </motion.div>

            {/* Terms Sections */}
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Acceptance of Terms</h2>
                <p className="text-luxe-cream/90">
                  By accessing or using coffeeandcryptocoffee.co (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not access or use the Site.
                </p>
              </motion.div>

              {/* Use License */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Use License</h2>
                <p className="text-luxe-cream/90">
                  We grant you a limited, revocable, non-transferable license to access and use the Site for personal, non-commercial purposes only—unless explicitly authorized (e.g., retail partnerships). All rights not expressly granted are reserved.
                </p>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Intellectual Property</h2>
                </div>
                <p className="text-luxe-cream/90">
                  All content—including text, graphics, logos, images, audio, video, software, and trademarks—is the exclusive property of Coffee and Crypto Coffee Co. or its licensors. No content may be copied, modified, distributed, republished, or used without our prior written consent.
                </p>
              </motion.div>

              {/* Account Registration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Account Registration</h2>
                </div>
                <p className="text-luxe-cream/90">
                  Certain features (newsletters, ordering, loyalty program) may require account creation. You must provide accurate information and maintain security of your login credentials. You are responsible for all activity under your account.
                </p>
              </motion.div>

              {/* Prohibited Conduct */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <AlertTriangle className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Prohibited Conduct</h2>
                </div>
                <p className="text-luxe-cream/90 mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-luxe-cream/90">
                  <li>Use the Site for illegal, fraudulent, or harmful purposes</li>
                  <li>Upload viruses, malware, or malicious code</li>
                  <li>Harvest personal data from others</li>
                  <li>Interfere with Site functionality or security</li>
                  <li>Use the Site for commercial solicitation unless authorized</li>
                </ul>
              </motion.div>

              {/* User Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">User Content</h2>
                <p className="text-luxe-cream/90">
                  "User Content" (reviews, comments, ideas) that you submit grants Coffee and Crypto Coffee Co. a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, display, and distribute your content. You represent that you have all necessary rights to grant us this license.
                </p>
              </motion.div>

              {/* Third-Party Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Globe className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Third-Party Links</h2>
                </div>
                <p className="text-luxe-cream/90">
                  Our Site may link to third-party sites. We are not responsible for their content, services, or policies. Accessing third-party content is at your own risk.
                </p>
              </motion.div>

              {/* Disclaimer of Warranties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Disclaimer of Warranties</h2>
                <p className="text-luxe-cream/90">
                  The Site and content are provided "as is" and "as available" without warranties of any kind—express, implied, or statutory—including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Limitation of Liability</h2>
                <p className="text-luxe-cream/90">
                  To the extent allowed by law, Coffee and Crypto Coffee Co. and its affiliates are not liable for any indirect, incidental, special, punitive, or consequential damages (including loss of profits or data) arising from your use of the Site.
                </p>
              </motion.div>

              {/* Indemnification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Indemnification</h2>
                <p className="text-luxe-cream/90">
                  You agree to indemnify and hold Coffee and Crypto Coffee Co. and its employees, officers, agents, and affiliates harmless from any claim or demand, including legal fees, arising out of your breach of these Terms or violation of any law.
                </p>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Changes to Terms</h2>
                <p className="text-luxe-cream/90">
                  We reserve the right to modify these Terms at any time. Updated terms will post on this page with the "Effective Date" updated. Your continued use of the Site after changes indicates your acceptance.
                </p>
              </motion.div>

              {/* Governing Law & Dispute Resolution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Scale className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Governing Law & Dispute Resolution</h2>
                </div>
                <p className="text-luxe-cream/90">
                  These Terms are governed by the laws of [Insert Your State/Country], without regard to conflict of laws. Any dispute arising from these Terms or the Site shall be resolved through binding arbitration in [City, State/Country], except where prohibited.
                </p>
              </motion.div>

              {/* Severability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="glass-card p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold text-luxe-cream mb-6">Severability</h2>
                <p className="text-luxe-cream/90">
                  If any provision is held invalid, illegal, or unenforceable, it will be severed, and the remaining Terms will continue in full force and effect.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Mail className="w-8 h-8 text-emerald-green" />
                  <h2 className="text-3xl font-bold text-luxe-cream">Contact Information</h2>
                </div>
                <p className="text-xl text-luxe-cream/90 mb-6">
                  If you have any questions or concerns, please contact us at:
                </p>
                <a 
                  href="mailto:support@coffeeandcryptocoffee.co" 
                  className="text-luxe-cream hover:text-luxe-cream/80 transition-colors font-medium text-lg"
                >
                  support@coffeeandcryptocoffee.co
                </a>
                <div className="mt-8 text-4xl font-bold bg-gradient-to-r from-gold to-emerald-green bg-clip-text text-transparent">
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

export default TermsOfService;