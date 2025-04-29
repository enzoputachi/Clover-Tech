import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { CourseCard, CourseForm } from "./CourseCard";
import { Course } from "./types";
import api from "@/api/api";

export const CourseManager = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([ ]);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  // Different states for adding and editing course
  const [newCourse, setNewCourse] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get<Course[]>('/api/v1/courses')
        setCourses(data)
        console.log(data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch courses"})
      }
    };
    fetchCourses();
  }, [toast])

  const handleEdit = (course: Course) => {
    setEditingCourse({...course});
    setEditingCourseId(course._id);
    console.log("course:", {...course});    
  };

  const handleSubmit = async (course: Course) => {
    if (!course.isNew) return;

    try {
      const { data: { course: newCourse } } = await api.post("/api/v1/courses", course);
      console.log("API data:", newCourse);

      // const newCourse = course
      setCourses((prev) => [...prev, newCourse]);
      // setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
      setNewCourse(null);
      toast({ title: "Course created", description: "New course created successfully."})
    } catch (error) {
      console.error("Error creating course:", error);
      toast({ title: "Error", description: "Failed to create course"})
    }
  }
 

  const handleSave = async (course: Course) => {
    if (!editingCourseId) return;
    const sanitizedOutline = course.outline.map(({outlineId, ...rest}) => rest);
    const sanitizedCourse = { ...course, outline: sanitizedOutline};

    try {     
      const { data: updatedCourse } = await api.patch(`/api/v1/courses/${course._id}`, sanitizedCourse);
      console.log("Updated course after sani:", updatedCourse);
      

      setCourses((prev) => prev.map((c) => (c._id === updatedCourse?._id ? updatedCourse : c)));
      setEditingCourse(null);
      setEditingCourseId(null);
      toast({ title: "Course updated", description: "Your changes have been saved successfully."})
    } catch (error) {
      console.log("Error Saving course:", error);      
      toast({ title: "Error", description: "Failed to update course"})
    }
  };

  const handleCancel = () => {
    setNewCourse(null);
    setEditingCourse(null);
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("confirm delete")

    
    try {
     if(confirmDelete) {
      await api.delete(`/api/v1/courses/${id}`)
      setCourses(courses.filter((c) => c._id !== id));
      toast({
        title: "Course deleted",
        description: "The course has been removed successfully.",
      });
     }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete course" });
    }
  };

  const handleAdd = async () => {
    const newCourse: Course = {
      title: "",
      description: "",
      price: undefined,
      duration: "",
      image: "",
      outline: [],
      isNew: true,
    };
    try {
    //  const { data } = await api.post("/api/v1/courses", newCourse)

      // setCourses([...courses, newCourse]);
      setNewCourse(newCourse);
    } catch (error) {
      console.error("Error adding course:", error);      
      toast({ title: "Error", description: "Failed to add course" });
    }
  };

  const handleAddOutlinePoint = async() => {
    try {

      const newPoint = {
        outlineId: Date.now().toString(),
        point: "",
      };
      console.log("New Ponit", newPoint);

      if(editingCourseId) {
        console.log("current courseid", editingCourseId);        
        const updatedCourse = { ...editingCourse, outline: [...editingCourse.outline, newPoint], };
        setEditingCourse(updatedCourse);
        setCourses((prev) => prev.map((c) => (c._id === updatedCourse._id ? updatedCourse: c)))
      } else if (newCourse) {
        const updatedCourse = { ...newCourse, outline: [...newCourse.outline, newPoint], };
        setNewCourse(updatedCourse)
      }
      
    } catch (error) {
      toast({ title: "Error", description: "Failed to add outline point" });
    }
  };

  const handleDeleteOutlinePoint = async (pointId: string) => {
    if (setEditingCourse) {
      const updatedCourse = {
        ...editingCourse,
        outline: editingCourse.outline.filter((p) => p._id !== pointId),
      };
      try {
        // await api.patch(`api/v1/courses/${editingCourse._id}`, updatedCourse)
        setEditingCourse(updatedCourse)
        setCourses((prev) => prev.map((c) => (c._id === updatedCourse._id ? updatedCourse : c)))
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

      {newCourse ? (
        <CourseForm
          course={newCourse}
          onCourseChange={setNewCourse}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onAddOutlinePoint={handleAddOutlinePoint}
          onDeleteOutlinePoint={handleDeleteOutlinePoint}
          layout="card"
        />
      ) : (
        <div className="grid gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={editingCourseId === course._id && editingCourse ? editingCourse : course}
            isEditing={editingCourseId === course._id}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={() => setEditingCourseId(null)}
            onDelete={handleDelete}
            onEditingCourseChange={setEditingCourse}
            onAddOutlinePoint={handleAddOutlinePoint}
            onDeleteOutlinePoint={handleDeleteOutlinePoint}
          />
        ))}
      </div>
      )}
    </div>
  );
};