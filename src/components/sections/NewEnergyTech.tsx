import Image from 'next/image';
import Link from 'next/link';

export default function NewEnergyTech() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex flex-col items-center">
            <Image 
              src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/new-energetch-approved-seller-1.png?fit=370%2C205&ssl=1" 
              alt="New Energy Tech Approved Seller" 
              width={370} 
              height={205} 
              className="mb-8"
            />
            <Link href="/get-a-quote" className="bg-[#FF660D] text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-orange-600 transition-colors">
              Get a Free Quote
            </Link>
          </div>
          <div className="border-t-[10px] border-[#FF660D] pt-8 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">New Energy Tech</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Billabong Solar is a proud New Energy Tech Approved Seller committed to meeting consumer protection standards throughout your customer journey with us.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These standards have been designed by peak consumer and industry bodies to help raise consumer protection across the solar, battery storage and new energy tech industry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {[
            {
              src: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Solar_Warranty_Badges-01.png",
              title: "10 Years Workmanship"
            },
            {
              src: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Solar_Warranty_Badges-04-1.png",
              title: "10 Years Inverter Warranty"
            },
            {
              src: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Solar_Warranty_Badges-03-1.webp",
              title: "5 Years System Performance"
            },
            {
              src: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Solar_Warranty_Badges-02-1.webp",
              title: "25 Years Panel Performance"
            }
          ].map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <Image src={badge.src} alt={badge.title} fill className="object-contain" />
              </div>
              <h3 className="text-[#FF660D] font-bold text-lg">{badge.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
