import React from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How does this platform help me get a job or internship?",
      answer:
        "You can apply to verified jobs and internships, track your applications, and improve your chances using AI-powered resume analysis and job matching.",
    },
    {
      question: "Is this platform free for students and freshers?",
      answer:
        "Yes, applying to jobs and internships is completely free for candidates. Some advanced features may be added later as optional upgrades.",
    },
    {
      question: "How does the AI resume score work?",
      answer:
        "Our AI analyzes your resume against the job description and gives you a match score along with suggestions to improve your chances of selection.",
    },
    {
      question: "Can recruiters directly contact candidates?",
      answer:
        "Yes, recruiters can view applications, shortlist candidates, and contact them directly through the recruiter dashboard.",
    },
    {
      question: "Are all jobs and internships verified?",
      answer:
        "We manually review recruiter profiles and job postings to ensure authenticity and maintain a safe experience for candidates.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT IMAGE */}
          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=900&auto=format&fit=crop"
              alt="FAQ workspace"
              className="rounded-2xl w-full h-105 object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7">
            <p className="text-indigo-600 text-sm font-medium">
              FAQs
            </p>

            <h2 className="text-3xl font-semibold text-slate-900 mt-1">
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-slate-500 mt-2 mb-8 max-w-xl">
              Everything you need to know about jobs, internships, applications,
              and how our platform works.
            </p>

            {/* FAQ LIST */}
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-slate-200 py-4 cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-slate-900">
                      {faq.question}
                    </h3>

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        openIndex === index ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="#1D293D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p
                    className={`text-sm text-slate-500 overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-40 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
