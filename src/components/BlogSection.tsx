import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const BlogSection = () => {
  const posts = [
    {
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the web development landscape.",
      image: "photo-1488590528505-98d2b5aba04b",
      date: "March 15, 2024",
    },
    {
      title: "Building Scalable Applications",
      excerpt: "Best practices for creating applications that can grow with your business.",
      image: "photo-1461749280684-dccba630e2f6",
      date: "March 10, 2024",
    },
    {
      title: "UI/UX Design Principles",
      excerpt: "Essential design principles for creating user-friendly web applications.",
      image: "photo-1487058792275-0ad4aaf24ca7",
      date: "March 5, 2024",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest Insights</h2>
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={`https://source.unsplash.com/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
                <Button variant="link" className="mt-4 p-0">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};