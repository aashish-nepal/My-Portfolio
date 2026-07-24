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
      icon: <FiMail className="w-6 h-6 text-orange-500" />,

      title: "Email",

      content: "nepal.aashish00@gmail.com",

      href: "mailto:nepal.aashish00@gmail.com",
    },

    {
      icon: <FiPhone className="w-6 h-6 text-orange-500" />,

      title: "Phone",

      content: "+977 9869100969",

      href: "tel:+9779869100969",
    },

    {
      icon: <FiMapPin className="w-6 h-6 text-orange-500" />,

      title: "Location",

      content: "Kathmandu, Nepal",

      href: "https://maps.google.com/?q=Kathmandu,Nepal",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-500"
    >
      {/* Background Elements (Consistent with About Section) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Initiate{" "}
              <span className="italic font-light text-orange-600/90">
                Contact
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>
        
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Info - Schematic Style */}
          <div className="lg:col-span-5 space-y-10 lg:space-y-12">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              Ready to deploy your next digital solution? I&apos;m available for
              collaborations and architectural consultations.
            </p>

            <div className="space-y-6 sm:space-y-8">
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
                  className="flex items-center gap-4 sm:gap-6 group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  {/* min-w-0 + wrap-anywhere: the email address is a single
                      unbreakable token wider than a 320px column. */}
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono text-gray-400 tracking-widest">
                      {item.label}
                    </span>
                    <span className="block text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight wrap-anywhere">
                      {item.val}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="inline-flex max-w-full items-center gap-3 sm:gap-4 px-5 sm:px-6 py-3 rounded-3xl sm:rounded-full bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/20">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              {/* Underscores are not line-break opportunities, so this string
                  needs an explicit escape hatch on narrow screens. */}
              <span className="text-[11px] sm:text-xs font-mono font-bold text-orange-900 dark:text-orange-300 tracking-tighter uppercase wrap-anywhere">
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
            <div className="bg-white dark:bg-[#0f0f0f] rounded-3xl sm:rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-8">
                <FiTerminal className="shrink-0 text-orange-600" />
                <span className="font-mono text-[11px] sm:text-xs text-gray-400 tracking-widest uppercase wrap-anywhere">
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
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
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
                        className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-orange-600 focus:outline-none transition-colors font-bold tracking-tight"
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
                        className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-orange-600 focus:outline-none transition-colors font-bold tracking-tight"
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
                      className="w-full bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 px-0 py-3 text-gray-900 dark:text-white focus:border-orange-600 focus:outline-none transition-colors font-bold tracking-tight resize-none"
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
              <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-10">
                <FiTerminal className="w-16 h-16 sm:w-25 sm:h-25" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
