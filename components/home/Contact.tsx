export default function Contact() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Get in Touch
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
            Have questions about our organic skincare or services? We'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:kayla@epochskin.com"
              className="inline-block px-8 py-4 bg-[#b87968] text-white rounded-md hover:opacity-90 transition-all text-lg font-medium shadow-sm hover:shadow-md"
            >
              Email Us
            </a>
            
            <a 
              href="tel:5047774094"
              className="inline-block px-8 py-4 bg-[#b87968] text-white rounded-md hover:opacity-90 transition-all text-lg font-medium shadow-sm hover:shadow-md"
            >
              Call (504) 777-4094
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-serif text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-700">
              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
