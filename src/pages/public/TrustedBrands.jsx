const TrustedBrands = () => {
  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-indigo-600">
            Trusted by leading brands
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-1">
            Companies hiring from our platform
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Top companies trust ATS-AI for hiring quality talent
          </p>
        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />

          <div
            className="marquee-inner flex will-change-transform min-w-[200%]"
            style={{ animationDuration: "25s" }}
          >
            <div className="flex items-center">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <img
                  key={index}
                  src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                  alt={company}
                  className="h-12 md:h-14 w-auto mx-10 object-contain opacity-90 hover:opacity-100 transition"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
        </div>
      </div>

      {/* MARQUEE ANIMATION */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBrands;
