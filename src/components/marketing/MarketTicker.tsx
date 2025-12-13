import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  percentChange: number;
}

const MarketTicker: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'SPX', name: 'S&P 500', value: 4783.45, change: 23.45, percentChange: 0.49 },
    { symbol: 'IXIC', name: 'NASDAQ', value: 15043.97, change: -12.34, percentChange: -0.08 },
    { symbol: 'DJI', name: 'Dow Jones', value: 37440.34, change: 156.78, percentChange: 0.42 },
    { symbol: 'TNX', name: '10-Year Treasury', value: 4.234, change: 0.012, percentChange: 0.28 },
  ]);

  const rbeLawMessage = {
    text: 'RBE Law: Protecting Business Interests for 40+ Years',
    highlight: true,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => {
        const randomChange = (Math.random() - 0.5) * 2;
        const newValue = item.value + randomChange;
        const previousValue = newValue - randomChange;
        const newChange = item.change + (Math.random() - 0.5) * 0.5;
        const newPercentChange = (randomChange / previousValue) * 100;
        
        return {
          ...item,
          value: parseFloat(newValue.toFixed(2)),
          change: parseFloat(newChange.toFixed(2)),
          percentChange: parseFloat(newPercentChange.toFixed(2)),
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate the ticker items for seamless infinite scroll
  const tickerItems = [...marketData, rbeLawMessage, ...marketData, rbeLawMessage];

  return (
    <div className="w-full bg-[#0a1a3a] border-y border-[#3d7eff]/20 overflow-hidden relative">
      <div className="relative h-12 flex items-center">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
          style={{ willChange: 'transform' }}
        >
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-4">
              {'symbol' in item ? (
                <>
                  <span className="text-[#3d7eff] font-mono font-semibold text-sm">
                    {item.symbol}
                  </span>
                  <span className="text-white font-mono text-sm">
                    {item.value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <div
                    className={`flex items-center gap-1 font-mono text-xs ${
                      item.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {item.change >= 0 ? '+' : ''}
                      {item.change.toFixed(2)}
                    </span>
                    <span>
                      ({item.percentChange >= 0 ? '+' : ''}
                      {item.percentChange.toFixed(2)}%)
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">|</span>
                </>
              ) : (
                <div className="flex items-center gap-2 px-6 py-1 bg-gradient-to-r from-[#3d7eff]/20 to-[#f3bd4f]/20 rounded-full border border-[#f3bd4f]/30">
                  <motion.span
                    className="text-[#f3bd4f] font-semibold text-sm tracking-wide"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                  >
                    ★
                  </motion.span>
                  <span className="text-white font-semibold text-sm">{item.text}</span>
                  <motion.span
                    className="text-[#f3bd4f] font-semibold text-sm tracking-wide"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: 1,
                    }}
                  >
                    ★
                  </motion.span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a1a3a] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a1a3a] to-transparent pointer-events-none" />
      </div>

      {/* Subtle pulse line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d7eff] to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
      />
    </div>
  );
};

export default MarketTicker;
