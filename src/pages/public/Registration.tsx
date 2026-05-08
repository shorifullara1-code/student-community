import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Home,
  Building,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    institution: "",
    otherInstitution: "",
    area: "",
    bloodGroup: "A+",
  });
  const [loading, setLoading] = useState(false);

  const institutionCategories = [
    {
      category: "Savar & Ashulia Colleges",
      list: [
        "সাভার সরকারি কলেজ (Savar Government College)",
        "Savar College — EIIN 108453",
        "সাভার মডেল কলেজ (Savar Model College)",
        "Al Haj Abdul Mannan Degree College — EIIN 108449",
        "College Of Finance & Management — EIIN 131047",
        "Savar Cantonment Public School & College",
        "Savar cantonment board boys high school",
        "Jahangirnagar University School & College",
        "Savar Laboratory College",
        "Savar City College",
        "সাভার লিজেন্ড কলেজ (Legend College Savar)",
        "Savar Trust College",
        "ধামরাই সরকারী কলেজ",
        "Savar Adharchandra Government High school",
        "Ashulia School And College",
        "BPATC Collage",
        "Sena public school and college",
        "Palashbari Hazi Joynuddin school & college",
        "Savar girls high school",
        "সাভার সেন্টাল মডেল কলেজ",
      ],
    },
    {
      category: "Universities (UGC Approved / Recognized)",
      list: [
        "Jahangirnagar University",
        "Gono Bishwabidyalay",
        "সিটি ইউনিভার্সিটি (City University)",
        "Eastern University",
        "Manarat International University",
        "Daffodil International University",
        "Asian University of Bangladesh",
        "Army Institute of Business Administration",
        "BRAC University Residential Campus",
      ],
    },
    {
      category: "Madrasah & Other",
      list: ["arabic univarsity of jamia siddiqia", "মাদ্রাসা স্টুডেন্ট"],
    },
  ];
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const finalInstitution =
        formData.institution === "other"
          ? formData.otherInstitution
          : formData.institution;

      if (!finalInstitution) {
        throw new Error(
          "অনুগ্রহ করে আপনার শিক্ষা প্রতিষ্ঠান নির্বাচন করুন বা লিখুন।",
        );
      }

      const { error } = await supabase.from("registrations").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          age: formData.age ? parseInt(formData.age) : null,
          institution: finalInstitution,
          area: formData.area,
          blood_group: formData.bloodGroup,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        institution: "",
        otherInstitution: "",
        area: "",
        bloodGroup: "A+",
      });
    } catch (err: any) {
      if (err.message?.includes("does not exist")) {
        setErrorMsg(
          'Supabase-এ "registrations" টেবিল পাওয়া যায়নি। দয়া করে এডমিনকে একটি "registrations" টেবিল তৈরি করতে বলুন। (অথবা নিচের SQL কোডটি ব্যবহার করুন)',
        );
      } else if (
        err.message?.includes("VITE_SUPABASE_ANON_KEY") ||
        err.message?.includes("JWT") ||
        err.message?.includes("Invalid API key")
      ) {
        setErrorMsg(
          "Supabase কনফিগারেশন ভুল বা Invalid API key। Project variables ঠিক আছে কিনা চেক করুন। টেবিল তৈরি না থাকলে নিচের SQL কোডটি ব্যবহার করতে পারেন।",
        );
      } else {
        setErrorMsg(err.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-[#1d4ed8] flex items-center gap-2">
          <User size={24} />
          সদস্যপদ রেজিস্ট্রেশন
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          সাভার স্টুডেন্ট কমিউনিটির সদস্য হতে নিচের ফর্মটি পূরণ করুন। আপনার
          তথ্যগুলো এডমিন প্যানেলে সংরক্ষিত থাকবে।
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-start gap-3">
          <CheckCircle className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">রেজিস্ট্রেশন সফল হয়েছে!</p>
            <p className="text-sm mt-1">
              আপনার তথ্য আমাদের ডেটাবেসে সংরক্ষিত হয়েছে। প্রয়োজনে আমারা আপনার
              সাথে যোগাযোগ করব।
            </p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </div>
          {(errorMsg.includes("SQL") ||
            errorMsg.includes("Invalid API key") ||
            errorMsg.includes("টেবিল")) && (
            <div className="bg-white p-3 rounded border border-red-100 font-mono text-xs overflow-x-auto text-gray-800 ml-8">
              <p className="mb-2 text-red-500 font-bold">
                // নিচের SQL টি Supabase এর SQL Editor এ রান করুন:
              </p>
              <code>
                ALTER TABLE registrations ADD COLUMN IF NOT EXISTS age INTEGER;
                {"\n\n"}
                CREATE TABLE IF NOT EXISTS registrations ({"\n"}
                {"  "}id SERIAL PRIMARY KEY,{"\n"}
                {"  "}name TEXT NOT NULL,{"\n"}
                {"  "}phone TEXT NOT NULL,{"\n"}
                {"  "}email TEXT,{"\n"}
                {"  "}age INTEGER,{"\n"}
                {"  "}institution TEXT NOT NULL,{"\n"}
                {"  "}area TEXT NOT NULL,{"\n"}
                {"  "}blood_group TEXT,{"\n"}
                {"  "}created_at TIMESTAMPTZ DEFAULT NOW(){"\n"}
                );{"\n\n"}
                -- Allow inserts for anyone (anon){"\n"}
                ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;{"\n"}
                CREATE POLICY "Enable insert for anonymous users" ON
                registrations FOR INSERT WITH CHECK (true);{"\n"}
                CREATE POLICY "Enable read for anonymous users" ON registrations
                FOR SELECT USING (true);
              </code>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            পূর্ণ নাম *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="আপনার নাম লিখুন"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              মোবাইল নম্বর *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ইমেইল (যদি থাকে)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              বয়স *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="number"
                name="age"
                required
                min="10"
                max="100"
                value={formData.age}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="আপনার বয়স"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              শিক্ষা প্রতিষ্ঠান *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building size={18} className="text-gray-400" />
              </div>
              <select
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white"
              >
                <option value="" disabled>
                  আপনার শিক্ষা প্রতিষ্ঠান নির্বাচন করুন
                </option>
                {institutionCategories.map((cat, idx) => (
                  <optgroup key={idx} label={cat.category}>
                    {cat.list.map((inst) => (
                      <option key={inst} value={inst}>
                        {inst}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label="Other">
                  <option value="other">অন্যান্য (নিজে লিখুন)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {formData.institution === "other" && (
            <div className="ml-4 pl-4 border-l-2 border-blue-200">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                আপনার শিক্ষা প্রতিষ্ঠানের নাম লিখুন *
              </label>
              <input
                type="text"
                name="otherInstitution"
                required
                value={formData.otherInstitution}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="স্কুল/কলেজ/বিশ্ববিদ্যালয়ের নাম..."
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              নিজ এলাকা (সাভার) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="যেমন: ব্যাংক কলোনি, মজিদপুর..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              রক্তের গ্রুপ
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "সাবমিট হচ্ছে..." : "রেজিস্ট্রেশন সম্পূর্ণ করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}
