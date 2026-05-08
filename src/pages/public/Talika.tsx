import React, { useState, useEffect } from 'react';
import { Users, Building, Droplet, MapPin, AlertCircle, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface RegistrationData {
  id: number;
  name: string;
  age: number | null;
  institution: string;
  area: string;
  blood_group: string;
  created_at: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899', '#14b8a6'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Talika() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, name, institution, age, area, blood_group, created_at')
        .order('institution', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err: any) {
      if (err.message?.includes('does not exist') || err.message?.includes('SQL') || err.message?.includes('Invalid API key') || err.message?.includes('JWT')) {
        setErrorMsg('Supabase টেবিল "registrations" পাওয়া যায়নি বা API Key ভুল। অ্যাডমিনকে জানান অথবা নিজের প্রজেক্ট হলে নিচের SQL কোড ব্যবহার করুন।');
      } else {
        setErrorMsg(err.message || 'ডেটা লোড করতে সমস্যা হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const groupedData = registrations.reduce((acc, reg) => {
    if (!acc[reg.institution]) {
      acc[reg.institution] = [];
    }
    acc[reg.institution].push(reg);
    return acc;
  }, {} as Record<string, RegistrationData[]>);

  const chartData = Object.keys(groupedData).map((institution) => ({
    name: institution,
    count: groupedData[institution].length,
  })).sort((a, b) => b.count - a.count);

  const bgDataObj = registrations.reduce((acc, reg) => {
    const bg = reg.blood_group || 'অজানা';
    if (!acc[bg]) acc[bg] = 0;
    acc[bg] += 1;
    return acc;
  }, {} as Record<string, number>);

  const bloodGroupData = Object.keys(bgDataObj).map(name => ({
    name,
    count: bgDataObj[name]
  })).sort((a, b) => b.count - a.count);

  const areaDataObj = registrations.reduce((acc, reg) => {
    const area = reg.area || 'অজানা';
    if (!acc[area]) acc[area] = 0;
    acc[area] += 1;
    return acc;
  }, {} as Record<string, number>);

  const areaData = Object.keys(areaDataObj).map(name => ({
    name,
    count: areaDataObj[name]
  })).sort((a, b) => b.count - a.count).slice(0, 7); // top 7 areas

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-800 text-white p-3 rounded-lg shadow-xl shadow-gray-900/50 backdrop-blur-sm bg-opacity-90 z-50">
          <p className="font-bold text-sm mb-1">{data.name || data.date}</p>
          <p className="text-blue-400 font-mono text-sm">সদস্য: <span className="text-white text-base font-bold">{payload[0].value}</span> জন</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 rounded-2xl shadow-sm p-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4">
          <Users size={120} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 flex items-center justify-center gap-3 mb-4 tracking-tight drop-shadow-sm relative z-10">
          <Users size={36} className="text-blue-600" />
          সদস্য তালিকা
        </h2>
        <p className="text-blue-800/80 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 font-medium">
          সাভার স্টুডেন্ট কমিউনিটিতে এ পর্যন্ত যুক্ত হওয়া সব সদস্যদের তালিকা এবং প্রতিষ্ঠান অনুযায়ী বিস্তারিত পরিসংখ্যান।
        </p>
      </motion.div>

      {errorMsg && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl flex flex-col gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5 text-red-500" />
            <p className="font-medium text-red-800">{errorMsg}</p>
          </div>
          {(errorMsg.includes('SQL') || errorMsg.includes('API')) && (
             <div className="bg-white p-4 rounded-lg border border-red-100 font-mono text-xs overflow-x-auto text-gray-800 ml-9 shadow-inner">
               <p className="mb-2 text-red-500 font-bold">// নিচের SQL টি Supabase এর SQL Editor এ রান করুন:</p>
               <code>
                 CREATE TABLE IF NOT EXISTS registrations ({'\n'}
                 {'  '}id SERIAL PRIMARY KEY,{'\n'}
                 {'  '}name TEXT NOT NULL,{'\n'}
                 {'  '}phone TEXT NOT NULL,{'\n'}
                 {'  '}email TEXT,{'\n'}
                 {'  '}age INTEGER,{'\n'}
                 {'  '}institution TEXT NOT NULL,{'\n'}
                 {'  '}area TEXT NOT NULL,{'\n'}
                 {'  '}blood_group TEXT,{'\n'}
                 {'  '}created_at TIMESTAMPTZ DEFAULT NOW(){'\n'}
                 );{'\n\n'}
                 -- Allow inserts for anyone (anon){'\n'}
                 ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;{'\n'}
                 CREATE POLICY "Enable insert for anonymous users" ON registrations FOR INSERT WITH CHECK (true);{'\n'}
                 CREATE POLICY "Enable read for anonymous users" ON registrations FOR SELECT USING (true);{'\n'}
                 CREATE POLICY "Enable delete for anonymous users" ON registrations FOR DELETE USING (true);
               </code>
            </div>
          )}
        </motion.div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-blue-100 border-t-blue-600 shadow-sm"></div>
          <p className="text-gray-500 font-medium animate-pulse">ডেটা লোড হচ্ছে...</p>
        </div>
      ) : !errorMsg && registrations.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Top Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg shadow-blue-900/20 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-1 right-1 opacity-20 transform translate-x-2 -translate-y-2">
                <Users size={80} />
              </div>
              <p className="text-blue-100 font-medium mb-1 relative z-10 text-sm md:text-base">মোট সদস্য</p>
              <h3 className="text-4xl font-extrabold relative z-10">{registrations.length}</h3>
            </motion.div>
            
            {chartData.map((stat, idx) => (
              <motion.div key={`topcard-${idx}`} variants={itemVariants} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-blue-200">
                 <p className="text-gray-500 text-xs md:text-sm font-medium mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors" title={stat.name}>{stat.name}</p>
                 <div className="flex items-end justify-between mt-auto">
                   <h3 className="text-3xl font-extrabold text-gray-800 group-hover:text-blue-800 transition-colors">{stat.count}</h3>
                   <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                     <Building size={20} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg">
                  <BarChart2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">প্রতিষ্ঠান ভিত্তিক পরিসংখ্যান</h3>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" verticalCoordinatesGenerator={(props) => [props.width / 4, props.width / 2, props.width * 0.75]} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={140} axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.6 }} />
                    <Bar dataKey="count" fill="url(#colorBar)" radius={[0, 6, 6, 0]} barSize={24}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg">
                  <PieChartIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">প্রতিষ্ঠানের অনুপাত</h3>
              </div>
              <div className="h-[320px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={4}
                      dataKey="count"
                      stroke="none"
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity duration-300" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text for Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <Users size={32} className="text-gray-400 mb-1" />
                   <span className="text-2xl font-bold text-gray-800">{registrations.length}</span>
                   <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">মোট সদস্য</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div variants={itemVariants} className="bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-lg">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">এলাকা ভিত্তিক সদস্য</h3>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.6 }} />
                    <Bar dataKey="count" fill="url(#colorArea)" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white border border-rose-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-rose-50 opacity-30 pointer-events-none">
                <Droplet size={150} fill="currentColor" />
              </div>
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="bg-rose-50 text-rose-600 p-2.5 rounded-lg">
                  <Droplet size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">রক্তের গ্রুপ</h3>
              </div>
              <div className="h-[320px] w-full relative z-10 flex items-center justify-center">
                <div className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bloodGroupData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="count"
                        stroke="none"
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
                              {name}
                            </text>
                          );
                        }}
                      >
                        {bloodGroupData.map((entry, index) => {
                           // Try to make blood group reddish/pink colors
                           const bgColors = ['#e11d48', '#be123c', '#f43f5e', '#fb7185', '#9f1239', '#fda4af', '#fca5a5', '#ef4444'];
                           return <Cell key={`cell-${index}`} fill={bgColors[index % bgColors.length]} className="hover:opacity-80 transition-opacity duration-300" />;
                        })}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            {chartData.map((stat, idx) => (
              <motion.div 
                key={stat.name} 
                variants={itemVariants}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#f8fafc] to-white border-b border-gray-100 p-5 md:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
                      <Building size={20} />
                    </div>
                    {stat.name}
                  </h3>
                  <div className="bg-white border border-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    সদস্য: <span className="text-lg">{stat.count}</span>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 bg-[#fafafa]/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 text-left">
                    {groupedData[stat.name].map((member, mIdx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: mIdx * 0.05 }}
                        key={member.id} 
                        className="group bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-xl shrink-0 shadow-inner z-10 border border-blue-50">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 z-10 pt-1">
                          <p className="font-bold text-gray-900 truncate text-base mb-1 group-hover:text-blue-700 transition-colors">
                            {member.name}
                            {member.age ? <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100/80 border border-gray-200 px-1.5 py-0.5 rounded inline-block">বয়স: {member.age}</span> : null}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                            <MapPin size={12} className="text-gray-400 shrink-0" /> 
                            <span className="truncate">{member.area}</span>
                          </div>
                           <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-red-600 bg-red-50/80 border border-red-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                            <Droplet size={11} className="text-red-500" /> {member.blood_group}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
             <Users size={32} />
          </div>
          <p className="text-gray-500 font-medium text-lg">এখনো কোনো সদস্য রেজিস্ট্রেশন করেননি।</p>
        </motion.div>
      )}
    </div>
  );
}
