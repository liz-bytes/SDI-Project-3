# Sentinel Division Dashboard

The **Sentinel Division Dashboard** is a web application designed to streamline soldier and equipment management for military units. The application provides a user-friendly interface for various command roles (e.g., BN Commander, BDE Commander, Division Commander) to view, filter, and edit soldier and equipment data.

## Features
The application offers a range of features including:

- **User Authentication:**  
Commanders can log in using their predefined username and password. After logging in, the application loads soldier data relevant to the commander's assigned unit.

- **Soldier Management:**  
  - View detailed soldier information (first name, last name, MOS, deployment, etc.).
  - Filter soldier data by various criteria using filters and a search box.
  - Pagination for navigating through large datasets.
  - Edit soldier information by clicking a pencil icon that takes the user to an edit page.

- **Equipment Management:**  
  A dedicated dashboard provides similar functionality for viewing and filtering equipment data.

- **Routing & Layout:**  
  A shared layout ensures consistency across pages with a common header and navigation. React Router is used for client-side navigation.

- **State Management:**  
  The app uses React's Context API and hooks (such as useState and useEffect) for managing global and local state.
  
- **Responsive Layout:**  
  A shared layout component ensures a consistent header and navigation across pages.

## Technologies Used

- **React** – Front-end library for building the UI.
- **React Router** – Client-side routing and navigation.
- **Context API** – Global state management.
- **Fetch API** – For backend communication.
- **Vite** – Fast development and build tooling.
- **Docker** – Containerization (optional).

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sentinel-division-dashboard.git
cd sentinel-division-dashboard
```

### 2. Install Dependencies and Start Application
```bash
npm install
npm start
```

### 3. Docker Setup
Create a file named Dockerfile in the project root with the following content:
```bash
# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed, e.g., with Vite)
RUN npm run build

# Expose the port your app runs on (adjust if necessary)
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
```

Build the docker image and run the container
``` bash
docker build -t sentinel-division-dashboard
docker run -d -p 3000:3000 sentinel-division-dashboard
```

Create a docker-compose.yml file in the project root with the following content:
``` bash
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
```
Then run 
``` bash
docker-compose up -d
```

## Usage

- **Login:** Commanders can log in using their predefined username and password. Upon login, the application loads soldier data specific to the commander's unit.

- **Filtering & Pagination:** Use the dropdown to select a filter category and type in the search box to refine soldier data. Pagination controls allow navigation between pages of results.

- **Editing Soldier Data:** Click the pencil icon in the "Edit" column of the soldier table to navigate to the edit page. The edit page pre-populates the input fields with the soldier’s data. After making changes, click Save to update the soldier information via a PATCH request.

- **Equipment Dashboard:** Access the equipment dashboard for similar filtering and management of equipment data.

## Roadmap

[Kanban Board](https://www.figma.com/board/Src7fdMxeeF632WXnmrqYe/Untitled?t=5wiT3TtbR2fzd1ID-1)


## Authors

- [Levi Ballew](https://www.github.com/leviballew)
- [Luke Larock](https://github.com/NoofleBot)
- [Lorena Longoria](https://www.github.com/lorenalongoria)
- [Lizmarie Mendez](https://www.github.com/liz-bytes)
- [Robet Prickett](https://www.github.com/rwp1994)
- [Tia Tomescu](https://www.github.com/tiatomescu)






