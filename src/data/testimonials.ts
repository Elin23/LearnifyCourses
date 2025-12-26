import test1 from "../assets/imgs/testimonials/test-1.jpg"
import test2 from "../assets/imgs/testimonials/test-2.jpg"
import test3 from "../assets/imgs/testimonials/test-3.jpg"
import test4 from "../assets/imgs/testimonials/test-4.jpg"
import test5 from "../assets/imgs/testimonials/test-5.jpg"
import test6 from "../assets/imgs/testimonials/test-6.jpg"


export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  quote: string;
  avatar?: string; 
  course?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Lina Ahmed",
    role: "Front-end Developer",
    company: "Freelance",
    rating: 5,
    quote:
      "The course content was super clear and practical. I built a real project and finally understood state management properly.",
    course: "React Essentials",
    avatar: test6,
  },
  {
    id: "t2",
    name: "Omar Saeed",
    role: "CS Student",
    company: "University",
    rating: 5,
    quote:
      "Loved the pacing and the examples. The exercises felt like real work tasks — not just theory.",
    course: "JavaScript Mastery",
    avatar: test2,
  },
  {
    id: "t3",
    name: "Sara Noor",
    role: "UI/UX Designer",
    company: "Studio",
    rating: 4,
    quote:
      "Great structure and the instructor feedback was on point. I could collaborate better with devs after this.",
    course: "Web Foundations",
    avatar: test3,
  },
  {
    id: "t4",
    name: "Hadi Khalil",
    role: "Junior Developer",
    rating: 5,
    quote:
      "The projects are really well designed. I used what I learned directly in my internship.",
    course: "TypeScript Bootcamp",
    avatar: test1,
  },
  {
    id: "t5",
    name: "Maya Salim",
    role: "Product Intern",
    rating: 4,
    quote:
      "Clean explanations and strong roadmap. The checklist style lessons helped me stay consistent.",
    course: "HTML/CSS Pro",
    avatar: test4,
  },
  {
    id: "t6",
    name: "Kareem Ali",
    role: "Backend Dev (Transitioning)",
    rating: 5,
    quote:
      "Best investment I made this year. I finally feel confident building modern UIs with reusable components.",
    course: "Modern Frontend",
    avatar: test5,
  },
];
