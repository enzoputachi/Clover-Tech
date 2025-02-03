import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { Course } from "./types";
import api from "@/api/api";

export const CourseManager = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([ ]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get<Course[]>('/api/courses')
        setCourses(data)
        console.log(data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch courses"})
      }
    };
    fetchCourses();
  }, [])

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
  };


  const handleSave = async () => {
    if (editingCourse) {
      try {
        await api.patch(`/api/courses/${editingCourse.id}`, editingCourse);
        setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
        setEditingCourse(null);
        toast({ title: "Course updated", description: "Your changes have been saved successfully."})
      } catch (error) {
        toast({ title: "Error", description: "Failed to update course"})
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/courses/${id}`)
      setCourses(courses.filter((c) => c.id !== id));
      toast({
        title: "Course deleted",
        description: "The course has been removed successfully.",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete course" });
    }
  };

  const handleAdd = async () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: "New Course",
      description: "Course description",
      price: "$0",
      duration: "0 weeks",
      image: "",
      outline: [],
    };
    try {
      const { data } = await api.post("/api/courses", newCourse)
      setCourses([...courses, newCourse]);
      setEditingCourse(newCourse);
    } catch (error) {
      toast({ title: "Error", description: "Failed to add course" });
    }
  };

  const handleAddOutlinePoint = async() => {
    if (editingCourse) {
      const newPoint = {
        id: Date.now().toString(),
        point: "New point",
      };
      const updatedCourse = { ...editingCourse, outline: [...editingCourse.outline, newPoint], };
      try {
        await api.patch(`/api/courses/${editingCourse.id}`, updatedCourse)
        setEditingCourse(updatedCourse);
        setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse: c)))
      } catch (error) {
        toast({ title: "Error", description: "Failed to add outline point" });
      }
    }
  };

  const handleDeleteOutlinePoint = async (pointId: string) => {
    if (editingCourse) {
      const updatedCourse = {
        ...editingCourse,
        outline: editingCourse.outline.filter((p) => p.id !== pointId),
      };
      try {
        await api.patch(`api/courses/${editingCourse.id}`, updatedCourse)
        setEditingCourse(updatedCourse)
        setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)))
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete outline point" });
      }
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