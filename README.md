TO START IT!

Clone the Repository

    "git clone https://github.com/geralt1992/radisa.git"
    "cd radisa"

If you encounter problems with cloning, try the following:

    "git remote add origin https://github.com/geralt1992/radisa.git"
    "git pull origin main"
    
2. Install Dependencies
    "composer install"
    "npm install"
    "cd react"
    "npm install"
   
4. Create Environment File
    "cp .env.example .env"
   
6. Generate Application Key
    "php artisan key:generate"
   
8. Configure Database
    Make sure to set up your database configuration in the .env file.

9. Run Migrations
    "php artisan migrate"
   
11. Start Laravel Server
    "php artisan serve"
    
13. Build and Run React
    "cd react"
    "npm run dev"

    
Additional Notes
    Ensure that XAMPP server is installed and running for local usage.


SPECS OF PROJECT
Key Features:

    Email notification on survey activation
    Background email sending with rate limiting
    React UI with Rodal, Tostify, Framer Motion
    Laravel API with validations
    MySQL database with automatic survey lockdown
    PDF export using jspdf and html2canvas
    Chart.js integration for data visualization
    Responsive design
    Automatic logout after 1 hour
    Student search functionality
    Tailwind CSS for styling
    FontAwesome for icons
    Grade system without registration
    Material-tailwind/react UI
    Responsive design



Additional Project Features

1.) Queue Worker Toggle:

    Purpose: Send emails upon survey activation.
    Implementation:
    Uncomment the code in the SurveyController.php file.
    Enable the queue worker by running "php artisan queue:work" and setting QUEUE_CONNECTION=database in the .env file.


2.) Scheduled Task Toggle:

    Purpose: Automatically lock surveys after one week.
    Implementation:
    Start the scheduler by running "php artisan schedule:run"
    
Important Notes:

    Make sure to configure the environment variables accordingly.
    For the queue worker to send emails, the QUEUE_CONNECTION in the .env file should be set to database.
    Adjust the delay in the code snippet to control the time between emails.
    This way, you can easily toggle the queue worker for sending emails and the scheduled task for survey lockdown by following the provided instructions.
