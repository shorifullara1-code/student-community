import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-blue-900 border-b-4 border-blue-500 pb-2 inline-flex items-center gap-3 font-tiro tracking-tight mb-4">
          <Phone size={36} className="text-blue-600" />
          যোগাযোগ
        </h1>
        <p className="text-gray-600 font-medium text-lg ml-1">
          সাভার স্টুডেন্ট কমিউনিটির সাথে যোগাযোগ করুন
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
              <Building className="text-blue-600" size={24} />
              আমাদের কার্যালয়
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-full shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    ঠিকানা
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    ইউনিক বাসস্ট্যান্ড (মিজান প্লাজা), বাইপাইল,
                    <br />
                    আশুলিয়া, সাভার, ঢাকা।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-full shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    মোবাইল নং
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">
                    01722000231
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-50 text-red-600 p-3 rounded-full shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    ইমেইল
                  </h3>
                  <p className="text-gray-700">
                    info@savarstudentcommunity.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-50 text-orange-600 p-3 rounded-full shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    অফিস সময়
                  </h3>
                  <p className="text-gray-700">
                    সকাল ১০:০০ টা থেকে রাত ৮:০০ টা পর্যন্ত
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
            <Mail className="text-blue-600" size={24} />
            ম্যাসেজ পাঠান
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("আপনার ম্যাসেজ পাঠানো হয়েছে। ধন্যবাদ!");
            }}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                আপনার নাম
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="নাম লিখুন"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                মোবাইল নম্বর
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ম্যাসেজ
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                placeholder="আপনার মতামত বা প্রশ্ন লিখুন..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg mt-2"
            >
              সেন্ড করুন
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full h-96 mt-8 rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 relative"
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d14594.120610344485!2d90.2741952!3d23.8619379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e9ba5e1d8825%3A0xc3c50f8ca7fb60be!2sBaipail%2C%20Ashulia!5e0!3m2!1sen!2sbd!4v1715102000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
}
