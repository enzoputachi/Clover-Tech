export interface CourseOutline {
  _id: string;
  point: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  salePrice?: string;
  duration: string;
  image: string;
  outline: CourseOutline[];
  isNew?: boolean;
}

export interface CourseFormProps {
  course: Course;
  onCourseChange: (course: Course) => void;
  onSave: (course: Course) => Promise<void>;
  onCancel: () => void;
  onAddOutlinePoint: () => void;
  onDeleteOutlinePoint: (pointId: string) => void;
  layout?: "default" | "card";
}

export interface CreateCourse {
  title: string;
  description: string;
  price: number;
  salePrice?: string;
  duration: string;
  image: string;
  outline: CourseOutline[];
}

export interface CourseCardProps {
  course: Course;
  isEditing: boolean;
  onEdit: (course: Course) => void;
  onSave: (course: Course) => Promise<void>;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onEditingCourseChange: (course: Course) => void;
  onAddOutlinePoint: () => void;
  onDeleteOutlinePoint: (pointId: string) => void;
}

// ######################################

export interface Section {
  id: string;
  title: string;
  content: string;
  type: "hero" | "services" | "testimonials" | "blog";
  imageUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  currentImageUrl?: string;
}

export interface Profile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}
