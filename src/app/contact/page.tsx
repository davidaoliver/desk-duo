"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Get Started with Desk Duo
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Book a free demo or tell us about your business. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          {submitted ? (
            <div className="text-center p-12 rounded-2xl bg-gray-light">
              <svg className="w-16 h-16 text-accent mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-dark mb-3">We Got Your Message!</h2>
              <p className="text-gray">We&apos;ll reach out within 24 hours to schedule your free demo.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@yourbusiness.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-dark mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-dark mb-2">
                  Business Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select your business type</option>
                  <option value="barbershop">Barbershop</option>
                  <option value="hair-salon">Hair Salon</option>
                  <option value="nail-salon">Nail Salon</option>
                  <option value="massage">Massage Therapy</option>
                  <option value="med-spa">Med Spa</option>
                  <option value="tattoo">Tattoo Studio</option>
                  <option value="beauty">Beauty Studio</option>
                  <option value="wellness">Wellness Center</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-dark mb-2">
                  What are you interested in?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Custom App ($60/mo)",
                    "AI Receptionist ($30/mo)",
                    "Self Check-In Kiosk ($20/mo)",
                    "AI Agents (Custom)",
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-primary">
                      <input type="checkbox" name="interest" value={option} className="accent-primary" />
                      <span className="text-sm text-dark">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Tell us about your business
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="What challenges are you facing? What would you like to automate?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-lg"
              >
                Book My Free Demo
              </button>
              <p className="text-center text-gray text-sm">No commitment required. We&apos;ll reach out within 24 hours.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
