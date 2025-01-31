import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  outline: Array<{ id: string; point: string; }>;
}

const Courses = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // Additions
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // This would typically come from your backend/state management
  // const courses: Course[] = [
  //   {
  //     id: "1",
  //     title: "Mobile Development",
  //     description: "Learn to build iOS and Android apps using React Native",
  //     price: "$599",
  //     duration: "12 weeks",
  //     image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  //     outline: [
  //       { id: "1", point: "Introduction to React Native" },
  //       { id: "2", point: "Building User Interfaces" },
  //       { id: "3", point: "State Management" },
  //       { id: "4", point: "Native Modules" }
  //     ]
  //   },
  //   {
  //     id: "2",
  //     title: "Python Programming",
  //     description: "Master Python programming from basics to advanced concepts",
  //     price: "$499",
  //     duration: "10 weeks",
  //     image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  //     outline: [
  //       { id: "1", point: "Introduction to Python" },
  //       { id: "2", point: "Data Structures" },
  //       { id: "3", point: "Web Development with Flask" }
  //     ]
  //   },
  //   {
  //     id: "3",
  //     title: "AI Integration",
  //     description: "Learn to integrate AI technologies into applications",
  //     price: "$799",
  //     duration: "14 weeks",
  //     image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  //     outline: [
  //       { id: "1", point: "Understanding AI Concepts" },
  //       { id: "2", point: "Machine Learning Basics" },
  //       { id: "3", point: "Building AI Models" }
  //     ]
  //   },
  //   {
  //     id: "4",
  //     title: "DevOps Engineering",
  //     description: "Master modern DevOps practices and tools",
  //     price: "$699",
  //     duration: "12 weeks",
  //     image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  //     outline: [
  //       { id: "1", point: "Introduction to DevOps" },
  //       { id: "2", point: "CI/CD Pipelines" },
  //       { id: "3", point: "Containerization with Docker" }
  //     ]
  //   },
  //   {
  //     id: "5",
  //     title: "Frontend Development",
  //     description: "Build modern web applications with React",
  //     price: "$549",
  //     duration: "10 weeks",
  //     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  //     outline: [
  //       { id: "1", point: "React Basics" },
  //       { id: "2", point: "State Management with Redux" },
  //       { id: "3", point: "Routing with React Router" }
  //     ]
  //   },
  //   {
  //     id: "6",
  //     title: "Graphic Design",
  //     description: "Master the principles of modern design",
  //     price: "$449",
  //     duration: "8 weeks",
  //     image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  //     outline: [
  //       { id: "1", point: "Design Principles" },
  //       { id: "2", point: "Color Theory" },
  //       { id: "3", point: "Typography" }
  //     ]
  //   }
  // ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get<Course[]>('/api/courses');
        setCourses(response.data)
      } catch (error) {
        setError('Failed to get courses')
      } finally {
        setLoading(false)
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your career with our comprehensive tech courses. Learn from industry experts
            and gain practical experience in the most in-demand technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 relative"
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {hoveredCourse === course.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 overflow-y-auto transition-opacity duration-300">
                    <h4 className="font-bold mb-2">Course Outline:</h4>
                    <ul className="list-disc list-inside">
                      {course.outline.map(point => (
                        <li key={`${course.id}-${point.id}`} className="text-sm mb-1">{point.point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <span className="text-gray-600">{course.duration}</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => addItem(course)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-4 right-4">
          <Button 
            size="lg"
            onClick={() => navigate('/cart')}
            className="shadow-lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
