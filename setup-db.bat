@echo off
echo Setting up Smart Pharmacy Database...
echo.

echo Creating database...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS smart_pharmacy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo.
echo Importing schema...
mysql -u root -p smart_pharmacy < project\server\config\schema.sql

echo.
echo Running seed data...
cd project\server
node seed-admin.js

echo.
echo Database setup complete!
echo.
echo You can now run the application with: npm run dev
pause