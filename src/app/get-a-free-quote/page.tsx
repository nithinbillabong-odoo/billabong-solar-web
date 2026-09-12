import type { Metadata } from 'next';
import QuoteForm from './QuoteForm';

export const metadata: Metadata = {
  title: 'Get a Free Solar Quote | Billabong Solar Victoria',
  description: 'Get your free, no-obligation solar quote from Billabong Solar. Tell us about your property and we\'ll design the perfect solar system for you. Takes 2 minutes.',
};

export default function GetAQuotePage() {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Get Your Free Solar Quote</h1>
          <p className="text-lg text-gray-600">Takes less than 2 minutes. No obligation.</p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
