import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import { Wallet, X, Coffee, Shield, Zap, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [securityChecked, setSecurityChecked] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { address, isConnected, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Only properly configured wallets for Ethereum/EVM chains
  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Most popular Ethereum wallet',
      icon: '🦊',
      color: 'bg-orange-500',
      security: 'Industry Standard',
      features: ['EVM Networks', 'DeFi Access', 'NFT Support'],
      supported: true
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Self-custody wallet by Coinbase',
      icon: '🔵',
      color: 'bg-blue-600',
      security: 'Exchange Grade',
      features: ['Self Custody', 'DApp Access', 'Easy Recovery'],
      supported: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect any mobile wallet',
      icon: '📱',
      color: 'bg-purple-500',
      security: 'Universal Protocol',
      features: ['Mobile Bridge', 'QR Connect', 'Multi-Wallet'],
      supported: true
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      description: 'Binance official mobile wallet',
      icon: '🛡️',
      color: 'bg-blue-500',
      security: 'Binance Secured',
      features: ['Mobile First', 'DApp Browser', 'Multi-Chain'],
      supported: true
    }
  ];

  const handleConnect = async (walletType: string) => {
    if (!securityChecked) {
      alert('Please acknowledge the security notice before connecting.');
      return;
    }

    const wallet = walletOptions.find(w => w.id === walletType);
    if (!wallet?.supported) {
      alert(`${wallet?.name} integration coming soon!`);
      return;
    }

    setSelectedWallet(walletType);
    setIsConnecting(true);
    
    try {
      await connect(walletType);
      setIsModalOpen(false);
      setSelectedWallet(null);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Connection failed. Please make sure your wallet is installed and try again.');
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsModalOpen(false);
      setSecurityChecked(false);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <>
      {/* Connect Wallet Button - Fixed Position */}
      <div className="absolute top-12 sm:top-16 left-0 p-4 sm:p-6 z-50">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-card px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-luxe-cream hover:text-luxe-cream transition-all shadow-lg border border-emerald-green/30 hover:border-emerald-green/50"
        >
          <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">
            {address ? formatAddress(address) : 'Connect Wallet'}
          </span>
        </motion.button>
      </div>

      {/* Enhanced Wallet Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
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
                  <img 
                    src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
                    alt="Coffee & Crypto" 
                    className="w-8 h-8"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-luxe-cream">
                    {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-luxe-cream hover:text-emerald-green transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isConnected ? (
                /* Connected State */
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-luxe-cream font-medium mb-2">🎉 Successfully Connected!</p>
                    <p className="text-gold font-mono text-lg">{address && formatAddress(address)}</p>
                  </div>

                  <div className="bg-emerald-green/10 border border-emerald-green/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Coffee className="w-5 h-5 text-emerald-green mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-luxe-cream font-semibold mb-1">Welcome to Coffee & Crypto!</h3>
                        <p className="text-luxe-cream/80 text-sm">
                          You're now connected and ready to enjoy exclusive Web3 perks, USDC discounts, and NFT rewards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium py-3 px-4 rounded-xl transition-colors border border-red-500/30"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                /* Connection State */
                <div className="space-y-6">
                  {/* Security Notice */}
                  <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-red-300 font-semibold mb-2">🔒 Security First</h3>
                        <div className="space-y-2 text-red-200/80 text-sm">
                          <p>• Never share your private keys or seed phrases</p>
                          <p>• Always verify the website URL before connecting</p>
                          <p>• We never store your wallet information</p>
                          <p>• Disconnect when finished for maximum security</p>
                        </div>
                        <label className="flex items-center gap-2 mt-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securityChecked}
                            onChange={(e) => setSecurityChecked(e.target.checked)}
                            className="w-4 h-4 text-gold bg-transparent border-gold/50 rounded focus:ring-gold"
                          />
                          <span className="text-luxe-cream text-sm font-medium">
                            I understand and acknowledge these security practices
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-luxe-cream/80 text-sm sm:text-base">
                      Choose your preferred wallet to unlock exclusive Web3 features
                    </p>
                  </div>

                  {/* Wallet Grid - Only supported wallets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {walletOptions.map((wallet) => (
                      <motion.button
                        key={wallet.id}
                        onClick={() => handleConnect(wallet.id)}
                        disabled={isConnecting || !securityChecked}
                        whileHover={{ scale: securityChecked ? 1.02 : 1 }}
                        whileTap={{ scale: securityChecked ? 0.98 : 1 }}
                        className={`
                          w-full p-4 rounded-xl transition-all border relative
                          ${securityChecked 
                            ? 'bg-emerald-green/10 hover:bg-emerald-green/20 border-emerald-green/30 hover:border-emerald-green/50' 
                            : 'bg-gray-500/10 border-gray-500/30 opacity-50 cursor-not-allowed'
                          }
                          ${selectedWallet === wallet.id ? 'ring-2 ring-emerald-green' : ''}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                            {wallet.icon}
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-luxe-cream font-medium text-sm truncate">{wallet.name}</p>
                              <Shield className="w-3 h-3 text-green-400 flex-shrink-0" />
                            </div>
                            <p className="text-luxe-cream/60 text-xs mb-2">{wallet.description}</p>
                            <div className="flex items-center gap-1 mb-1">
                              <Lock className="w-3 h-3 text-green-400" />
                              <span className="text-green-400 text-xs font-medium">{wallet.security}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {wallet.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="text-xs bg-emerald-green/20 text-emerald-green px-2 py-0.5 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced Benefits Section */}
                  <div className="bg-gradient-to-r from-emerald-green/10 to-gold/10 border border-emerald-green/20 rounded-xl p-4">
                    <h3 className="text-luxe-cream font-semibold text-center mb-4 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-green" />
                      Unlock Premium Web3 Benefits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                          <span className="text-green-400 font-bold">10%</span>
                        </div>
                        <span className="text-luxe-cream/80">USDC Payment Discount</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Coffee className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-luxe-cream/80">Exclusive NFT Rewards</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Wallet className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-luxe-cream/80">$BREW Token Loyalty</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                            <Zap className="w-4 h-4 text-emerald-green" />
                          </div>
                          <span className="text-luxe-cream/80">Early Access Perks</span>
                      </div>
                    </div>
                  </div>

                  {/* Connection Status */}
                  {isConnecting && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-luxe-cream">
                        <div className="w-4 h-4 border-2 border-luxe-cream border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting securely...</span>
                      </div>
                    </div>
                  )}

                  {/* Security Footer */}
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-blue-300 font-semibold mb-1">🛡️ Enterprise Security</h3>
                        <p className="text-blue-200/80 text-sm">
                          Protected by industry-leading encryption. Your private keys never leave your device. 
                          All connections are secured with end-to-end encryption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletConnect;