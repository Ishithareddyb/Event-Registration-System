# Event Registration System — Pro (Pastel Blue / White)

This is an upgraded version of your project with a prettier, more interactive React frontend and the existing Spring Boot backend.

Technologies included:
- Frontend: React.js (components, fetch API), TailwindCSS (via CDN), Chart.js (via CDN), SweetAlert2 (via CDN)
- Backend: Spring Boot (uses Spring MVC for controllers), Spring Data JPA (Hibernate), H2 (dev) / MySQL (production)
- Build: npm (frontend), Maven (backend)

Quick start:
1. Backend:
   - cd backend
   - mvn spring-boot:run
2. Frontend:
   - cd frontend
   - npm install
   - npm start
3. Open http://localhost:3000 (frontend) — backend API base http://localhost:8080/api

Note: Tailwind/Chart.js/SweetAlert2 loaded via CDN in the frontend/public/index.html for faster prototyping.
