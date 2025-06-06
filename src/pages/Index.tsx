import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import Courses from "./Courses";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar layout="default" />
      <Hero />
      <Services />
      <Testimonials />
      {/* <BlogSection /> */}
      <Footer />
    </div>
  );
};

export default Index;