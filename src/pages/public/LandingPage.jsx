import HeroSection from "./HeroSection";
import TrendingJobs from "./TrendingJobs";
import AiHighlight from "./AiHighlight";
import RecruiterCTA from "./RecruiterCTA";
import BlogPage from "./BlogCard";
import FAQ from "./FAQ";
import TrustedBrands from "./TrustedBrands";
import NewsLetter from "./NewsLetter";

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <TrustedBrands />
      <TrendingJobs />
      <AiHighlight />
      <BlogPage />
      <FAQ />
      <RecruiterCTA />
      <NewsLetter />
    </div>
  );
}

export default LandingPage;
