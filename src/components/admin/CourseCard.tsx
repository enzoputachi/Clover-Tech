import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Save, Trash2 } from "lucide-react";
import { Course, CourseOutline } from "./types";

interface CourseCardProps {
  course: Course;
  editingCourse: Course | null;
  onEdit: (course: Course) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onEditingCourseChange: (course: Course) => void;
  onAddOutlinePoint: () => void;
  onDeleteOutlinePoint: (pointId: string) => void;
}

export const CourseCard = ({
  course,
  editingCourse,
  onEdit,
  onSave,
  onDelete,
  onEditingCourseChange,
  onAddOutlinePoint,
  onDeleteOutlinePoint,
}: CourseCardProps) => {
  const isEditing = editingCourse?.id === course.id;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {isEditing ? (
            <Input
              value={editingCourse.title}
              onChange={(e) =>
                onEditingCourseChange({
                  ...editingCourse,
                  title: e.target.value,
                })
              }
              className="max-w-sm"
            />
          ) : (
            course.title
          )}
        </CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={onSave} variant="outline">
              <Save className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => onEdit(course)} variant="outline">
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          <Button onClick={() => onDelete(course.id)} variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <CourseEditForm
            editingCourse={editingCourse}
            onEditingCourseChange={onEditingCourseChange}
            onAddOutlinePoint={onAddOutlinePoint}
            onDeleteOutlinePoint={onDeleteOutlinePoint}
          />
        ) : (
          <CourseDisplay course={course} />
        )}
      </CardContent>
    </Card>
  );
};

const CourseEditForm = ({
  editingCourse,
  onEditingCourseChange,
  onAddOutlinePoint,
  onDeleteOutlinePoint,
}: {
  editingCourse: Course;
  onEditingCourseChange: (course: Course) => void;
  onAddOutlinePoint: () => void;
  onDeleteOutlinePoint: (pointId: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={editingCourse.description}
          onChange={(e) =>
            onEditingCourseChange({
              ...editingCourse,
              description: e.target.value,
            })
          }
          className="min-h-[100px]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Regular Price</label>
          <Input
            value={editingCourse.price}
            onChange={(e) =>
              onEditingCourseChange({
                ...editingCourse,
                price: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price</label>
          <Input
            value={editingCourse.salePrice || ""}
            onChange={(e) =>
              onEditingCourseChange({
                ...editingCourse,
                salePrice: e.target.value,
              })
            }
            placeholder="Optional sale price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <Input
            value={editingCourse.duration}
            onChange={(e) =>
              onEditingCourseChange({
                ...editingCourse,
                duration: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <Input
          value={editingCourse.image}
          onChange={(e) =>
            onEditingCourseChange({
              ...editingCourse,
              image: e.target.value,
            })
          }
        />
      </div>
      <CourseOutlineEditor
        outline={editingCourse.outline}
        onEditingCourseChange={onEditingCourseChange}
        editingCourse={editingCourse}
        onAddOutlinePoint={onAddOutlinePoint}
        onDeleteOutlinePoint={onDeleteOutlinePoint}
      />
    </div>
  );
};

const CourseDisplay = ({ course }: { course: Course }) => {
  return (
    <div>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{course.price}</span>
          {course.salePrice && (
            <span className="text-xl text-gray-400 line-through">
              {course.salePrice}
            </span>
          )}
        </div>
        <span className="text-gray-600">{course.duration}</span>
      </div>
      {course.image && (
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      )}
      {course.outline.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Course Outline:</h4>
          <ul className="list-disc list-inside">
            {course.outline.map((point) => (
              <li key={point.id}>{point.point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CourseOutlineEditor = ({
  outline,
  onEditingCourseChange,
  editingCourse,
  onAddOutlinePoint,
  onDeleteOutlinePoint,
}: {
  outline: CourseOutline[];
  onEditingCourseChange: (course: Course) => void;
  editingCourse: Course;
  onAddOutlinePoint: () => void;
  onDeleteOutlinePoint: (pointId: string) => void;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">Course Outline</label>
        <Button onClick={onAddOutlinePoint} variant="outline" size="sm">
          Add Point
        </Button>
      </div>
      {outline.map((point, index) => (
        <div key={point.id} className="flex gap-2 mb-2">
          <Input
            value={point.point}
            onChange={(e) => {
              const newOutline = [...outline];
              newOutline[index] = { ...point, point: e.target.value };
              onEditingCourseChange({
                ...editingCourse,
                outline: newOutline,
              });
            }}
          />
          <Button
            onClick={() => onDeleteOutlinePoint(point.id)}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};