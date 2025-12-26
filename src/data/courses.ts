import type { Course } from "../types/courses";

export const courses: Course[] = [
  {
    id: "c-fe-01",
    slug: "html-css-foundations",
    title: "HTML & CSS Foundations",
    shortDescription: "Build responsive pages with modern HTML5 and CSS3.",
    fullDescription:
      "Start from zero and learn semantic HTML, Flexbox, Grid, and responsive layouts. You’ll build multiple landing pages and a small portfolio.",
    category: "Frontend",
    level: "Beginner",
    language: "English",
    instructor: { name: "Nour Alami", title: "Front-End Engineer" },
    schedule: { duration: "4 Weeks", days: ["Sun", "Tue"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 99, newPrice: 49, currency: "USD" },
    meta: { lessonsCount: 16, totalHours: 12, students: 9800, rating: 4.7 },
    tags: ["HTML", "CSS", "Responsive"],
    badges: ["Projects", "Certificate"],
    topics: [
      { title: "Semantic HTML", durationMin: 45 },
      { title: "Flexbox & Grid", durationMin: 60 },
      { title: "Responsive Design", durationMin: 55 },
    ],
  },
  {
    id: "c-fe-02",
    slug: "javascript-core",
    title: "JavaScript Core",
    shortDescription: "Master JS fundamentals, DOM, and modern syntax.",
    fullDescription:
      "Learn variables, functions, objects, arrays, async basics, DOM manipulation, and write clean reusable code with practical exercises.",
    category: "Frontend",
    level: "Beginner",
    language: "English",
    instructor: { name: "Omar Al-Khatib", title: "Full-Stack Engineer" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Wed"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 139, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 22, totalHours: 18, students: 15400, rating: 4.8 },
    tags: ["JavaScript", "DOM", "ES6+"],
    badges: ["Best Seller", "Projects"],
  },
  {
    id: "c-fe-03",
    slug: "react-from-zero-to-hero",
    title: "React: From Zero to Hero",
    shortDescription: "Build modern SPAs with React, hooks, and routing.",
    fullDescription:
      "Create reusable components, manage state, handle forms, routing, and connect to APIs. Includes 2 real projects and deployment.",
    category: "Frontend",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Lina Haddad", title: "Senior Product Designer" },
    schedule: { duration: "6 Weeks", days: ["Sun", "Thu"], time: "18:00 - 20:30" },
    pricing: { oldPrice: 179, newPrice: 99, currency: "USD" },
    meta: { lessonsCount: 26, totalHours: 24, students: 21100, rating: 4.7 },
    tags: ["React", "Hooks", "SPA"],
    badges: ["Best Seller", "Certificate"],
  },
  {
    id: "c-fe-04",
    slug: "typescript-for-frontend",
    title: "TypeScript for Front-End",
    shortDescription: "Type your React apps and avoid runtime bugs.",
    fullDescription:
      "Understand TS types, interfaces, generics, narrowing, and apply it to React components, props, and API data models.",
    category: "Frontend",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Rami Saad", title: "Software Engineer" },
    schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 149, newPrice: 89, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 14, students: 8700, rating: 4.6 },
    tags: ["TypeScript", "React"],
  },
  {
    id: "c-fe-05",
    slug: "nextjs-in-practice",
    title: "Next.js in Practice",
    shortDescription: "SSR/SSG, routing, and production-ready React apps.",
    fullDescription:
      "Build SEO-friendly apps with Next.js, data fetching, app structure, and deployment workflows. Includes a blog + dashboard project.",
    category: "Frontend",
    level: "Advanced",
    language: "English",
    instructor: { name: "Hassan Jaber", title: "Lead Front-End Engineer" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Wed"], time: "18:30 - 21:00" },
    pricing: { oldPrice: 199, newPrice: 119, currency: "USD" },
    meta: { lessonsCount: 20, totalHours: 20, students: 6400, rating: 4.6 },
    tags: ["Next.js", "SSR", "SEO"],
  },

  // ---------- Backend ----------
  {
    id: "c-be-01",
    slug: "nodejs-express-api",
    title: "Node.js & Express APIs",
    shortDescription: "Design REST APIs with Express and best practices.",
    fullDescription:
      "Routing, middleware, auth basics, validation, error handling, and clean project structure. Build a complete REST API.",
    category: "Backend",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Yara Mansour", title: "Back-End Engineer" },
    schedule: { duration: "6 Weeks", days: ["Sun", "Tue"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 189, newPrice: 109, currency: "USD" },
    meta: { lessonsCount: 24, totalHours: 22, students: 12050, rating: 4.7 },
    tags: ["Node.js", "Express", "REST"],
    badges: ["Projects", "Certificate"],
  },
  {
    id: "c-be-02",
    slug: "database-sql-essentials",
    title: "SQL Essentials",
    shortDescription: "Query, join, and model relational databases.",
    fullDescription:
      "Learn relational modeling, normalization, joins, indexing basics, and write fast queries for real-world datasets.",
    category: "Backend",
    level: "Beginner",
    language: "English",
    instructor: { name: "Majd Tarek", title: "Data Engineer" },
    schedule: { duration: "4 Weeks", days: ["Mon", "Thu"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 119, newPrice: 59, currency: "USD" },
    meta: { lessonsCount: 16, totalHours: 12, students: 14300, rating: 4.8 },
    tags: ["SQL", "Database"],
    badges: ["Best Seller"],
  },
  {
    id: "c-be-03",
    slug: "django-rest-framework",
    title: "Django REST Framework",
    shortDescription: "Build secure REST APIs with Django.",
    fullDescription:
      "Serializers, viewsets, permissions, JWT, and testing. Build an API for an e-commerce backend with admin tools.",
    category: "Backend",
    level: "Advanced",
    language: "English",
    instructor: { name: "Khaled R.", title: "Python Developer" },
    schedule: { duration: "6 Weeks", days: ["Tue", "Thu"], time: "19:30 - 22:00" },
    pricing: { oldPrice: 219, newPrice: 129, currency: "USD" },
    meta: { lessonsCount: 24, totalHours: 26, students: 5200, rating: 4.6 },
    tags: ["Django", "REST", "Python"],
  },
  {
    id: "c-be-04",
    slug: "spring-boot-fundamentals",
    title: "Spring Boot Fundamentals",
    shortDescription: "Create robust Java backends with Spring Boot.",
    fullDescription:
      "Controllers, services, JPA, validation, security intro, and clean architecture. Includes a complete API project.",
    category: "Backend",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Mina George", title: "Java Engineer" },
    schedule: { duration: "7 Weeks", days: ["Sun", "Wed"], time: "18:00 - 20:30" },
    pricing: { oldPrice: 239, newPrice: 139, currency: "USD" },
    meta: { lessonsCount: 28, totalHours: 28, students: 4800, rating: 4.5 },
    tags: ["Java", "Spring Boot"],
  },
  {
    id: "c-be-05",
    slug: "graphql-for-apis",
    title: "GraphQL for Modern APIs",
    shortDescription: "Design GraphQL schemas and integrate with clients.",
    fullDescription:
      "Learn schemas, resolvers, pagination, auth patterns, and how to integrate GraphQL with React clients.",
    category: "Backend",
    level: "Advanced",
    language: "English",
    instructor: { name: "Samir N.", title: "API Architect" },
    schedule: { duration: "4 Weeks", days: ["Mon", "Thu"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 169, newPrice: 99, currency: "USD" },
    meta: { lessonsCount: 16, totalHours: 14, students: 3100, rating: 4.6 },
    tags: ["GraphQL", "APIs"],
  },

  // ---------- UI/UX ----------
  {
    id: "c-ux-01",
    slug: "uiux-masterclass",
    title: "UI/UX Masterclass",
    shortDescription: "Design modern interfaces and ship polished prototypes.",
    fullDescription:
      "UX research basics, user flows, wireframes, UI kits, design systems, and advanced prototyping in Figma with a portfolio case study.",
    category: "UI/UX",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Lina Haddad", title: "Senior Product Designer" },
    schedule: { duration: "6 Weeks", days: ["Sun", "Tue"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 129, newPrice: 69, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 12, students: 12450, rating: 4.8 },
    tags: ["UI", "UX", "Figma"],
    badges: ["Best Seller", "Certificate"],
  },
  {
    id: "c-ux-02",
    slug: "figma-for-beginners",
    title: "Figma for Beginners",
    shortDescription: "Learn Figma tools and create your first design file.",
    fullDescription:
      "Frames, components, auto-layout, styles, and exporting assets. You’ll rebuild a real app screen from scratch.",
    category: "UI/UX",
    level: "Beginner",
    language: "English",
    instructor: { name: "Rana Ali", title: "UI Designer" },
    schedule: { duration: "3 Weeks", days: ["Mon", "Wed"], time: "18:30 - 20:30" },
    pricing: { oldPrice: 89, newPrice: 39, currency: "USD" },
    meta: { lessonsCount: 12, totalHours: 8, students: 9000, rating: 4.7 },
    tags: ["Figma", "UI"],
  },
  {
    id: "c-ux-03",
    slug: "ux-research-basics",
    title: "UX Research Basics",
    shortDescription: "Interview users, synthesize insights, and validate ideas.",
    fullDescription:
      "Learn qualitative methods, surveys, usability testing, and how to turn findings into actionable design improvements.",
    category: "UI/UX",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Dalia Noor", title: "UX Researcher" },
    schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 149, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 14, totalHours: 10, students: 4100, rating: 4.6 },
    tags: ["UX", "Research"],
  },
  {
    id: "c-ux-04",
    slug: "design-systems-in-figma",
    title: "Design Systems in Figma",
    shortDescription: "Build scalable UI libraries and component standards.",
    fullDescription:
      "Tokens, typography scales, color systems, components, variants, and documentation patterns used in real product teams.",
    category: "UI/UX",
    level: "Advanced",
    language: "English",
    instructor: { name: "Hala M.", title: "Design Systems Lead" },
    schedule: { duration: "5 Weeks", days: ["Sun", "Wed"], time: "18:00 - 20:30" },
    pricing: { oldPrice: 199, newPrice: 119, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 16, students: 2500, rating: 4.7 },
    tags: ["Design System", "Figma"],
  },
  {
    id: "c-ux-05",
    slug: "portfolio-for-designers",
    title: "Portfolio for Designers",
    shortDescription: "Craft case studies and present your work confidently.",
    fullDescription:
      "Learn storytelling, structure, visuals, and how to present UX decisions clearly. End with a polished portfolio project.",
    category: "UI/UX",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Maya K.", title: "Product Designer" },
    schedule: { duration: "3 Weeks", days: ["Mon", "Thu"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 109, newPrice: 59, currency: "USD" },
    meta: { lessonsCount: 10, totalHours: 8, students: 3600, rating: 4.6 },
    tags: ["Portfolio", "Case Study"],
  },

  // ---------- Mobile ----------
  {
    id: "c-mob-01",
    slug: "flutter-starter",
    title: "Flutter Starter",
    shortDescription: "Build cross-platform apps with Flutter and Dart.",
    fullDescription:
      "Widgets, layouts, navigation, state basics, and consuming APIs. Build 2 apps: To-Do + Shop UI.",
    category: "Mobile",
    level: "Beginner",
    language: "English",
    instructor: { name: "Sara Nasser", title: "Mobile Developer" },
    schedule: { duration: "6 Weeks", days: ["Sun", "Tue"], time: "18:30 - 20:30" },
    pricing: { oldPrice: 169, newPrice: 89, currency: "USD" },
    meta: { lessonsCount: 20, totalHours: 18, students: 7800, rating: 4.6 },
    tags: ["Flutter", "Dart"],
  },
  {
    id: "c-mob-02",
    slug: "react-native-in-action",
    title: "React Native in Action",
    shortDescription: "Ship mobile apps using React Native and Expo.",
    fullDescription:
      "Build screens, handle navigation, forms, API calls, and device features. End with a publish-ready app.",
    category: "Mobile",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Adel F.", title: "Mobile Engineer" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Wed"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 189, newPrice: 109, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 16, students: 5200, rating: 4.5 },
    tags: ["React Native", "Expo"],
  },
  {
    id: "c-mob-03",
    slug: "android-kotlin-basics",
    title: "Android Kotlin Basics",
    shortDescription: "Start Android development with Kotlin and Jetpack.",
    fullDescription:
      "Activities, fragments basics, Jetpack intro, RecyclerView, and networking intro. Build a news app prototype.",
    category: "Mobile",
    level: "Beginner",
    language: "English",
    instructor: { name: "Tariq B.", title: "Android Developer" },
    schedule: { duration: "6 Weeks", days: ["Tue", "Thu"], time: "18:00 - 20:30" },
    pricing: { oldPrice: 199, newPrice: 119, currency: "USD" },
    meta: { lessonsCount: 22, totalHours: 20, students: 4100, rating: 4.6 },
    tags: ["Android", "Kotlin"],
  },
  {
    id: "c-mob-04",
    slug: "ios-swiftui-fundamentals",
    title: "iOS SwiftUI Fundamentals",
    shortDescription: "Build iOS UIs with SwiftUI and modern patterns.",
    fullDescription:
      "Layouts, state, lists, navigation, and a small capstone app with local data storage basics.",
    category: "Mobile",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Lara S.", title: "iOS Developer" },
    schedule: { duration: "5 Weeks", days: ["Sun", "Wed"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 209, newPrice: 129, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 16, students: 2600, rating: 4.5 },
    tags: ["iOS", "SwiftUI"],
  },

  // ---------- Data Science ----------
  {
    id: "c-ds-01",
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    shortDescription: "Analyze data using Python, pandas, and NumPy.",
    fullDescription:
      "Clean datasets, transform tables, handle missing values, and produce insights with practical exercises.",
    category: "Data Science",
    level: "Beginner",
    language: "English",
    instructor: { name: "Majd Tarek", title: "Data Engineer" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Thu"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 159, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 20, totalHours: 18, students: 13200, rating: 4.7 },
    tags: ["Python", "Pandas", "NumPy"],
  },
  {
    id: "c-ds-02",
    slug: "data-visualization-with-matplotlib",
    title: "Data Visualization with Matplotlib",
    shortDescription: "Turn data into clear charts and dashboards.",
    fullDescription:
      "Learn chart types, styling essentials, and how to communicate insights effectively using Python plotting.",
    category: "Data Science",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Sami L.", title: "Data Analyst" },
    schedule: { duration: "3 Weeks", days: ["Tue", "Thu"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 109, newPrice: 59, currency: "USD" },
    meta: { lessonsCount: 12, totalHours: 10, students: 3900, rating: 4.6 },
    tags: ["Visualization", "Matplotlib"],
  },
  {
    id: "c-ds-03",
    slug: "statistics-for-tech",
    title: "Statistics for Tech",
    shortDescription: "Probability, distributions, and hypothesis testing.",
    fullDescription:
      "Build intuition for stats, confidence intervals, A/B testing basics, and how to interpret results correctly.",
    category: "Data Science",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Dina H.", title: "Data Scientist" },
    schedule: { duration: "4 Weeks", days: ["Sun", "Wed"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 149, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 14, totalHours: 12, students: 5100, rating: 4.7 },
    tags: ["Statistics", "A/B Testing"],
  },

  // ---------- AI/ML ----------
  {
    id: "c-ml-01",
    slug: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    shortDescription: "Learn supervised ML with real examples.",
    fullDescription:
      "Regression, classification, evaluation metrics, feature engineering basics, and a mini project with scikit-learn.",
    category: "AI/ML",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Dina H.", title: "Data Scientist" },
    schedule: { duration: "6 Weeks", days: ["Mon", "Thu"], time: "19:00 - 21:30" },
    pricing: { oldPrice: 249, newPrice: 149, currency: "USD" },
    meta: { lessonsCount: 24, totalHours: 24, students: 6100, rating: 4.6 },
    tags: ["ML", "scikit-learn"],
  },
  {
    id: "c-ml-02",
    slug: "deep-learning-with-pytorch",
    title: "Deep Learning with PyTorch",
    shortDescription: "Neural networks, training loops, and modern workflows.",
    fullDescription:
      "Build and train models using PyTorch, understand backprop, regularization, and ship a small vision model project.",
    category: "AI/ML",
    level: "Advanced",
    language: "English",
    instructor: { name: "Fadi A.", title: "ML Engineer" },
    schedule: { duration: "7 Weeks", days: ["Sun", "Tue"], time: "18:00 - 21:00" },
    pricing: { oldPrice: 299, newPrice: 189, currency: "USD" },
    meta: { lessonsCount: 26, totalHours: 28, students: 2800, rating: 4.6 },
    tags: ["Deep Learning", "PyTorch"],
  },
  {
    id: "c-ml-03",
    slug: "nlp-foundations",
    title: "NLP Foundations",
    shortDescription: "Text preprocessing, embeddings, and classifiers.",
    fullDescription:
      "Tokenization, vectorization, embeddings, and practical NLP pipelines with evaluation and error analysis.",
    category: "AI/ML",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Rasha M.", title: "AI Specialist" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Wed"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 229, newPrice: 139, currency: "USD" },
    meta: { lessonsCount: 20, totalHours: 18, students: 3000, rating: 4.5 },
    tags: ["NLP", "Embeddings"],
  },

  // ---------- Cybersecurity ----------
  {
    id: "c-sec-01",
    slug: "cybersecurity-basics",
    title: "Cybersecurity Basics",
    shortDescription: "Understand threats, defenses, and security mindset.",
    fullDescription:
      "Security fundamentals, common vulnerabilities, authentication basics, and how to think like a defender.",
    category: "Cybersecurity",
    level: "Beginner",
    language: "English",
    instructor: { name: "Ibrahim S.", title: "Security Analyst" },
    schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "18:30 - 20:30" },
    pricing: { oldPrice: 139, newPrice: 69, currency: "USD" },
    meta: { lessonsCount: 14, totalHours: 10, students: 6200, rating: 4.6 },
    tags: ["Security", "Basics"],
  },
  {
    id: "c-sec-02",
    slug: "web-security-owasp-top10",
    title: "Web Security: OWASP Top 10",
    shortDescription: "Learn the most critical web app risks and mitigations.",
    fullDescription:
      "Covers OWASP Top 10 categories with hands-on demos and secure coding practices for modern web apps.",
    category: "Cybersecurity",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Ibrahim S.", title: "Security Analyst" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Thu"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 189, newPrice: 109, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 16, students: 3400, rating: 4.6 },
    tags: ["OWASP", "Web Security"],
  },

  // ---------- DevOps ----------
  {
    id: "c-devops-01",
    slug: "docker-for-developers",
    title: "Docker for Developers",
    shortDescription: "Containerize apps and build portable environments.",
    fullDescription:
      "Images, containers, volumes, networks, docker-compose, and best practices. End with a multi-service setup.",
    category: "DevOps",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Bilal K.", title: "DevOps Engineer" },
    schedule: { duration: "3 Weeks", days: ["Sun", "Wed"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 149, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 12, totalHours: 10, students: 7100, rating: 4.7 },
    tags: ["Docker", "Containers"],
  },
  {
    id: "c-devops-02",
    slug: "ci-cd-with-github-actions",
    title: "CI/CD with GitHub Actions",
    shortDescription: "Automate testing and deployments.",
    fullDescription:
      "Build pipelines, run tests, linting, build artifacts, and deploy workflows using GitHub Actions in real projects.",
    category: "DevOps",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Bilal K.", title: "DevOps Engineer" },
    schedule: { duration: "3 Weeks", days: ["Tue", "Thu"], time: "19:30 - 21:30" },
    pricing: { oldPrice: 139, newPrice: 69, currency: "USD" },
    meta: { lessonsCount: 10, totalHours: 8, students: 3800, rating: 4.6 },
    tags: ["CI/CD", "GitHub Actions"],
  },
  {
    id: "c-devops-03",
    slug: "kubernetes-starter",
    title: "Kubernetes Starter",
    shortDescription: "Orchestrate containers at scale.",
    fullDescription:
      "Pods, deployments, services, configmaps, and basic troubleshooting. Includes deploying a small app stack.",
    category: "DevOps",
    level: "Advanced",
    language: "English",
    instructor: { name: "Salem N.", title: "Platform Engineer" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Wed"], time: "18:00 - 21:00" },
    pricing: { oldPrice: 269, newPrice: 169, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 18, students: 2100, rating: 4.5 },
    tags: ["Kubernetes", "K8s"],
  },

  // ---------- Cloud ----------
  {
    id: "c-cloud-01",
    slug: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Prep",
    shortDescription: "Understand AWS basics, services, and cloud concepts.",
    fullDescription:
      "Core cloud concepts, IAM intro, compute, storage, databases, and practical labs to build confidence.",
    category: "Cloud",
    level: "Beginner",
    language: "English",
    instructor: { name: "Salem N.", title: "Platform Engineer" },
    schedule: { duration: "4 Weeks", days: ["Sun", "Tue"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 179, newPrice: 99, currency: "USD" },
    meta: { lessonsCount: 16, totalHours: 14, students: 4600, rating: 4.6 },
    tags: ["AWS", "Cloud"],
  },
  {
    id: "c-cloud-02",
    slug: "cloud-native-foundations",
    title: "Cloud-Native Foundations",
    shortDescription: "Microservices, observability, and cloud-native patterns.",
    fullDescription:
      "Learn the mindset behind cloud-native systems: scalability, resilience, monitoring, logging, and deployment strategies.",
    category: "Cloud",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Nadia Z.", title: "Cloud Architect" },
    schedule: { duration: "5 Weeks", days: ["Mon", "Thu"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 229, newPrice: 139, currency: "USD" },
    meta: { lessonsCount: 18, totalHours: 16, students: 1900, rating: 4.5 },
    tags: ["Cloud Native", "Microservices"],
  },

  // ---------- Game Dev ----------
  {
    id: "c-game-01",
    slug: "unity-3d-beginner",
    title: "Unity 3D Beginner",
    shortDescription: "Build your first 3D game with Unity.",
    fullDescription:
      "Scenes, prefabs, physics, scripting basics, and a small 3D runner project with scoring and UI.",
    category: "Game Dev",
    level: "Beginner",
    language: "English",
    instructor: { name: "Faris H.", title: "Game Developer" },
    schedule: { duration: "6 Weeks", days: ["Sun", "Wed"], time: "18:30 - 21:00" },
    pricing: { oldPrice: 199, newPrice: 119, currency: "USD" },
    meta: { lessonsCount: 22, totalHours: 22, students: 5200, rating: 4.6 },
    tags: ["Unity", "3D"],
  },
  {
    id: "c-game-02",
    slug: "game-design-fundamentals",
    title: "Game Design Fundamentals",
    shortDescription: "Learn core principles behind fun, balance, and loops.",
    fullDescription:
      "Mechanics, dynamics, progression, feedback loops, economy basics, and building a small design document.",
    category: "Game Dev",
    level: "Intermediate",
    language: "English",
    instructor: { name: "Faris H.", title: "Game Developer" },
    schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "20:00 - 22:00" },
    pricing: { oldPrice: 149, newPrice: 89, currency: "USD" },
    meta: { lessonsCount: 14, totalHours: 12, students: 2100, rating: 4.5 },
    tags: ["Game Design", "Loops"],
  },

  // ---------- Business ----------
  {
    id: "c-biz-01",
    slug: "product-management-basics",
    title: "Product Management Basics",
    shortDescription: "Learn product thinking from idea to roadmap.",
    fullDescription:
      "User problems, MVP, prioritization, roadmaps, metrics, and stakeholder communication with practical templates.",
    category: "Business",
    level: "Beginner",
    language: "English",
    instructor: { name: "Hiba A.", title: "Product Manager" },
    schedule: { duration: "4 Weeks", days: ["Mon", "Wed"], time: "18:00 - 20:00" },
    pricing: { oldPrice: 159, newPrice: 79, currency: "USD" },
    meta: { lessonsCount: 12, totalHours: 10, students: 2700, rating: 4.6 },
    tags: ["Product", "Roadmap"],
  },
  {
    id: "c-biz-02",
    slug: "startup-101",
    title: "Startup 101",
    shortDescription: "Validate ideas and build a simple go-to-market plan.",
    fullDescription:
      "Idea validation, customer discovery, basic pricing, and a lightweight launch plan you can execute.",
    category: "Business",
    level: "Beginner",
    language: "English",
    instructor: { name: "Hiba A.", title: "Product Manager" },
    schedule: { duration: "3 Weeks", days: ["Sun", "Tue"], time: "19:00 - 21:00" },
    pricing: { oldPrice: 129, newPrice: 59, currency: "USD" },
    meta: { lessonsCount: 10, totalHours: 8, students: 1800, rating: 4.5 },
    tags: ["Startup", "Validation"],
  },

  // ---------- Soft Skills ----------
  {
    id: "c-soft-01",
    slug: "communication-for-engineers",
    title: "Communication for Engineers",
    shortDescription: "Write, speak, and collaborate effectively.",
    fullDescription:
      "Standups, feedback, documenting decisions, and presenting technical ideas clearly to non-technical audiences.",
    category: "Soft Skills",
    level: "Beginner",
    language: "English",
    instructor: { name: "Mariam S.", title: "Career Coach" },
    schedule: { duration: "2 Weeks", days: ["Mon", "Thu"], time: "20:00 - 21:30" },
    pricing: { oldPrice: 79, newPrice: 29, currency: "USD" },
    meta: { lessonsCount: 8, totalHours: 6, students: 3400, rating: 4.7 },
    tags: ["Communication", "Teamwork"],
  },


  // Frontend (6..12)
  ...Array.from({ length: 7 }).map((_, i) => {
    const n = i + 6;
    return {
      id: `c-fe-${String(n).padStart(2, "0")}`,
      slug: `frontend-course-${n}`,
      title: [
        "CSS Animations & Micro-Interactions",
        "Tailwind CSS: Rapid UI",
        "Advanced DOM & Performance",
        "React Forms & Validation",
        "Redux Toolkit Essentials",
        "Testing React with Vitest",
        "Accessibility for Web Apps",
      ][i],
      shortDescription: "Upgrade your front-end workflow with practical projects.",
      fullDescription:
        "Hands-on course focusing on real UI patterns, maintainable architecture, and production-minded best practices.",
      category: "Frontend",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: ["Nour Alami", "Rami Saad", "Hassan Jaber"][i % 3], title: "Front-End Engineer" },
      schedule: {
        duration: ["3 Weeks", "4 Weeks", "5 Weeks"][i % 3],
        days: (i % 2 === 0 ? (["Sun", "Wed"] as const) : (["Tue", "Thu"] as const)) as any,
        time: i % 2 === 0 ? "18:00 - 20:00" : "20:00 - 22:00",
      },
      pricing: { oldPrice: 149, newPrice: 79, currency: "USD" },
      meta: { lessonsCount: 12 + i, totalHours: 10 + i, students: 2000 + i * 600, rating: 4.5 + (i % 3) * 0.1 },
      tags: ["Frontend", "Projects"],
      badges: i % 2 === 0 ? ["Certificate"] : ["Projects"],
    } satisfies Course;
  }),

  // Backend (6..11)
  ...Array.from({ length: 6 }).map((_, i) => {
    const n = i + 6;
    return {
      id: `c-be-${String(n).padStart(2, "0")}`,
      slug: `backend-course-${n}`,
      title: [
        "API Authentication (JWT & Sessions)",
        "MongoDB for Developers",
        "Clean Architecture for Back-End",
        "Caching with Redis",
        "Microservices Fundamentals",
        "Testing APIs (Unit + Integration)",
      ][i],
      shortDescription: "Build reliable back-ends with real patterns.",
      fullDescription:
        "Focus on production patterns: security, data modeling, performance, and testing with practical exercises.",
      category: "Backend",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[(i + 1) % 3],
      language: "English",
      instructor: { name: ["Yara Mansour", "Samir N.", "Mina George"][i % 3], title: "Back-End Engineer" },
      schedule: {
        duration: ["4 Weeks", "5 Weeks", "6 Weeks"][i % 3],
        days: (i % 2 === 0 ? (["Mon", "Thu"] as const) : (["Sun", "Tue"] as const)) as any,
        time: i % 2 === 0 ? "19:00 - 21:00" : "18:30 - 20:30",
      },
      pricing: { oldPrice: 199, newPrice: 109, currency: "USD" },
      meta: { lessonsCount: 16 + i, totalHours: 14 + i, students: 1500 + i * 500, rating: 4.5 + (i % 2) * 0.1 },
      tags: ["Backend", "API"],
      badges: ["Projects"],
    } satisfies Course;
  }),

  // UI/UX (6..10)
  ...Array.from({ length: 5 }).map((_, i) => {
    const n = i + 6;
    return {
      id: `c-ux-${String(n).padStart(2, "0")}`,
      slug: `uiux-course-${n}`,
      title: [
        "Mobile UI Patterns",
        "UX Writing Essentials",
        "Design Handoff for Developers",
        "Interaction Design Advanced",
        "Usability Testing Workshop",
      ][i],
      shortDescription: "Design better products with modern UX workflows.",
      fullDescription:
        "Practical UX workflows: patterns, accessibility, handoff, and polishing your design decisions with real examples.",
      category: "UI/UX",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: ["Rana Ali", "Maya K.", "Hala M."][i % 3], title: "Product Designer" },
      schedule: {
        duration: ["3 Weeks", "4 Weeks", "5 Weeks"][i % 3],
        days: (i % 2 === 0 ? (["Sun", "Tue"] as const) : (["Mon", "Wed"] as const)) as any,
        time: "18:00 - 20:00",
      },
      pricing: { oldPrice: 139, newPrice: 69, currency: "USD" },
      meta: { lessonsCount: 10 + i, totalHours: 8 + i, students: 1200 + i * 400, rating: 4.6 },
      tags: ["UX", "UI"],
      badges: ["Certificate"],
    } satisfies Course;
  }),

  // Mobile (5..8)
  ...Array.from({ length: 4 }).map((_, i) => {
    const n = i + 5;
    return {
      id: `c-mob-${String(n).padStart(2, "0")}`,
      slug: `mobile-course-${n}`,
      title: ["State Management for Flutter", "React Native Navigation", "Android Jetpack Compose", "iOS Networking"][i],
      shortDescription: "Level up your mobile development skills.",
      fullDescription:
        "Hands-on mobile course covering navigation, state, networking, and structuring apps for maintainability.",
      category: "Mobile",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[(i + 1) % 3],
      language: "English",
      instructor: { name: ["Sara Nasser", "Adel F.", "Tariq B."][i % 3], title: "Mobile Developer" },
      schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "19:00 - 21:00" },
      pricing: { oldPrice: 179, newPrice: 99, currency: "USD" },
      meta: { lessonsCount: 14 + i, totalHours: 12 + i, students: 900 + i * 350, rating: 4.5 + i * 0.05 },
      tags: ["Mobile"],
      badges: ["Projects"],
    } satisfies Course;
  }),

  // Data Science (4..8)
  ...Array.from({ length: 5 }).map((_, i) => {
    const n = i + 4;
    return {
      id: `c-ds-${String(n).padStart(2, "0")}`,
      slug: `data-science-course-${n}`,
      title: [
        "Pandas: Cleaning & Wrangling",
        "EDA: Exploratory Data Analysis",
        "Time Series Basics",
        "Data Storytelling",
        "Excel for Analysts (Fast Track)",
      ][i],
      shortDescription: "Analyze data and present insights confidently.",
      fullDescription:
        "You’ll work with realistic datasets, clean/transform data, and practice turning numbers into decisions.",
      category: "Data Science",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: ["Sami L.", "Majd Tarek", "Dina H."][i % 3], title: "Data Specialist" },
      schedule: { duration: "4 Weeks", days: ["Mon", "Thu"], time: "18:00 - 20:00" },
      pricing: { oldPrice: 159, newPrice: 79, currency: "USD" },
      meta: { lessonsCount: 12 + i, totalHours: 10 + i, students: 1400 + i * 500, rating: 4.6 },
      tags: ["Data", "Analysis"],
      badges: ["Certificate"],
    } satisfies Course;
  }),

  ...Array.from({ length: 5 }).map((_, i) => {
    const n = i + 4;
    return {
      id: `c-ml-${String(n).padStart(2, "0")}`,
      slug: `ml-course-${n}`,
      title: ["Model Evaluation & Metrics", "Feature Engineering", "ML Pipelines", "Computer Vision Basics", "Recommendation Systems"][i],
      shortDescription: "Practical ML skills you can apply immediately.",
      fullDescription:
        "Learn key ML workflows: data prep, training, evaluation, and improving performance with real mini-projects.",
      category: "AI/ML",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[(i + 1) % 3],
      language: "English",
      instructor: { name: ["Fadi A.", "Rasha M.", "Dina H."][i % 3], title: "ML Engineer" },
      schedule: { duration: "5 Weeks", days: ["Sun", "Wed"], time: "19:00 - 21:30" },
      pricing: { oldPrice: 269, newPrice: 159, currency: "USD" },
      meta: { lessonsCount: 16 + i, totalHours: 16 + i * 2, students: 900 + i * 300, rating: 4.5 + (i % 2) * 0.1 },
      tags: ["ML"],
      badges: ["Projects"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 3;
    return {
      id: `c-sec-${String(n).padStart(2, "0")}`,
      slug: `security-course-${n}`,
      title: ["Network Security Fundamentals", "Security for Developers", "Intro to Pen-Testing Concepts"][i],
      shortDescription: "Strengthen your security awareness and defenses.",
      fullDescription:
        "Covers fundamental security concepts and practical steps to reduce risk in real development environments.",
      category: "Cybersecurity",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: "Ibrahim S.", title: "Security Analyst" },
      schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "18:30 - 20:30" },
      pricing: { oldPrice: 159, newPrice: 89, currency: "USD" },
      meta: { lessonsCount: 12 + i, totalHours: 10 + i, students: 800 + i * 250, rating: 4.5 + i * 0.05 },
      tags: ["Security"],
      badges: ["Certificate"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 4;
    return {
      id: `c-devops-${String(n).padStart(2, "0")}`,
      slug: `devops-course-${n}`,
      title: ["Linux for Developers", "Monitoring & Logs Basics", "Terraform Foundations"][i],
      shortDescription: "Practical DevOps tools and workflows.",
      fullDescription:
        "Build confidence with essential DevOps tooling: Linux, observability, and Infrastructure as Code.",
      category: "DevOps",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: ["Bilal K.", "Salem N."][i % 2], title: "DevOps Engineer" },
      schedule: { duration: "3 Weeks", days: ["Mon", "Wed"], time: "20:00 - 22:00" },
      pricing: { oldPrice: 149, newPrice: 79, currency: "USD" },
      meta: { lessonsCount: 10 + i, totalHours: 8 + i, students: 1100 + i * 300, rating: 4.6 },
      tags: ["DevOps"],
      badges: ["Projects"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 3;
    return {
      id: `c-cloud-${String(n).padStart(2, "0")}`,
      slug: `cloud-course-${n}`,
      title: ["Azure Fundamentals", "GCP Basics", "Cloud Security Essentials"][i],
      shortDescription: "Understand cloud platforms and best practices.",
      fullDescription:
        "Core services, identity basics, and how to approach cloud projects with a solid foundation.",
      category: "Cloud",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: "Nadia Z.", title: "Cloud Architect" },
      schedule: { duration: "4 Weeks", days: ["Sun", "Tue"], time: "18:00 - 20:00" },
      pricing: { oldPrice: 189, newPrice: 109, currency: "USD" },
      meta: { lessonsCount: 14 + i, totalHours: 12 + i, students: 900 + i * 200, rating: 4.5 + i * 0.05 },
      tags: ["Cloud"],
      badges: ["Certificate"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 3;
    return {
      id: `c-game-${String(n).padStart(2, "0")}`,
      slug: `game-course-${n}`,
      title: ["Unity UI & Menus", "C# Scripting for Unity", "Level Design Workshop"][i],
      shortDescription: "Build game features step by step.",
      fullDescription:
        "Hands-on game dev: UI, scripting, and level design patterns for small-to-medium games.",
      category: "Game Dev",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[(i + 1) % 3],
      language: "English",
      instructor: { name: "Faris H.", title: "Game Developer" },
      schedule: { duration: "4 Weeks", days: ["Tue", "Thu"], time: "19:00 - 21:30" },
      pricing: { oldPrice: 179, newPrice: 99, currency: "USD" },
      meta: { lessonsCount: 14 + i, totalHours: 14 + i, students: 700 + i * 250, rating: 4.5 + i * 0.05 },
      tags: ["Unity", "Game Dev"],
      badges: ["Projects"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 3;
    return {
      id: `c-biz-${String(n).padStart(2, "0")}`,
      slug: `business-course-${n}`,
      title: ["Digital Marketing Basics", "Freelancing Starter Kit", "Pricing & Offers Strategy"][i],
      shortDescription: "Practical business skills for tech creators.",
      fullDescription:
        "Learn essential business tactics for launching services, marketing, and building a simple growth plan.",
      category: "Business",
      level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
      language: "English",
      instructor: { name: "Hiba A.", title: "Product Manager" },
      schedule: { duration: "3 Weeks", days: ["Mon", "Thu"], time: "18:30 - 20:30" },
      pricing: { oldPrice: 129, newPrice: 59, currency: "USD" },
      meta: { lessonsCount: 10 + i, totalHours: 8 + i, students: 600 + i * 220, rating: 4.5 + i * 0.05 },
      tags: ["Business"],
      badges: ["Certificate"],
    } satisfies Course;
  }),

  ...Array.from({ length: 3 }).map((_, i) => {
    const n = i + 2;
    return {
      id: `c-soft-${String(n).padStart(2, "0")}`,
      slug: `soft-skills-course-${n}`,
      title: ["Interview Prep for Developers", "Time Management for Students", "Teamwork & Conflict Resolution"][i],
      shortDescription: "Boost your career skills alongside your technical stack.",
      fullDescription:
        "Practical techniques for interviews, planning, collaboration, and professional communication with exercises.",
      category: "Soft Skills",
      level: "Beginner",
      language: "English",
      instructor: { name: "Mariam S.", title: "Career Coach" },
      schedule: { duration: "2 Weeks", days: ["Sun", "Tue"], time: "20:00 - 21:30" },
      pricing: { oldPrice: 79, newPrice: 29, currency: "USD" },
      meta: { lessonsCount: 8 + i, totalHours: 6 + i, students: 900 + i * 300, rating: 4.7 },
      tags: ["Career", "Skills"],
      badges: ["Certificate"],
    } satisfies Course;
  }),
];

