import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Working with Clover Tech transformed our digital presence. Their expertise in web development is unmatched.",
      image: "photo-1649972904349-6e44c42644a7",
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      content: "The team's attention to detail and technical prowess helped us launch our platform ahead of schedule.",
      image: "photo-1581091226825-a6a2a5aee158",
    },
    {
      name: "Emily Davis",
      role: "Product Manager, NextGen",
      content: "Outstanding service and exceptional results. They truly understand modern web development.",
      image: "photo-1486312338219-ce68d2c6f44d",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={`https://source.unsplash.com/${testimonial.image}`} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};