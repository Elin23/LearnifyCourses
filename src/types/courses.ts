export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseCategory = | "Frontend"| "Backend"| "UI/UX"| "Mobile"| "Data Science"| "AI/ML"| "Cybersecurity"| "DevOps"
  | "Game Dev" | "Cloud"| "Business"| "Soft Skills";

export type CourseDay = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type CourseTopic = {
  title: string;
  durationMin?: number;
};

export type Instructor = {
  name: string;
  title?: string;
  avatarUrl?: string;
};

export type CourseBadges = {
  level?: CourseLevel;          
  language?: string;            
  certificate?: boolean;
  bestseller?: boolean;
  updated?: string;             
};

export type CoursePricing = {
  oldPrice?: number;            
  newPrice: number;            
  currency: "USD" | "EUR" | "AED";
};

export type CourseSchedule = {
  duration: string;             
  days: CourseDay[];            
  time: string;               
};

export type CourseMeta = {
  lessonsCount: number;        
  totalHours?: number;
  students?: number;
  rating?: number;
};

export type Course = {
  id: string;
  slug: string;

  title: string;                
  shortDescription: string;    
  fullDescription: string;      

  category: CourseCategory;     
  level: CourseLevel;          
  language: string;            

  instructor: Instructor;       
  schedule: CourseSchedule;     

  pricing: CoursePricing;      
  price?: number;               

  meta: CourseMeta;             
  topics?: CourseTopic[];       
  tags?: string[];              
  badges?: string[];            
};
