import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Billabong Solar | Get Your Free Solar Quote',
  description: 'Contact Billabong Solar today for a free, no-obligation solar quote. Call, email, or use our online form. Serving all of Victoria.',
};

export default function ContactUsPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">We're here to answer all your solar questions and provide free, no-obligation quotes.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Form Column */}
            <div className="lg:w-3/5 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Contact Details Column */}
            <div className="lg:w-2/5 bg-orange-500 text-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="opacity-90">1300 000 000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="opacity-90">info@billabongsolar.com.au</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <div>
                      <h4 className="font-semibold text-lg">Service Areas</h4>
                      <p className="opacity-90">Melbourne & Victoria-wide</p>
                    </div>
                  </div>

                  <div className="flex items-start pt-4 border-t border-orange-400">
                    <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <h4 className="font-semibold text-lg">Business Hours</h4>
                      <p className="opacity-90">Mon-Fri: 8:00am - 6:00pm</p>
                      <p className="opacity-90">Sat: 9:00am - 2:00pm</p>
                      <p className="opacity-90">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-10 bg-orange-400 h-48 rounded-xl flex items-center justify-center border border-orange-300">
                <span className="font-semibold text-orange-800">Interactive Map Embed Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
