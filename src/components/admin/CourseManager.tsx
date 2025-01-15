import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { Course } from "./types";

export const CourseManager = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Mobile Development",
      description: "Learn to build iOS and Android apps using React Native",
      price: "$599",
      salePrice: "$499",
      duration: "12 weeks",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      outline: [
        { id: "1", point: "Introduction to React Native" },
        { id: "2", point: "Building User Interfaces" },
      ],
    },
  ]);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
      setEditingCourse(null);
      toast({
        title: "Course updated",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    toast({
      title: "Course deleted",
      description: "The course has been removed successfully.",
    });
  };

  const handleAdd = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: "New Course",
      description: "Course description",
      price: "$0",
      duration: "0 weeks",
      image: "",
      outline: [],
    };
    setCourses([...courses, newCourse]);
    setEditingCourse(newCourse);
  };

  const handleAddOutlinePoint = () => {
    if (editingCourse) {
      const newPoint = {
        id: Date.now().toString(),
        point: "New point",
      };
      setEditingCourse({
        ...editingCourse,
        outline: [...editingCourse.outline, newPoint],
      });
    }
  };

  const handleDeleteOutlinePoint = (pointId: string) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        outline: editingCourse.outline.filter((p) => p.id !== pointId),
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            editingCourse={editingCourse}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            onEditingCourseChange={setEditingCourse}
            onAddOutlinePoint={handleAddOutlinePoint}
            onDeleteOutlinePoint={handleDeleteOutlinePoint}
          />
        ))}
      </div>
    </div>
  );
};