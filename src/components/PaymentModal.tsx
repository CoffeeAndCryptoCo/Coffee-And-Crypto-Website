import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Coins, Lock, Shield, Zap, Coffee, Star } from 'lucide-react';
import { stripeService, PaymentData } from '../services/stripeService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'crypto'>('card');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pricing
  const basePrice = 49.99;
  const cryptoDiscount = 0.10;
  const finalPrice = selectedPayment === 'crypto' 
    ? basePrice * (1 - cryptoDiscount) 
    : basePrice;

  const handlePayment = async () => {
    if (!email.trim()) {
      setError('Email is required for payment confirmation');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const paymentData: PaymentData = {
        amount: Math.round(finalPrice * 100), // Convert to cents
        currency: 'usd',
        description: 'Coffee & Crypto Exclusive Access',
        paymentMethod: selectedPayment,
        customerEmail: email
      };

      const session = await stripeService.createPaymentSession(paymentData);
      
      // Redirect to Stripe Checkout
      await stripeService.redirectToCheckout(session.sessionId);
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setSelectedPayment('card');
    setEmail('');
    setError(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card p-6 sm:p-8 rounded-2xl max-w-lg w-full mx-4 border border-emerald-green/30 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Lock className="w-8 h-8 text-emerald-green" />
                <h2 className="text-2xl sm:text-3xl font-bold text-luxe-cream">Exclusive Access</h2>
              </div>
              <button
                onClick={handleClose}
                className="text-luxe-cream hover:text-emerald-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* What's Included */}
            <div className="mb-6 p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
              <h3 className="text-luxe-cream font-semibold mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-green" />
                What's Included
              </h3>
              <ul className="space-y-2 text-luxe-cream/90 text-sm">
                <li>• Secret Coffee Menu & Recipes</li>
                <li>• Wholesale Pricing Access</li>
                <li>• Exclusive Brewing Guides</li>
                <li>• Early Access to New Blends</li>
                <li>• Private Discord Channel</li>
                <li>• Monthly Market Insights</li>
                <li>• NFT Rewards Program</li>
              </ul>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-luxe-cream font-semibold mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPayment('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPayment === 'card'
                      ? 'border-emerald-green bg-emerald-green/20'
                      : 'border-luxe-cream/30 hover:border-emerald-green/50'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-emerald-green mx-auto mb-2" />
                  <div className="text-luxe-cream font-medium">Card Payment</div>
                  <div className="text-luxe-cream/70 text-sm">${basePrice.toFixed(2)}</div>
                </button>

                <button
                  onClick={() => setSelectedPayment('crypto')}
                  className={`p-4 rounded-xl border-2 transition-all relative ${
                    selectedPayment === 'crypto'
                      ? 'border-emerald-green bg-emerald-green/20'
                      : 'border-luxe-cream/30 hover:border-emerald-green/50'
                  }`}
                >
                  <div className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full">
                    10% OFF
                  </div>
                  <Coins className="w-6 h-6 text-emerald-green mx-auto mb-2" />
                  <div className="text-luxe-cream font-medium">Crypto Payment</div>
                  <div className="text-luxe-cream/70 text-sm">
                    <span className="line-through">${basePrice.toFixed(2)}</span>{' '}
                    <span className="text-emerald-green font-bold">${finalPrice.toFixed(2)}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-luxe-cream font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/40 border border-emerald-green/30 rounded-xl text-luxe-cream placeholder-luxe-cream/50 focus:border-emerald-green focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
              <p className="text-luxe-cream/60 text-xs mt-2">
                We'll send your access details to this email
              </p>
            </div>

            {/* Price Summary */}
            <div className="mb-6 p-4 bg-steel-blue/20 border border-steel-blue/30 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-luxe-cream">Exclusive Access</span>
                <span className="text-luxe-cream">${basePrice.toFixed(2)}</span>
              </div>
              {selectedPayment === 'crypto' && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-emerald-green text-sm">Crypto Discount (10%)</span>
                  <span className="text-emerald-green text-sm">-${(basePrice * cryptoDiscount).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-luxe-cream/20 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-luxe-cream font-bold">Total</span>
                  <span className="text-luxe-cream font-bold text-xl">${finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Payment Button */}
            <motion.button
              onClick={handlePayment}
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-green to-emerald-green text-luxe-cream font-bold py-4 px-6 rounded-xl text-lg hover:from-emerald-green/80 hover:to-emerald-green/80 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-luxe-cream border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {selectedPayment === 'card' ? (
                    <CreditCard className="w-5 h-5" />
                  ) : (
                    <Coins className="w-5 h-5" />
                  )}
                  Pay ${finalPrice.toFixed(2)} - Get Instant Access
                </>
              )}
            </motion.button>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-300 font-semibold mb-1">🔒 Secure Payment</h3>
                  <p className="text-blue-200/80 text-sm">
                    Powered by Stripe. Your payment information is encrypted and secure. 
                    Access is granted immediately after successful payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Crypto Payment Info */}
            {selectedPayment === 'crypto' && (
              <div className="mt-4 p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-green mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-emerald-green font-semibold mb-1">⚡ Crypto Benefits</h3>
                    <p className="text-luxe-cream/80 text-sm">
                      Pay with Bitcoin, Ethereum, or other supported cryptocurrencies and save 10% automatically. 
                      Payments are processed securely through Stripe's crypto infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;