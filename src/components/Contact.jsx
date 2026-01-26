"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiTerminal,
} from "react-icons/fi";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",

    email: "",

    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState(null);

  const [formErrors, setFormErrors] = useState({
    name: "",

    email: "",

    message: "",
  });

  const validateForm = () => {
    let valid = true;

    const newErrors = {
      name: "",

      email: "",

      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";

      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";

      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";

      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";

      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";

      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";

      valid = false;
    }

    setFormErrors(newErrors);

    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,

        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firestore

      await addDoc(collection(db, "contactMessages"), {
        name: formData.name.trim(),

        email: formData.email.trim(),

        message: formData.message.trim(),

        timestamp: serverTimestamp(),

        status: "unread",
      });

      // Send email notification via API

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email notification");
      }

      setIsSubmitting(false);

      setIsSuccess(true);

      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Error:", err);

      setError(
        err.message || "Failed to send message. Please try again later."
      );

      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <FiMail className="w-6 h-6 text-indigo-500" />,

      title: "Email",

      content: "nepal.aashish00@gmail.com",

      href: "mailto:nepal.aashish00@gmail.com",
    },

    {
      icon: <FiPhone className="w-6 h-6 text-indigo-500" />,

      title: "Phone",

      content: "+977 9869100969",

      href: "tel:+9779869100969",
    },

    {
      icon: <FiMapPin className="w-6 h-6 text-indigo-500" />,

      title: "Location",

      content: "Kathmandu, Nepal",

      href: "https://maps.google.com/?q=Kathmandu,Nepal",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-500"
    >
      {/* Background Elements (Consistent with About Section) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header Section */}
        <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Initiate{" "}
              <span className="italic font-light text-indigo-600/90">
                Contact
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>
        
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info - Schematic Style */}
          <div className="lg:col-span-5 space-y-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              Ready to deploy your next digital solution? I'm available for
              collaborations and architectural consultations.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: <FiMail />,
                  label: "ENTRY_POINT",
                  val: "nepal.aashish00@gmail.com",
                  href: "mailto:nepal.aashish00@gmail.com",
                },
                {
                  icon: <FiPhone />,
                  label: "VOICE_LINE",
                  val: "+977 9869100969",
                  href: "tel:+9779869100969",
                },
                {
                  icon: <FiMapPin />,
                  label: "LOCAL_NODE",
                  val: "Kathmandu, Nepal",
                  href: "#",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-6 group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-400 tracking-widest">
                      {item.label}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                      {item.val}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-indigo-900 dark:text-indigo-300 tracking-tighter uppercase">
                System Status: Active_Accepting_Queries
              </span>
            </div>
          </div>

          {/* Right: The Message Terminal */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-8">
                <FiTerminal className="text-indigo-600" />
                <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">
                  Messaging_Interface_v1.0
                </span>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center space-y-4"
                >
                  <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">
                    Transmission Successful
                  </h4>
                  <p className="text-gray-500 font-mono text-sm">
                    Return value: 200 OK
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        User_Identity
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="NAME_REQUIRED"
                        className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors font-bold tracking-tight"
                      />
                      {formErrors.name && (
                        <p className="text-[9px] text-red-500 font-mono italic">
                          Error: {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Return_Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EMAIL_ADDR"
                        className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors font-bold tracking-tight"
                      />
                      {formErrors.email && (
                        <p className="text-[9px] text-red-500 font-mono italic">
                          Error: {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Payload_Description
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="CONSTRUCT_MESSAGE_HERE..."
                      className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors font-bold tracking-tight resize-none"
                    />
                    {formErrors.message && (
                      <p className="text-[9px] text-red-500 font-mono italic">
                        Error: {formErrors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">TRANSMITTING...</span>
                    ) : (
                      <>
                        <FiSend /> EXECUTE_SEND
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiTerminal size={100} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
