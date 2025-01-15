export interface CourseOutline {
  id: string;
  point: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  salePrice?: string;
  duration: string;
  image: string;
  outline: CourseOutline[];
}