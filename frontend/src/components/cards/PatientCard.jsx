import React from 'react';
import { motion } from 'framer-motion';
import { User, Droplet, Phone, MapPin, Activity, AlertCircle } from 'lucide-react';

const PatientCard = ({ data }) => {
  // Graceful fallback for missing values
  const patientData = data?.patient || data || {};
  
  const name = patientData.name || 'Unknown';
  const age = patientData.age || 'Unknown';
  const gender = patientData.gender || 'Unknown';
  const bloodGroup = patientData.bloodGroup || patientData.blood_group || 'Unknown';
  const phone = patientData.phone || 'Unknown';
  const emergencyType = patientData.emergencyType || patientData.emergency_type || patientData.injury || 'Unknown';
  const severity = patientData.severity || 'Unknown';
  const location = patientData.location || 'Unknown';

  const isCritical = String(severity).toLowerCase().includes('critical') || String(severity).toLowerCase().includes('high');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Soft blue glow in the background */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />

      {/* Header section */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-inner shrink-0">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Patient Profile</p>
            <h2 className="text-2xl font-bold text-white leading-tight truncate max-w-[200px] sm:max-w-[250px]">
              {name}
            </h2>
          </div>
        </div>
        
        {/* Emergency Priority Badge */}
        <div className={`flex items-center px-3 py-1.5 rounded-full border shadow-inner ${isCritical ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
          <span className="relative flex h-2 w-2 mr-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? 'bg-red-400' : 'bg-orange-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isCritical ? 'bg-red-500' : 'bg-orange-500'}`}></span>
          </span>
          <span className="text-xs font-bold tracking-wider uppercase">
            {isCritical ? 'Critical' : 'Priority'}
          </span>
        </div>
      </div>

      {/* Patient Vitals & Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 relative z-10">
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age</span>
          <p className="text-sm font-semibold text-white">{age}</p>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gender</span>
          <p className="text-sm font-semibold text-white capitalize">{gender}</p>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center space-x-1 mb-1">
            <Droplet className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood</span>
          </div>
          <p className="text-sm font-semibold text-white">{bloodGroup}</p>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center space-x-1 mb-1">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
          </div>
          <p className="text-sm font-semibold text-white truncate">{phone}</p>
        </div>
      </div>

      {/* Emergency Details */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emergency Type</p>
              <p className="text-sm font-semibold text-white capitalize">{emergencyType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Severity</p>
            <p className={`text-sm font-bold capitalize ${isCritical ? 'text-rose-400' : 'text-orange-400'}`}>{severity}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Incident Location</p>
            <p className="text-sm font-medium text-slate-200 truncate">{location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;