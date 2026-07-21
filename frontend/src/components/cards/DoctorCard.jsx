import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Award,
  Clock,
  Activity,
  Building,
  CheckCircle,
} from "lucide-react";

const DoctorCard = ({ data }) => {
  const doctor = data?.doctor || {};
  const hospital = data?.hospital || {};
  const ambulance = data?.ambulance || {};

  const name = doctor.name || "Unknown Doctor";
  const specialization = doctor.specialization || "General Medicine";

  const availability = doctor.available ? "Available" : "Busy";

  const department = hospital.specialization || "Emergency";

  const eta =
    ambulance.eta_min !== undefined
      ? `${ambulance.eta_min} mins`
      : "Unknown";

  const isAvailable = doctor.available === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Background Glow */}
      <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-cyan-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-inner">
            <Stethoscope className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
              Assigned Doctor
            </p>

            <h2 className="text-2xl font-bold text-white truncate">
              {name}
            </h2>
          </div>
        </div>

        <div
          className={`flex items-center px-3 py-1.5 rounded-full border ${
            isAvailable
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span className="relative flex h-2 w-2 mr-2">
            {isAvailable && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
            )}

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isAvailable ? "bg-emerald-500" : "bg-red-500"
              }`}
            ></span>
          </span>

          <span className="text-xs font-bold uppercase">
            {availability}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Specialization
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {specialization}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Award className="w-3.5 h-3.5 text-cyan-400" />

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Status
            </span>
          </div>

          <p
            className={`text-sm font-semibold ${
              isAvailable ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {availability}
          </p>
        </div>
      </div>

      {/* Department */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="flex items-center gap-3">
            <Building className="w-4 h-4 text-slate-400" />

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Department
              </p>

              <p className="text-sm font-semibold text-slate-200">
                {department}
              </p>
            </div>
          </div>

          <CheckCircle
            className={`w-6 h-6 ${
              isAvailable ? "text-emerald-400" : "text-red-400"
            }`}
          />
        </div>

        {/* ETA */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-900/30 to-slate-800/80 border border-cyan-500/20">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400" />

            <span className="text-xs font-bold uppercase text-cyan-100">
              Ambulance ETA
            </span>
          </div>

          <span className="text-lg font-black text-cyan-400">
            {eta}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;