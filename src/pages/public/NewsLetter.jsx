export default function NewsLetter() {
  return (
    <>
      <section className="w-full bg-slate-50 px-6 py-20 flex flex-col items-center justify-center text-center">
        
        <p className="text-indigo-600 font-medium tracking-wide">
          Stay Updated
        </p>

        <h1 className="max-w-xl font-semibold text-3xl md:text-4xl mt-2 text-gray-900">
          Subscribe to job & internship updates
        </h1>

        <p className="text-gray-600 mt-3 max-w-md">
          Get AI-recommended opportunities directly in your inbox.
        </p>

        <form className="flex items-center justify-center mt-8 border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 rounded-full h-14 max-w-md w-full bg-white">
          
          <input
            type="email"
            required
            className="outline-none rounded-full px-5 h-full flex-1 bg-transparent text-gray-700 placeholder-gray-400"
            placeholder="Enter your email address"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-11 mr-1 px-8 font-medium transition"
          >
            Subscribe
          </button>

        </form>

        <p className="text-xs text-gray-500 mt-4">
          No spam • Only relevant job alerts • Unsubscribe anytime
        </p>

      </section>
    </>
  );
}
