import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Activity,
  Brain,
  ShieldAlert,
} from "lucide-react";
import { getLatestEmergency } from "../services/api";

import Header from "../components/layout/Header";
import PatientCard from "../components/cards/PatientCard";
import HospitalCard from "../components/cards/HospitalCard";
import DoctorCard from "../components/cards/DoctorCard";
import AmbulanceCard from "../components/cards/AmbulanceCard";

const EmergencyDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await getLatestEmergency();

        if (mounted) {
          setData(result);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to fetch emergency.");
          setLoading(false);
        }
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
          <Loader2 className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (data?.status === "waiting") {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center">
        <Activity className="w-20 h-20 text-blue-500 mb-6" />
        <h1 className="text-4xl font-bold text-white">
          Waiting for Emergency...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Header data={data} />

      <main className="max-w-7xl mx-auto px-6 py-8">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-900/40 to-red-950/10 p-6"
        >
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-10 h-10 text-red-500" />

            <div>
              <h2 className="text-2xl font-bold">
  {data.severity === "Critical"
    ? "🚨 Critical Emergency"
    : "🩹 Low Priority Emergency"}
</h2>

              <p className="text-red-200/70">
  {data.needs_ambulance
    ? "AI Dispatch System Active"
    : "First Aid Recommendation Generated"}
</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <PatientCard data={data} />
            <AmbulanceCard data={data} />
            <HospitalCard data={data} />
            <DoctorCard data={data} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="text-cyan-400" />
              <h2 className="text-xl font-bold">
                AI Decision Engine
              </h2>
            </div>

            <div className="space-y-5">

  <div className="rounded-xl bg-slate-950 p-4">
    <p className="text-sm text-gray-400">
      Priority
    </p>

    <h3
      className={`text-3xl font-black ${
        data.priority === "CRITICAL"
          ? "text-red-500"
          : "text-emerald-400"
      }`}
    >
      {data.priority}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-950 p-4">
    <p className="text-sm text-gray-400">
      Confidence
    </p>

    <h3 className="text-2xl font-bold text-cyan-400">
      {data.confidence}%
    </h3>
  </div>

  <div className="rounded-xl bg-slate-950 p-4">
    <p className="text-sm text-gray-400">
      ETA
    </p>

    <h3 className="text-2xl font-bold">
      {data.eta}
    </h3>
  </div>

  <div className="rounded-xl bg-slate-950 p-4">
    <p className="text-sm text-gray-400 mb-2">
      AI Reasoning
    </p>

    <p className="text-sm text-gray-300">
      {data.reasoning}
    </p>
  </div>

</div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default EmergencyDashboard;