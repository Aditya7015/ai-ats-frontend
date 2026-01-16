import footer_logo from '../assets/footer_logo.png'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 px-6 pt-14 md:px-16 lg:px-36 w-full">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-slate-700 pb-12">

        {/* Brand */}
        <div className="max-w-sm">
          {/* LOGO */}
          <img
  src={footer_logo}
  alt="TalentIQ AI Logo"
  className="h-25 mb-4 brightness-0 invert"
/>


          <p className="text-sm text-slate-400 leading-relaxed">
            AI-powered job & internship platform helping freshers and recruiters
            connect faster with smart resume matching, ATS scoring, and automated shortlisting.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-12 md:gap-24">

          <div>
            <h3 className="font-semibold text-white mb-4">
              For Candidates
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/jobs" className="hover:text-white">Find Jobs</a></li>
              <li><a href="/internships" className="hover:text-white">Internships</a></li>
              <li><a href="/register" className="hover:text-white">Create Profile</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">
              For Recruiters
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/register" className="hover:text-white">Post a Job</a></li>
              <li><a href="/recruiter/dashboard" className="hover:text-white">Recruiter Dashboard</a></li>
              <li><a href="#" className="hover:text-white">AI Shortlisting</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} TalentIQ AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
