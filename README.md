**#AddressArchitect**

AddressArchitect is a full-stack web application designed to handle international address management efficiently. It dynamically adjusts to different country-specific address formats, validates input in real-time, and provides fast, optimized search functionality across multiple countries.

**Features**

Dynamic Address Form – Adjusts fields based on the selected country

Multi-Country Search – Search for addresses across multiple countries

Real-Time Validation – Ensures address formats are correct before saving

Fast Performance – Supports 1000+ concurrent requests with <75ms response time

Pagination – Handles large datasets efficiently

API with Swagger Docs – RESTful API endpoints for address entry, validation, and search

Database Optimization – MongoDB with indexing + Node-cache for faster queries

Seeded with 10,000+ addresses using Faker.js


**Tech Stack**

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Fake data : faker.js

Caching: Node-cache middleware

API Documentation: Swagger



**How It Works**

User selects a country → Form updates dynamically

User enters an address → Validation occurs

Data is saved in MongoDB → Indexed for fast search

User searches for an address → Cache optimization ensures fast response times <75ms. 
Results appear with pagination


**API Endpoints**
GET /api/addresses – Fetch all addresses

POST /api/addresses – Save a new address

GET /api/addresses/search – Search addresses by name or partial address

GET /api/docs – View API documentation (Swagger)


Why This Matters?
This project tackles the real-world problem of handling international addresses in a scalable, efficient, and user-friendly way.

Fast, optimized, and built to scale, this is AddressArchitect.
