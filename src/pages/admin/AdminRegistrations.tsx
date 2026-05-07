import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Trash2, Phone, Mail, Building, Home, Droplet, Calendar, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RegistrationData {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  institution: string;
  area: string;
  blood_group: string;
  created_at: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err: any) {
      if (err.message?.includes('does not exist') || err.message?.includes('SQL Editor') || err.message?.includes('Invalid API key') || err.message?.includes('JWT')) {
        setErrorMsg('Supabase টেবিল "registrations" পাওয়া যায়নি বা API Key ভুল। নিচের SQL কোডটি আপনার Supabase SQL Editor-এ রান করুন।');
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

  const handleDelete = async (id: number) => {
    if (window.confirm('আপনি কি এই রেজিস্ট্রেশনটি মুছে ফেলতে চান?')) {
      try {
        const { error } = await supabase
          .from('registrations')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setRegistrations(registrations.filter(r => r.id !== id));
      } catch (err: any) {
        alert(err.message || 'মুছে ফেলতে সমস্যা হয়েছে।');
      }
    }
  };

  const filteredData = registrations.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.phone.includes(search) ||
    r.institution.toLowerCase().includes(search.toLowerCase()) ||
    r.area.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UserPlus size={24} className="text-blue-600"/>
              রেজিস্ট্রেশনসমূহ
            </h2>
            <p className="text-sm text-gray-500 mt-1">সব নতুন সদস্যপদের আবেদন এখানে দেখুন</p>
          </div>
          
          <div className="relative w-full sm:w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
             </div>
             <input 
               type="text" 
               placeholder="নাম, ফোন, এলাকা খুঁজুন..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
             />
          </div>
        </div>

        <div className="p-6">
           {errorMsg && (
             <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex flex-col gap-2 border border-red-200 text-sm">
               <p className="font-bold">{errorMsg}</p>
               {errorMsg.includes('SQL') && (
                 <div className="bg-white p-3 rounded border border-red-100 font-mono text-xs overflow-x-auto text-gray-800">
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

           {loading && !errorMsg ? (
             <div className="flex justify-center p-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
             </div>
           ) : !errorMsg ? (
             <>
               {registrations.length > 0 && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart2 className="text-blue-600" /> প্রতিষ্ঠান ভিত্তিক পরিসংখ্যান
                      </h3>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px' }} />
                            <Bar dataKey="count" fill="#3b82f6" name="সদস্য সংখ্যা" radius={[0, 4, 4, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <PieChartIcon className="text-blue-600" /> প্রতিষ্ঠানের অনুপাত
                      </h3>
                      <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
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
               )}

               <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-600">
               <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                 <tr>
                   <th className="px-4 py-3">নাম ও যোগাযোগ</th>
                   <th className="px-4 py-3">প্রতিষ্ঠান ও এলাকা</th>
                   <th className="px-4 py-3">রক্তের গ্রুপ</th>
                   <th className="px-4 py-3">তারিখ</th>
                   <th className="px-4 py-3 text-center">আকশন</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {filteredData.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                       কোনো ডেটা পাওয়া যায়নি।
                     </td>
                   </tr>
                 ) : (
                   filteredData.map((reg) => (
                     <tr key={reg.id} className="hover:bg-gray-50 transition">
                       <td className="px-4 py-3">
                         <div className="font-bold text-gray-800 text-base">{reg.name}</div>
                         <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                           <Phone size={12} /> {reg.phone}
                         </div>
                         {reg.email && (
                           <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                             <Mail size={12} /> {reg.email}
                           </div>
                         )}
                       </td>
                       <td className="px-4 py-3">
                         <div className="flex items-center gap-1 text-gray-800">
                           <Building size={14} className="text-gray-400 shrink-0"/> <span className="line-clamp-1">{reg.institution}</span>
                         </div>
                         <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                           <Home size={12} className="shrink-0"/> {reg.area}
                         </div>
                       </td>
                       <td className="px-4 py-3">
                         <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold font-mono">
                           <Droplet size={12} /> {reg.blood_group}
                         </span>
                       </td>
                       <td className="px-4 py-3 text-xs text-gray-500">
                         <div className="flex items-center gap-1">
                           <Calendar size={12} /> {new Date(reg.created_at).toLocaleDateString('bn-BD')}
                         </div>
                         <div className="ml-4 mt-0.5">{new Date(reg.created_at).toLocaleTimeString('bn-BD', {hour: '2-digit', minute:'2-digit'})}</div>
                       </td>
                       <td className="px-4 py-3 text-center">
                         <button 
                           onClick={() => handleDelete(reg.id)}
                           className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition"
                           title="ডিলিট করুন"
                         >
                           <Trash2 size={18} />
                         </button>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
           </>
         ) : null}
      </div>
    </div>
    </div>
  );
}
