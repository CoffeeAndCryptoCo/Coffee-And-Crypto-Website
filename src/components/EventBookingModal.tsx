import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Clock, Coffee, Send } from 'lucide-react';

interface EventBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventBookingModal: React.FC<EventBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    budget: '',
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
    console.log('Event booking inquiry submitted:', formData);
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      location: '',
      budget: '',
      message: ''
    });
    onClose();
    // Show success message
    alert('Thank you for your event inquiry! We\'ll get back to you within 24 hours.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card p-6 sm:p-8 rounded-2xl max-w-2xl w-full mx-4 border border-emerald-green/30 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-emerald-green" />
                <h2 className="text-2xl sm:text-3xl font-bold text-luxe-cream">Event Booking Inquiry</h2>
              </div>
              <button
                onClick={onClose}
                className="text-luxe-cream hover:text-emerald-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <div className="mb-6 p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
              <p className="text-luxe-cream/90 text-sm leading-relaxed">
                <Coffee className="w-4 h-4 inline mr-2 text-emerald-green" />
                Let us bring the Coffee & Crypto experience to your event! Fill out the details below and we'll create a custom proposal for your corporate event, conference, or special occasion.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Information */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm"
                    placeholder="Company name (optional)"
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventType" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream focus:border-emerald-green focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Select event type</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="conference">Conference/Summit</option>
                    <option value="workshop">Workshop/Training</option>
                    <option value="networking">Networking Event</option>
                    <option value="product-launch">Product Launch</option>
                    <option value="private-party">Private Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream focus:border-emerald-green focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guestCount" className="block text-luxe-cream font-medium mb-2 text-sm">
                    <Users className="w-4 h-4 inline mr-1" />
                    Expected Guest Count *
                  </label>
                  <select
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream focus:border-emerald-green focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Select guest count</option>
                    <option value="10-25">10-25 guests</option>
                    <option value="25-50">25-50 guests</option>
                    <option value="50-100">50-100 guests</option>
                    <option value="100-200">100-200 guests</option>
                    <option value="200-500">200-500 guests</option>
                    <option value="500+">500+ guests</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-luxe-cream font-medium mb-2 text-sm">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream focus:border-emerald-green focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-luxe-cream font-medium mb-2 text-sm">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Event Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors text-sm"
                  placeholder="City, State or full address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-luxe-cream font-medium mb-2 text-sm">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors resize-none text-sm"
                  placeholder="Tell us more about your event vision, special requirements, or any questions you have..."
                />
              </div>

              {/* Services Info */}
              <div className="bg-steel-blue/20 border border-steel-blue/30 rounded-xl p-4">
                <h3 className="text-luxe-cream font-semibold mb-2 text-sm">Our Event Services Include:</h3>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-luxe-cream/80">
                  <div>• Premium coffee bar setup</div>
                  <div>• Professional baristas</div>
                  <div>• Crypto education sessions</div>
                  <div>• Custom branded experience</div>
                  <div>• Web3 networking activities</div>
                  <div>• NFT giveaways & rewards</div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-green to-emerald-green text-luxe-cream font-bold py-3 px-6 rounded-xl text-base hover:from-emerald-green/80 hover:to-emerald-green/80 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Send className="w-4 h-4" />
                Submit Event Inquiry
              </motion.button>

              <div className="text-center text-luxe-cream/60 text-xs">
                <Clock className="w-3 h-3 inline mr-1" />
                We'll respond within 24 hours with a custom proposal
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventBookingModal;