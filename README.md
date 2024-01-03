Welcome to platform that empowers users to create and edit surveys effortlessly while automatically aggregating results. With the ability to add and modify user profiles, as well as receive valuable suggestions, our application is designed for exploring the thoughts and opinions of students on various subjects. Dive into a seamless experience of survey management, user engagement, and data analysis all in one place. Start understanding and capturing diverse perspectives with our intuitive survey platform.

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
    

TO START IT!

Clone the Repository

    git clone https://github.com/geralt1992/radisa.git
    cd radisa

If you encounter problems with cloning, try the following:

    git remote add origin https://github.com/geralt1992/radisa.git
    git pull origin main

Install Dependencies

    composer install
    npm install
    cd react
    npm install
    
Create Environment File

    cp envstarterpack .env
   
Generate Application Key

    php artisan key:generate
   
Configure Database
    Make sure to set up your database configuration in the .env file.

Run Migrations

    php artisan migrate
   
Start Laravel Server

    php artisan serve
    
Build and Run React

    cd react
    npm run dev

    
Additional Notes
    Ensure that XAMPP server is installed and running for local usage.

IMPORTANT 

    Users are added from within the application. On the landing page, go to the login section, and upon the first opening, you will have the option to create an admin account. Upon doing so, you will receive administrative credentials and permissions. Use these
    credentials to access the administrator profile, from where you can create user accounts. These users can then fill out the survey questionnaires that you, as the administrator, create.
