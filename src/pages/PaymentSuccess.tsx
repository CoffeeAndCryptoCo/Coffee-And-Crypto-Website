import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Coffee, Crown, ArrowRight } from 'lucide-react';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Redirect to exclusive access page after a short delay
    const timer = setTimeout(() => {
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        navigate(`/exclusive?session_id=${sessionId}`);
      } else {
        navigate('/exclusive');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 sm:p-12 rounded-2xl max-w-md w-full text-center border border-emerald-green/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-luxe-cream mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-luxe-cream/90 mb-8"
        >
          Welcome to the exclusive Coffee & Crypto community! You now have lifetime access to our premium content.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-3 text-luxe-cream/80">
            <Coffee className="w-5 h-5 text-emerald-green" />
            <span>Secret coffee recipes unlocked</span>
          </div>
          <div className="flex items-center gap-3 text-luxe-cream/80">
            <Crown className="w-5 h-5 text-emerald-green" />
            <span>Wholesale pricing activated</span>
          </div>
          <div className="flex items-center gap-3 text-luxe-cream/80">
            <ArrowRight className="w-5 h-5 text-emerald-green" />
            <span>Private community access granted</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-luxe-cream/60 text-sm"
        >
          Redirecting to your exclusive content in a few seconds...
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={() => navigate('/exclusive')}
          className="mt-6 bg-gradient-to-r from-emerald-green to-gold text-luxe-cream font-bold py-3 px-6 rounded-xl hover:from-gold hover:to-emerald-green transition-all"
        >
          Access Now
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;