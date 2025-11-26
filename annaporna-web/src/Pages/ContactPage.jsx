import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Info, Facebook, Twitter, Instagram } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' }); 
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-green-50 py-16 px-4 sm:px-6 lg:px-8 page-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-brand-green mb-6 leading-tight animate-fade-in-down">
            Get in Touch with Annapoorna
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in delay-200">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 animate-slide-in-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
              <Info className="text-brand-orange" size={40} /> Contact Info
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <Mail size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <a href="mailto:info@annapoorna.org" className="hover:text-brand-orange transition-colors">info@annapoorna.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <Phone size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <a href="tel:+1234567890" className="hover:text-brand-orange transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <MapPin size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Our Office</h3>
                  <p>123 Food Drive, Nourish City, FC 45678</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all">
                  <Facebook size={24} />
                </a>
                <a href="#" className="p-3 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 hover:scale-110 transition-all">
                  <Twitter size={24} />
                </a>
                <a href="#" className="p-3 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 hover:scale-110 transition-all">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 animate-slide-in-right">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
              <Send className="text-brand-green" size={40} /> Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center py-3.5 px-6 border border-transparent shadow-sm text-lg font-bold rounded-xl text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-200 transform active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      <Send size={20} className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </div>
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-xl text-center font-medium ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;