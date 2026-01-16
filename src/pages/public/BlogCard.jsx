const successStories = [
  {
    id: 1,
    name: "Aman Verma",
    role: "Software Developer",
    company: "Amazon",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&auto=format&fit=crop&q=60",
    story:
      "After applying to multiple jobs, Aman cracked his first role as a Software Developer through our platform within 2 months.",
  },
  {
    id: 2,
    name: "Sneha Gupta",
    role: "Data Analyst",
    company: "Flipkart",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop&q=60",
    story:
      "Sneha used the AI resume score feature to improve her profile and landed a Data Analyst role at Flipkart.",
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Business Development Executive",
    company: "BYJU’S",
    location: "Gurgaon",
    image:
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&auto=format&fit=crop&q=60",
    story:
      "From internship to full-time role, Rahul converted his opportunity into a permanent position within 6 months.",
  },
];

const BlogCard = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Placement Success Stories
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            See how students and freshers landed jobs and internships through our platform.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white border rounded-xl p-5 hover:shadow-lg transition duration-300 max-w-sm w-full"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {story.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {story.role}
                  </p>
                </div>
              </div>

              {/* Company */}
              <div className="mt-3 text-xs text-slate-500">
                {story.company} • {story.location}
              </div>

              {/* Story */}
              <p className="text-sm text-slate-700 mt-4 leading-relaxed line-clamp-4">
                “{story.story}”
              </p>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Hired
                </span>

                <button className="text-sm text-indigo-600 font-medium hover:underline">
                  Read story →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
