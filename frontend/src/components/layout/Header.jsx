import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ambulance, Clock, Calendar } from 'lucide-react';

const Header = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 h-20 w-full bg-[#0B1220]/90 backdrop-blur-xl border-b border-blue-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Section: Branding & Titles */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Ambulance className="w-7 h-7 text-blue-400" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tight leading-none mb-1.5">
              Arogyam 2.0
            </h1>
            <span className="text-[0.65rem] md:text-xs font-bold text-blue-200/50 uppercase tracking-[0.2em] leading-none">
              AI Emergency Response Center
            </span>
          </div>
        </div>

        {/* Right Section: Status & Clock */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* System Online Badge */}
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.15)" }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)] cursor-default"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase mt-0.5">
              System Online
            </span>
          </motion.div>

          {/* Date & Live Time Panel */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#060a13]/80 border border-blue-900/30 shadow-inner">
            <div className="hidden sm:flex items-center gap-2 border-r border-blue-900/40 pr-3">
              <Calendar className="w-4 h-4 text-blue-500/70" />
              <span className="text-sm font-medium text-slate-300 tracking-wide">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:pl-1">
              <Clock className="w-4 h-4 text-blue-500/70" />
              <span className="text-sm font-bold text-white tabular-nums tracking-wider min-w-[95px] text-right">
                {formattedTime}
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;