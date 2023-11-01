# radisa
Survey app

TO START

Navigate to the Laravel Project Directory:
Use your terminal or command prompt to navigate to the directory where you've cloned the Laravel project.

Install Composer Dependencies:
Laravel uses Composer for dependency management. Run the following command to install the PHP dependencies:

bash
Copy code
composer install
Create a .env file:
If the project does not have a .env file, you should create one. You can duplicate the .env.example file and customize it with your configuration settings, including database credentials.

bash
Copy code
cp .env.example .env
Generate an Application Key:
Run the following command to generate a unique application key for your Laravel project:

bash
Copy code
php artisan key:generate
Set Up the Database:
Configure your .env file with your database connection details (e.g., database name, username, and password).

Run Migrations and Seeders:
To set up the database schema and populate it with initial data, run the following commands:

bash
Copy code
php artisan migrate
php artisan db:seed
Start the Laravel Development Server:
Run the following command to start the development server:

bash
Copy code
php artisan serve
Your Laravel API should now be accessible at http://localhost:8000 by default.

For the React App (Front End):

Navigate to the React App Directory:
If the React app is inside the Laravel project directory, navigate to the React app's directory in your terminal.

Install Node.js and NPM:
If you don't already have Node.js and NPM installed on your system, you can download and install them from the official website: https://nodejs.org/

Install React Dependencies:
Run the following command to install the required dependencies for the React app:

bash
Copy code
npm install
Start the React Development Server:
Run the following command to start the development server for the React app:

bash
Copy code
npm start
Your React app should now be accessible at http://localhost:3000 by default.
