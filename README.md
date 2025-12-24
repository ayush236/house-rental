🚀 Features
Host Functionality

Property Management: Hosts can add new home listings with details such as price per night, location, rating, and photos.


Listing Controls: Includes dedicated views for editing existing listings and managing a personal list of hosted properties.


Store (Guest) Functionality

Dynamic Home Listings: Browse available homes through a responsive UI.



Detailed Property Views: Access specific details for any home using dynamic path parameters (e.g., /homes/:home-id).




Favorites System: Users can save properties to a personalized favorites list.



Booking System: Placeholder routes and views for reserving stays and viewing current bookings.

🛠️ Tech Stack

Backend: Node.js & Express.js 


Templating Engine: EJS (Embedded JavaScript) for dynamic server-side rendering 



Styling: Tailwind CSS (Utility-first, responsive design) 


Database/Persistence: Local file system storage using JSON files, managed through asynchronous fs operations.


📂 Project Structure
The project follows a strict MVC organization:


/models: Handles data logic and file system interactions (e.g., Home.js, Favorite.js).



/views: Divided into host/ and store/ subdirectories containing EJS templates and partials.


/controllers: Processes user input and bridges the gap between Models and Views.



/routes: Defines endpoints for host and store interactions.


/public: Serves static files like CSS and local home images.


⚙️ Installation & Setup
Initialize npm:

Bash

npm init -y
Install Dependencies:

Bash

npm install express ejs
npm install --save-dev nodemon tailwindcss postcss autoprefixer
Configure Tailwind CSS:

Bash

npx tailwindcss init

Add your view paths to tailwind.config.js and include Tailwind directives in your CSS input file.

Run the App:

Bash

# To start the server with nodemon
npm start

# To build Tailwind CSS
npm run tailwind
🧠 Key Concepts Implemented

Dynamic Routing: Utilizing req.params to fetch specific data based on URL IDs.



Middleware: Custom middleware for request logging and body parsing.



Data Handling: Using Streams, Chunks, and Buffers for efficient request processing.


Event-Driven Architecture: Leveraging the Node.js Event Loop for non-blocking I/O operations.
