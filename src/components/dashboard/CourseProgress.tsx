import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

export const CourseProgress = () => {
  // Mock course progress data - in a real app, this would come from an API
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 75,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 2,
      title: "TypeScript Basics",
      progress: 45,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <div key={course.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">{course.title}</h4>
            <span className="text-sm text-gray-500">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last accessed: {course.lastAccessed.toLocaleDateString()}
            </div>
            <div>
              Deadline: {course.deadline.toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};