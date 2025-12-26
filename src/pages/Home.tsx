import AboutUs from "../sections/AboutUs";
import BestSellingCourses from "../sections/BestSellingCourses";
import ContactUs from "../sections/ContactUs";
import DynamicDomansDisplay from "../sections/DynamicDomansDisplay";
import FAQsSection from "../sections/FAQSection";
import Hero from "../sections/Hero";
import TestimonialsSection from "../sections/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <Hero/>
      <AboutUs/>
      <DynamicDomansDisplay items={["UI/UX Design","Web Development","Mobile Development","Data Science","Cyber Security","AI & Machine Learning","DevOps","Game Development","Cloud Computing",]}/>
      <BestSellingCourses/>
      <TestimonialsSection/>
      <FAQsSection/>
      <ContactUs/>
    </div>
  )
}
