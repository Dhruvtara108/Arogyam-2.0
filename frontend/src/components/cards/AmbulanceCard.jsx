import React from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  User,
  MapPin,
  Navigation,
  Clock,
  Hash,
} from "lucide-react";

const AmbulanceCard = ({ data }) => {
  const ambulance = data?.ambulance || {};
  const hospital = data?.hospital || {};

  const id = ambulance.id || "Unknown";
  const driver = ambulance.driver || "Unknown";

  const distance =
    ambulance.distance_km !== undefined
      ? `${ambulance.distance_km} km`
      : "Unknown";

  const eta =
    ambulance.eta_min !== undefined
      ? `${ambulance.eta_min} mins`
      : "Unknown";

  const status = ambulance.available ? "Dispatched" : "Unavailable";

  const currentLocation = "Nearest Dispatch Center";
  const destination = hospital.name || "Hospital";

  const isEnRoute = ambulance.available === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Background Glow */}
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-inner overflow-hidden">
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Ambulance className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
              Ambulance Dispatch
            </p>

            <h2 className="text-2xl font-bold text-white">
              {id}
            </h2>
          </div>
        </div>

        <div
          className={`flex items-center px-3 py-1.5 rounded-full border ${
            isEnRoute
              ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span className="relative flex h-2 w-2 mr-2">
            {isEnRoute && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400"></span>
            )}

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isEnRoute ? "bg-blue-500" : "bg-red-500"
              }`}
            ></span>
          </span>

          <span className="text-xs font-bold uppercase">
            {status}
          </span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Hash className="w-3 h-3 text-slate-400" />

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Vehicle ID
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {id}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <User className="w-3 h-3 text-slate-400" />

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Driver
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {driver}
          </p>
        </div>
      </div>

      {/* Route */}
      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 mb-5">
        <div className="relative pl-1">

          <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-slate-700 rounded-full" />

          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-slate-900/80 p-1.5 rounded-full border border-slate-700">
              <MapPin className="w-3 h-3 text-slate-400" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Current Location
              </p>

              <p className="text-sm text-slate-200">
                {currentLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/20 p-1.5 rounded-full border border-blue-500/30">
              <Navigation className="w-3 h-3 text-blue-400" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Destination
              </p>

              <p className="text-sm font-medium text-white">
                {destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ETA */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Estimated Time
              </p>

              <p className="text-sm font-bold text-white">
                {eta}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Distance
            </p>

            <p className="text-sm font-bold text-white">
              {distance}
            </p>
          </div>
        </div>

        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: isEnRoute ? "70%" : "0%",
            }}
            transition={{
              duration: 1.4,
            }}
          />

          {isEnRoute && (
            <motion.div
              className="absolute h-1.5 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              initial={{ left: "-20%" }}
              animate={{ left: "120%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AmbulanceCard;