TO START IT!
    
1. Clone the Repository
    git clone https://github.com/geralt1992/radisa.git
    cd radisa

If you encounter problems with cloning, try the following:
    git remote add origin https://github.com/geralt1992/radisa.git
    git pull origin main
    
2. Install Dependencies
    composer install
    npm install
    cd react
    npm install
   
4. Create Environment File
    cp .env.example .env
   
6. Generate Application Key
    php artisan key:generate
   
8. Configure Database
    Make sure to set up your database configuration in the .env file.

9. Run Migrations
    php artisan migrate
   
11. Start Laravel Server
    php artisan serve
    
13. Build and Run React
    cd react
    npm run dev

    
Additional Notes
    Ensure that XAMPP server is installed and running for local usage.
    Access the application in your browser at http://localhost:8000 or the specified Laravel serve URL.