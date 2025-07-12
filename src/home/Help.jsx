import React from "react";

export default function Help() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-emerald-50 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600">
        💬 Help & Support
      </h1>

      {/* FAQ Section */}
      <section className="mb-12 bg-white p-8 rounded-3xl shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">❓ Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <p className="text-lg font-semibold">📦 How can I track my order?</p>
            <p className="text-gray-600 ml-4 mt-1">You will receive a tracking link via email once your order is shipped.</p>
          </div>
          <div className="border-b pb-4">
            <p className="text-lg font-semibold">🛑 How do I cancel or modify my order?</p>
            <p className="text-gray-600 ml-4 mt-1">Please contact support within 2 hours of placing your order.</p>
          </div>
          <div>
            <p className="text-lg font-semibold">🚚 Do you provide doorstep delivery?</p>
            <p className="text-gray-600 ml-4 mt-1">Yes, we deliver to most pincodes across India.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-12 bg-white p-8 rounded-3xl shadow-lg border border-emerald-100">
        <h2 className="text-2xl font-bold mb-6 text-emerald-600">📩 Contact Support</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("✅ Your message has been submitted. We'll respond shortly.");
          }}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            🚀 Submit Message
          </button>
        </form>
      </section>

      {/* Footer Note */}
      <p className="text-sm text-gray-600 text-center mt-8">
        Need urgent help? Email us at{" "}
        <span className="font-semibold text-blue-700">support@agritech.com</span>
      </p>
    </div>
  );
}
