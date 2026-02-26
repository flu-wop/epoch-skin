export default function Contact() {
  return (
    <section className="py-16 md:py-20 bg-sand/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Get in Touch
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
            Have questions about our organic skincare or services? We'd love to hear from you.
          </p>
          
          <a 
            href="mailto:hello@epochskin.com"
            className="inline-block px-8 py-4 bg-sage text-white rounded-md hover:opacity-90 transition-opacity text-lg font-medium"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
