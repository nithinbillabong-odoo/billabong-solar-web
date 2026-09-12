import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Billabong Solar | Call 1300 897 221 | Victoria Solar Experts',
  description: 'Contact Billabong Solar today for a free, no-obligation solar quote. Call 1300 897 221, email info@billabongsolar.com.au, or visit us in Victoria.',
  alternates: {
    canonical: '/contact-us',
  },
};

export default function ContactUsPage() {
  return (
    <>
      {/* Hero Banner with Royal Navy Glass Effect */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-20 md:py-28 overflow-hidden shadow-inner">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-orange-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            Direct Support Line
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
            We are here to answer all your solar questions, calculate your rebates, and provide free, no-obligation engineering proposals.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            {/* Form Column */}
            <div className="lg:w-3/5 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2 text-[#171D4D]">Send Us a Message</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Fill in the form below and one of our qualified solar consultants will get in touch within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Details Column */}
            <div className="lg:w-2/5 bg-gradient-to-br from-[#171D4D] to-[#242C7D] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#FF5E00]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
                
                <div className="space-y-6 text-sm">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 text-orange-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Phone</h4>
                      <a href="tel:1300897221" className="text-orange-400 hover:text-orange-300 font-semibold text-lg transition-colors">
                        1300 897 221
                      </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 text-orange-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Email</h4>
                      <a href="mailto:info@billabongsolar.com.au" className="text-gray-200 hover:text-white transition-colors">
                        info@billabongsolar.com.au
                      </a>
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 text-orange-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Service Areas</h4>
                      <p className="text-gray-300">Melbourne & Regional Victoria</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start pt-4 border-t border-white/15">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0 text-orange-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Business Hours</h4>
                      <p className="text-gray-300">Mon - Fri: 8:00 AM – 6:00 PM</p>
                      <p className="text-gray-300">Saturday: 9:00 AM – 2:00 PM</p>
                      <p className="text-gray-400 text-xs mt-0.5">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Interactive Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-inner border border-white/20 h-52 relative z-10">
                <iframe
                  title="Billabong Solar Service Area Melbourne Victoria"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805184.2828604724!2d144.492668984375!3d-37.81362759999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
