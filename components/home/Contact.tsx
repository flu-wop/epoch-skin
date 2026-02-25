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
              href="mailto:kayla@epoch-skin.com"
              className="inline-block px-8 py-4 border-2 border-[#b87968] text-[#b87968] rounded-md hover:bg-[#b87968] hover:text-white transition-all text-lg font-medium shadow-sm"
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
        </div>
      </div>
    </section>
  );
}