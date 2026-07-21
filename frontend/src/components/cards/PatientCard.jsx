import React from "react";
import { motion } from "framer-motion";
import {
  User,
  HeartPulse,
  Activity,
  MapPin,
  AlertCircle,
} from "lucide-react";

const PatientCard = ({ data }) => {
  const patient = data?.patient || {};

  const name = patient.name || "Unknown";
  const age = patient.age || "Unknown";
  const medicalConditions = patient.medical_conditions || "None";

  const injury = data?.injury || "Unknown";
  const severity = data?.severity || "Unknown";

  const location =
    patient.latitude && patient.longitude
      ? `${patient.latitude.toFixed(6)}, ${patient.longitude.toFixed(6)}`
      : "Unknown";

  const isCritical =
    severity.toLowerCase().includes("critical") ||
    severity.toLowerCase().includes("high");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-inner">
            <User className="w-6 h-6 text-blue-400" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
              Patient Profile
            </p>

            <h2 className="text-2xl font-bold text-white truncate">
              {name}
            </h2>
          </div>
        </div>

        <div
          className={`flex items-center px-3 py-1.5 rounded-full border ${
            isCritical
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-orange-500/10 border-orange-500/30 text-orange-400"
          }`}
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isCritical ? "bg-red-400" : "bg-orange-400"
              }`}
            ></span>

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isCritical ? "bg-red-500" : "bg-orange-500"
              }`}
            ></span>
          </span>

          <span className="text-xs font-bold uppercase">
            {severity}
          </span>
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Age
          </span>

          <p className="text-sm font-semibold text-white mt-1">
            {age}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <HeartPulse className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Medical
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {medicalConditions}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Injury
            </span>
          </div>

          <p className="text-sm font-semibold text-white">
            {injury}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Activity className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Severity
            </span>
          </div>

          <p
            className={`text-sm font-bold ${
              isCritical ? "text-red-400" : "text-orange-400"
            }`}
          >
            {severity}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />

          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              GPS Location
            </p>

            <p className="text-sm text-slate-200 break-all">
              {location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;