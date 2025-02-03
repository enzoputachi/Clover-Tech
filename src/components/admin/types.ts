export interface CourseOutline {
  id: string;
  point: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: string;
  duration: string;
  image: string;
  outline: CourseOutline[];
}