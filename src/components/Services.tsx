import { Code, Smartphone, PenTool, Brain, Zap, Search } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import logo from '../bg.png'
import { useNavigate } from "react-router-dom";
import AI from '../icons/AI.gif'

const services = [
  {
    title: "Software & Web Development",
    description: "Custom software solutions tailored to your business needs",
    icon: Code,
    backcontent: "Whether you're running a school, salon, boutique, or logistics firm, having a custom website or app helps you stay organized, serve customers faster, and look more professional. We build affordable, tailored solutions that match your goals and grow with your business."
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    icon: Smartphone,
    backcontent: "Your customers are on their phones — so should your business be. We create mobile apps that help you sell, serve, and connect faster, whether it's for delivery tracking, online booking, or customer loyalty. Everything is designed to work smoothly, even with low data or weak network."
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces",
    icon: PenTool,
    backcontent: "First impressions matter. A clean, attractive, and easy-to-use interface gives your business credibility and makes customers want to come back. We design digital experiences that feel familiar, friendly, and functional — even for users who aren’t tech-savvy."
  },
  {
    title: "AI Integration",
    description: "Smart solutions powered by artificial intelligence",
    icon: Brain,
    backcontent: "Want to reply to customers automatically, analyze sales patterns, or get alerts when stock is low? We use AI to make your systems smarter, saving you time and helping you make better business decisions — without hiring more staff."
  },
  {
    title: "Automation",
    description: "Streamline your business processes",
    icon: Zap,
    backcontent: "Still using pen and paper or WhatsApp to track orders and payments? Let us automate repetitive tasks — like invoicing, reminders, and inventory updates — so you can focus on growing your business while the tech does the busy work."
  },
  {
    title: "SEO Optimization",
    description: "Improve your online visibility",
    icon: Search,
    backcontent: "It’s not enough to have a website — people need to find it. Our SEO service helps your business appear in search results when people Google products or services like yours. More visibility means more customers and more trust."
  },
];



export const Services = () => {
  // const navigate = useNavigate();

  return (
    <section
      id="services"
      className="py-20 bg-cover bg-[#F4F0E0] text-black bg-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => { 
            
            // detect last 3 items
            const isLastThree = index >= services.length - 3;

            // choose bg for the icon
            const iconBgClass = isLastThree ? "bg-yello" : "bg-primary";

            return (
            
            <div
              className="              
                group

              "
            >
        
              <Card
                key={service.title}
                className="
                  hover:shadow-lg
                  border-black
                  h-60
 
                  md:w-full
                  duration-1000
                  group-hover:[transform:rotateY(180deg)_scale(1.05)] 
                  transition-transform transform-gpu
                  [transform-style:preserve-3d]
                "//  bg-white/10 , transition-transform, transform-gpu, [transform-style:preserve-3d]

              > 
                <div
                  className="relative w-full h-full [transform-style:preserve-3d]"
                >
                  <CardContent
                    className="inset-0 bg-black bg-cover bg-center [backface-visibility:hidden] h-full p-6 border-black rounded-lg "
                    // style={{ backgroundImage: `url(${AI})`}}
                  >
                    <service.icon className={`h-12 w-12 mb-4 group-hover:scale-110 border rounded-lg ${iconBgClass}`} />
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-100">{service.description}</p>
                  </CardContent>
                  
                  {/* Back face */}
                  <CardContent
                    className="border-black absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 h-full"
                  >
                    <p>{service.backcontent}</p>
                  </CardContent>
                </div>

              </Card>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};