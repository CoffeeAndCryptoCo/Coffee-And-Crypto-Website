import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change_24h?: number;
}

const CryptoTicker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Popular cryptocurrencies to display
  const cryptoSymbols = ['BTC', 'ETH', 'XRP', 'ADA', 'DOT', 'LINK', 'LTC', 'BCH', 'BNB', 'SOL', 'HBAR'];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Using a free API endpoint that doesn't require API key for demo
        // In production, you would use: https://api.coinlayer.com/live?access_key=YOUR_API_KEY&symbols=${cryptoSymbols.join(',')}
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot,chainlink,litecoin,bitcoin-cash,binancecoin,solana,hedera-hashgraph&vs_currencies=usd&include_24hr_change=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }

        const data = await response.json();
        
        // Map the response to our format
        const mappedData: CryptoData[] = [
          { symbol: 'BTC', name: 'Bitcoin', price: data.bitcoin?.usd || 0, change_24h: data.bitcoin?.usd_24h_change },
          { symbol: 'ETH', name: 'Ethereum', price: data.ethereum?.usd || 0, change_24h: data.ethereum?.usd_24h_change },
          { symbol: 'XRP', name: 'XRP', price: data.ripple?.usd || 0, change_24h: data.ripple?.usd_24h_change },
          { symbol: 'ADA', name: 'Cardano', price: data.cardano?.usd || 0, change_24h: data.cardano?.usd_24h_change },
          { symbol: 'DOT', name: 'Polkadot', price: data.polkadot?.usd || 0, change_24h: data.polkadot?.usd_24h_change },
          { symbol: 'LINK', name: 'Chainlink', price: data.chainlink?.usd || 0, change_24h: data.chainlink?.usd_24h_change },
          { symbol: 'LTC', name: 'Litecoin', price: data.litecoin?.usd || 0, change_24h: data.litecoin?.usd_24h_change },
          { symbol: 'BCH', name: 'Bitcoin Cash', price: data['bitcoin-cash']?.usd || 0, change_24h: data['bitcoin-cash']?.usd_24h_change },
          { symbol: 'BNB', name: 'Binance Coin', price: data.binancecoin?.usd || 0, change_24h: data.binancecoin?.usd_24h_change },
          { symbol: 'SOL', name: 'Solana', price: data.solana?.usd || 0, change_24h: data.solana?.usd_24h_change },
          { symbol: 'HBAR', name: 'Hedera', price: data['hedera-hashgraph']?.usd || 0, change_24h: data['hedera-hashgraph']?.usd_24h_change },
        ];

        setCryptoData(mappedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to load crypto data');
        setLoading(false);
        
        // Fallback data for demo purposes
        const fallbackData: CryptoData[] = [
          { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change_24h: 2.45 },
          { symbol: 'ETH', name: 'Ethereum', price: 2580.50, change_24h: -1.23 },
          { symbol: 'XRP', name: 'XRP', price: 0.6234, change_24h: 5.67 },
          { symbol: 'ADA', name: 'Cardano', price: 0.4521, change_24h: -0.89 },
          { symbol: 'DOT', name: 'Polkadot', price: 7.23, change_24h: 3.21 },
          { symbol: 'LINK', name: 'Chainlink', price: 14.56, change_24h: 1.45 },
          { symbol: 'LTC', name: 'Litecoin', price: 72.34, change_24h: -2.11 },
          { symbol: 'BCH', name: 'Bitcoin Cash', price: 234.56, change_24h: 0.78 },
          { symbol: 'BNB', name: 'Binance Coin', price: 312.45, change_24h: 4.32 },
          { symbol: 'SOL', name: 'Solana', price: 98.76, change_24h: -1.56 },
          { symbol: 'HBAR', name: 'Hedera', price: 0.2845, change_24h: 2.34 },
        ];
        setCryptoData(fallbackData);
      }
    };

    fetchCryptoData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const formatChange = (change: number | undefined): string => {
    if (change === undefined) return '';
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="bg-black/90 border-b border-amber-500/20 py-3">
        <div className="flex items-center justify-center">
          <div className="text-amber-400 text-sm">Loading crypto data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-steel-blue/90 border-b border-emerald-green/20 py-2 sm:py-3 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex items-center gap-8 sm:gap-12"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 'max-content' }}
        >
          {/* Duplicate the data to create seamless loop */}
          {[...cryptoData, ...cryptoData].map((crypto, index) => (
            <div
              key={`${crypto.symbol}-${index}`}
              className="flex items-center gap-2 sm:gap-3 text-luxe-cream whitespace-nowrap flex-shrink-0"
            >
              <span className="font-bold text-white text-sm sm:text-base">
                {crypto.symbol}
              </span>
              <span className="text-xs sm:text-sm text-white hidden sm:inline">
                {crypto.name}
              </span>
              <span className="font-semibold text-sm sm:text-base text-white">
                {formatPrice(crypto.price)}
              </span>
              {crypto.change_24h !== undefined && (
                <div className={`flex items-center gap-1 text-xs sm:text-sm ${
                  crypto.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.change_24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span>{formatChange(crypto.change_24h)}</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      {error && (
        <div className="absolute top-0 right-4 text-xs text-gold/60 py-2">
          Demo data - API unavailable
        </div>
      )}
    </div>
  );
};

export default CryptoTicker;