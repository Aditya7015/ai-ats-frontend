const pricingPlans = [
  {
    title: "Free",
    price: 0,
    features: [
      "Apply to jobs & internships",
      "Track applications",
      "Basic resume score",
      "Email notifications",
    ],
    buttonText: "Get Started",
  },
  {
    title: "Pro Candidate",
    price: 49,
    mostPopular: true,
    features: [
      "Unlimited job applications",
      "AI resume analysis",
      "Profile visibility boost",
      "Priority support",
      "Application insights",
    ],
    buttonText: "Upgrade Now",
  },
  {
    title: "Recruiter",
    price: 149,
    features: [
      "Post unlimited jobs",
      "View candidate analytics",
      "Shortlist & contact candidates",
      "ATS dashboard",
      "Priority listing",
    ],
    buttonText: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <p className="text-center uppercase font-medium text-indigo-600">
          Pricing
        </p>
        <h2 className="text-3xl font-semibold text-center mt-2">
          Our Pricing Plans
        </h2>
        <p className="text-sm text-slate-500 text-center mt-4 max-w-lg mx-auto">
          Flexible pricing options designed for candidates and recruiters —
          whether you're just getting started or scaling fast.
        </p>

        {/* Pricing Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl max-w-80 w-full shadow-[0px_4px_26px] shadow-black/5
                ${
                  plan.mostPopular
                    ? "relative pt-12 bg-linear-to-b from-indigo-600 to-violet-600 text-white"
                    : "bg-white"
                }`}
            >
              {/* Most Popular Badge */}
              {plan.mostPopular && (
                <div className="flex items-center gap-1 py-1.5 px-2 text-xs text-indigo-600 absolute top-4 right-4 rounded bg-white font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  </svg>
                  <span>Most Popular</span>
                </div>
              )}

              {/* Plan Title */}
              <p className="font-medium">{plan.title}</p>

              {/* Price */}
              <h3 className="text-3xl font-semibold mt-1">
                ₹{plan.price}
                <span
                  className={`font-normal text-sm ${
                    plan.mostPopular ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  /month
                </span>
              </h3>

              <hr
                className={`my-8 ${
                  plan.mostPopular ? "border-white/40" : "border-slate-200"
                }`}
              />

              {/* Features */}
              <div
                className={`space-y-2 ${
                  plan.mostPopular ? "text-white" : "text-slate-600"
                }`}
              >
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        plan.mostPopular
                          ? "text-white"
                          : "text-indigo-600"
                      }
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`transition w-full py-3 rounded-lg font-medium mt-8
                  ${
                    plan.mostPopular
                      ? "bg-white hover:bg-slate-100 text-slate-800"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
