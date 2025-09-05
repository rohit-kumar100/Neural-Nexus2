import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Achievements",
    description: "Digital certificates and achievements verified by faculty and administration",
  },
  {
    title: "Alumni Network",
    description: "Connect with successful alumni for mentorship and career guidance",
  },
  {
    title: "Recruiter Access",
    description: "Verified student profiles accessible to approved recruiters and companies",
  },
  {
    title: "Parent Dashboard",
    description: "Parents can track their child's academic progress and achievements",
  },
  {
    title: "Faculty Management",
    description: "Streamlined approval process for certificates and student activities",
  },
  {
    title: "Admin Reports",
    description: "Generate comprehensive reports for NAAC, NIRF, and AICTE compliance",
  },
];

export const WhyChoose: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MyWork?</h2>
        <p className="text-gray-600 mb-12">
          A comprehensive platform designed specifically for higher education institutions
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
