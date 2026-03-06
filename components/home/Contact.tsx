export default function Contact() {
  return (
    <section className="py-16 md:py-20 bg-sand/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Get in Touch
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
            Have questions about our Organic Skincare or services? We'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:kayla@epoch-skin.com"
              className="inline-block px-8 py-4 bg-clay-500 text-white rounded-md hover:bg-clay-600 transition-colors text-lg font-medium"
            >
              Email Us
            </a>
            <a 
              href="tel:5047774094"
              className="inline-block px-8 py-4 bg-sage-700 text-white rounded-md hover:bg-sage-800 transition-colors text-lg font-medium"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}