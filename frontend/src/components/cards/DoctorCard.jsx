import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Award, Phone, Clock, Activity, Building } from 'lucide-react';

const DoctorCard = ({ data }) => {
  // Graceful fallback for missing values
  const doctorData = data?.doctor || data || {};
  
  const name = doctorData.name || 'Unknown';
  const specialization = doctorData.specialization || doctorData.specialty || 'Unknown';
  const experience = doctorData.experience || 'Unknown';
  const department = doctorData.department || 'Unknown';
  const contactNumber = doctorData.contactNumber || doctorData.contact_number || doctorData.phone || 'Unknown';
  const availability = doctorData.availability || 'Available';
  const eta = doctorData.estimatedArrivalTime || doctorData.eta || 'Unknown';

  const isAvailable = String(availability).toLowerCase().includes('available');
  
  // Format ETA to include mins if it's just a number
  const formattedEta = (eta !== 'Unknown' && !String(eta).toLowerCase().includes('min')) ? `${eta} mins` : eta;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      className="relative overflow-hidden bg-[#111827]/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-shadow duration-300 p-6 group"
    >
      {/* Soft cyan glow in the background */}
      <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-cyan-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500" />

      {/* Header section */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-inner shrink-0">
            <Stethoscope className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Assigned Doctor</p>
            <h2 className="text-2xl font-bold text-white leading-tight truncate max-w-[180px] sm:max-w-[220px]">
              {name}
            </h2>
          </div>
        </div>
        
        {/* Availability Badge */}
        <div className={`flex items-center px-3 py-1.5 rounded-full border shadow-inner shrink-0 ${isAvailable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-500/10 border-slate-500/30 text-slate-400'}`}>
          <span className="relative flex h-2 w-2 mr-2">
            {isAvailable && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
          </span>
          <span className="text-xs font-bold tracking-wider uppercase">
            {availability === 'Unknown' ? 'Status Unknown' : availability}
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center space-x-1.5 mb-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Specialization</span>
          </div>
          <p className="text-sm font-semibold text-white truncate">{specialization}</p>
        </div>
        
        <div className="flex flex-col p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center space-x-1.5 mb-1">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</span>
          </div>
          <p className="text-sm font-semibold text-white">{experience}</p>
        </div>
      </div>

      {/* Secondary Details Section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="flex items-center space-x-3">
            <Building className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
              <p className="text-sm font-semibold text-slate-200 capitalize">{department}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact</p>
            <div className="flex items-center justify-end space-x-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <p className="text-sm font-semibold text-white">{contactNumber}</p>
            </div>
          </div>
        </div>

        {/* ETA Highlight */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-900/30 to-slate-800/80 border border-cyan-500/20 shadow-inner">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-100 uppercase tracking-wider">Estimated Arrival Time</span>
          </div>
          <span className="text-lg font-black text-cyan-400">{formattedEta}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;