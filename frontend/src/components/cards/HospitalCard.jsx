import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Clock,
  Bed,
  Activity,
  ShieldPlus,
} from "lucide-react";

const HospitalCard = ({ data }) => {
  const hospital = data?.hospital || {};

  const name = hospital.name || "Unknown Hospital";
  const distance =
    hospital.distance_km !== undefined
      ? `${hospital.distance_km} km`
      : "Unknown";

  const availableBeds =
    hospital.available_beds !== undefined
      ? hospital.available_beds
      : "Unknown";

  const specialization = hospital.specialization || "General";

  const doctorAvailable = hospital.doctor_available;

  const eta =
    data?.ambulance?.eta_min !== undefined
      ? `${data.ambulance.eta_min} mins`
      : "Unknown";

  const capacityStatus = doctorAvailable ? "Available" : "Busy";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-inner shrink-0">
            <Building2 className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
              Destination Hospital
            </p>

            <h2 className="text-2xl font-bold text-white leading-tight truncate max-w-[220px]">
              {name}
            </h2>
          </div>
        </div>

        <div
          className={`flex items-center px-3 py-1.5 rounded-full border shadow-inner shrink-0 ${
            doctorAvailable
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                doctorAvailable ? "bg-emerald-400" : "bg-red-400"
              }`}
            ></span>

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                doctorAvailable ? "bg-emerald-500" : "bg-red-500"
              }`}
            ></span>
          </span>

          <span className="text-xs font-bold uppercase">
            {capacityStatus}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Distance
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {distance}
          </p>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              ETA
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {eta}
          </p>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Specialty
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {specialization}
          </p>
        </div>
      </div>

      {/* Hospital Status */}
      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 relative z-10">

        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <ShieldPlus className="w-4 h-4 text-cyan-400" />

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Doctor Availability
              </p>
            </div>

            <p className="text-xs font-bold text-cyan-400 uppercase">
              {doctorAvailable ? "Ready" : "Busy"}
            </p>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: doctorAvailable ? "100%" : "35%",
              }}
              transition={{
                duration: 1.2,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700/50">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-emerald-400" />

              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Beds
              </span>
            </div>

            <span className="text-sm font-bold text-white">
              {availableBeds}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />

              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Trauma
              </span>
            </div>

            <span className="text-sm font-bold text-white">
              {specialization}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default HospitalCard;