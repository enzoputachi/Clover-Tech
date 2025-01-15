import { Code, Smartphone, PenTool, Brain, Zap, Search } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs",
    icon: Code,
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces",
    icon: PenTool,
  },
  {
    title: "AI Integration",
    description: "Smart solutions powered by artificial intelligence",
    icon: Brain,
  },
  {
    title: "Automation",
    description: "Streamline your business processes",
    icon: Zap,
  },
  {
    title: "SEO Optimization",
    description: "Improve your online visibility",
    icon: Search,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for your digital needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <service.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};