import { purchasedCourseIds } from "../data/myCourses";

const KEY = "purchasedCourses";

export function getPurchasedCourseIds(): string[] {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
    } catch {
    }
  }
  return purchasedCourseIds; 
}

export function isCoursePurchased(courseId: string): boolean {
  return getPurchasedCourseIds().includes(courseId);
}

export function setPurchasedCourseIds(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}
