import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, Coffee } from 'lucide-react';

function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 sm:p-12 rounded-2xl max-w-md w-full text-center border border-red-500/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-luxe-cream mb-4"
        >
          Payment Cancelled
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-luxe-cream/90 mb-8"
        >
          No worries! Your payment was cancelled and no charges were made. You can try again anytime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <button
            onClick={() => navigate('/exclusive')}
            className="w-full bg-gradient-to-r from-emerald-green to-gold text-luxe-cream font-bold py-3 px-6 rounded-xl hover:from-gold hover:to-emerald-green transition-all flex items-center justify-center gap-2"
          >
            <Coffee className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-steel-blue/50 text-luxe-cream font-medium py-3 px-6 rounded-xl hover:bg-steel-blue/70 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl"
        >
          <p className="text-luxe-cream/80 text-sm">
            <strong>Need help?</strong> Contact our support team at{' '}
            <a href="mailto:support@coffeeandcryptocoffee.co" className="text-emerald-green hover:text-emerald-green/80">
              support@coffeeandcryptocoffee.co
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PaymentCancel;