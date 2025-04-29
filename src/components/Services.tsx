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
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    icon: Smartphone,
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces",
    icon: PenTool,
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
  {
    title: "AI Integration",
    description: "Smart solutions powered by artificial intelligence",
    icon: Brain,
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
  {
    title: "Automation",
    description: "Streamline your business processes",
    icon: Zap,
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
  {
    title: "SEO Optimization",
    description: "Improve your online visibility",
    icon: Search,
    backcontent: "ertyuiopohgfdsdfgnmttttttttttttttttttttttdgjcd nhehf figiureour iuhorwbibgv gfey u e bybgrns unsutvfafbtign"
  },
];



export const Services = () => {
  // const navigate = useNavigate();

  return (
    <section
      id="services"
      className="py-20 bg-cover bg-[#F4F0E0] text-black bg-center"
      style={{ 
        // backgroundImage: `url(${logo})`, 
        backgroundRepeat: "no-repeat",
        // backgroundSize: "90%",
      }}
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
                  border-none
                  h-60
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
                    className="inset-0 bg-black bg-cover bg-center [backface-visibility:hidden] h-full p-6 border rounded-lg "
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
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 h-full"
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