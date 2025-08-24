# Travlr – Full Stack Development Project  

## Overview  
This project demonstrates a full stack web application built with both server-rendered pages and a single-page application (SPA). It integrates multiple technologies **Express, Handlebars, HTML, JavaScript, Angular, and MongoDB** to highlight different approaches to front-end and back-end development.  

The application was developed as part of a full stack development course, providing hands-on experience with modern frameworks, API integration, and database design.  

<img src="https://i.imgur.com/lWN0KlV.png"/>


## Architecture  

### Server-Side Rendering (Express, HTML, JavaScript)  
- **Express & JavaScript** were used to define routes and controllers, which process requests from the client.  
- Responses were generated either by serving static HTML files or by using **Handlebars templates** that pull data from the MongoDB database.  
- This approach requires repeated server calls whenever a page is loaded or refreshed, making the server the main driver of rendering.  

### Client-Side Rendering (Angular SPA)  
- The Angular portion of the project operates as a **Single Page Application (SPA)**.  
- When the SPA first loads, the entire application is delivered to the browser. After that, navigation and rendering happen client-side.  
- Backend calls are only made when new data is needed, not for page reloads.  
- Compared to Express, this approach has a heavier initial load but offers faster, smoother navigation once running.  

### Database Choice: MongoDB  
- **MongoDB** was chosen for its flexibility, scalability, and compatibility with JSON-like documents.  
- Because JSON is central to how data moves between frontend and backend, MongoDB’s format is a natural fit for this stack.  

---

## Functionality  

- **JSON vs JavaScript**  
  - JSON is a lightweight data format used to structure information across different systems.  
  - JavaScript is a programming language that can use JSON as a way to represent objects.  
  - In this project, APIs communicate using JSON to bridge the frontend Angular application with the backend Express routes.  

- **Refactoring for Efficiency**  
  - Static HTML was replaced with **Handlebars templates** to reuse layouts and make pages more dynamic.  
  - Content originally stored in static JSON files was migrated into **MongoDB**, enabling updates without touching the codebase or redeploying.  
  - These changes improved reusability and streamlined content management.  

---

## Testing  

- **HTTP Methods**  
  - Implemented **GET, POST, PUT, DELETE** to handle CRUD operations across endpoints.  

- **API Endpoints**  
  - Defined structured endpoints to allow client applications to interact with the backend securely and consistently.  

- **Security Measures**  
  - User authentication and **JWT (JSON Web Token)** authorization were added to protect restricted endpoints.  
  - This ensured only verified users could perform certain actions, adding an extra layer of security.  

---

## Reflection  

### Professional Growth  
This project strengthened my skills in **full stack development** by allowing me to build a complete application from scratch rather than joining an existing codebase. It gave me the chance to understand how the pieces—frontend, backend, APIs, and databases—fit together into a functioning system.  

### Key Skills Gained  
- Improved **JavaScript** skills, particularly in backend contexts using **Node.js and Express**.  
- Practical experience with **MongoDB** as a NoSQL database.  
- Deeper understanding of **RESTful APIs**, authentication, and full stack architecture.  
- Hands-on practice with both **server-side rendering** and **client-side SPA development**.  

These experiences make me a stronger candidate for full stack and software engineering roles, especially where **Node.js, Express, and Angular** are in demand.  

---

 
