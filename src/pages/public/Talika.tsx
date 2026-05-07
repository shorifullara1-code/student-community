import React, { useState, useEffect } from 'react';
import { Users, Building, Droplet, MapPin, AlertCircle, BarChart2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RegistrationData {
  id: number;
  name: string;
  institution: string;
  area: string;
  blood_group: string;
  created_at: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

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
        .select('id, name, institution, area, blood_group, created_at')
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold text-[#1d4ed8] flex items-center justify-center gap-2 mb-3">
          <Users size={32} />
          সদস্য তালিকা
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          সাভার স্টুডেন্ট কমিউনিটিতে এ পর্যন্ত যুক্ত হওয়া সব সদস্যদের তালিকা এবং প্রতিষ্ঠান অনুযায়ী পরিসংখ্যান।
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" />
            <p className="font-medium">{errorMsg}</p>
          </div>
          {(errorMsg.includes('SQL') || errorMsg.includes('API')) && (
             <div className="bg-white p-3 rounded border border-red-100 font-mono text-xs overflow-x-auto text-gray-800 ml-8">
               <p className="mb-2 text-red-500 font-bold">// নিচের SQL টি Supabase এর SQL Editor এ রান করুন:</p>
               <code>
                 CREATE TABLE IF NOT EXISTS registrations ({'\n'}
                 {'  '}id SERIAL PRIMARY KEY,{'\n'}
                 {'  '}name TEXT NOT NULL,{'\n'}
                 {'  '}phone TEXT NOT NULL,{'\n'}
                 {'  '}email TEXT,{'\n'}
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
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : !errorMsg && registrations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart2 className="text-blue-600" /> প্রতিষ্ঠান ভিত্তিক পরিসংখ্যান
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#3b82f6" name="সদস্য সংখ্যা" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

             <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <PieChart className="text-blue-600" /> প্রতিষ্ঠানের অনুপাত
              </h3>
               <div className="h-[300px] w-full flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="count"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {chartData.map((stat) => (
              <div key={stat.name} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#f8fafc] border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1e293b] flex items-center gap-2">
                    <Building className="text-blue-600" size={20} />
                    {stat.name}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    মোট সদস্য: {stat.count} জন
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedData[stat.name].map(member => (
                      <div key={member.id} className="border border-gray-100 rounded bg-gray-50 p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{member.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin size={12} /> {member.area}
                          </div>
                           <div className="flex items-center gap-1 text-xs mt-1 font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded inline-flex">
                            <Droplet size={12} /> {member.blood_group}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center text-gray-500">
          এখনো কোনো সদস্য রেজিস্ট্রেশন করেননি।
        </div>
      )}
    </div>
  );
}
