import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "15+ years of experience in software development and tech leadership"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "Expert in cloud architecture and AI integration"
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    bio: "10+ years of experience in UI/UX and brand design"
  }
];

const faqs = [
  {
    question: "What services does Clover Tech offer?",
    answer: "We offer a comprehensive range of services including website development, SEO optimization, mobile app development, UI/UX design, graphic design, AI integration, and virtual tech courses."
  },
  {
    question: "How long does it typically take to complete a project?",
    answer: "Project timelines vary depending on complexity and scope. A typical website project takes 4-8 weeks, while larger applications may take 3-6 months."
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer various maintenance and support packages to ensure your digital solutions remain up-to-date and perform optimally."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern web technologies including React, Node.js, Python, React Native for mobile development, and various AI frameworks."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar layout="default" />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-center">About Clover Tech</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
            We are a leading software development company specializing in creating innovative digital solutions
            for businesses of all sizes. Our expertise spans across web development, mobile applications,
            AI integration, and technical education.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;