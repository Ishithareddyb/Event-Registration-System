# Backend (Spring Boot)

Run with `mvn spring-boot:run` from backend folder. H2 console at http://localhost:8080/h2-console

API endpoints:
- GET /api/events
- POST /api/events
- PUT /api/events/{id}
- DELETE /api/events/{id}
- GET /api/participants
- POST /api/participants
- GET /api/participants/event/{eventId}

Set MySQL credentials in src/main/resources/application.properties to use MySQL.
