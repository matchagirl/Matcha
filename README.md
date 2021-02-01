# Matcha
A dating site that allows users to connect with others based on romantic preferance/interest and geo location.

# TECH STACKS
  - npm v6.13.4
  - Node v12.16.1
  - MAMP

# INSTALLATION
Download source code
Run npm install to install all of the modules needed for the project

# DATABASE CONFIGURATION AND SET UP
Download MAMP from the bitnami website
Open the manager-osx. Go to the Manage servers tabs and make sure mysql database is running. If not press Restart.
Press configure, this should show detail about the port.
Open web browser and go to http://localhost:3000/phpmyadmin
Create the database titled Matcha, navigate to import and upload the file Matcha.sql
Create a database title profile, navigate to import and upload the file profile.sql

# RUNNING THE PROGRAM
Run code entry to start the server
Navigate to localhost:3000 in your browser to open the website

# CODE BREAKDOWN
- Back end technologies
 JavaScript
 node.js
 express
 - Front end technologies
   - HTML
   - CSS
- Libraries/modules/dependencies
    - body-parser
    - express-session
- Database management systems
    - mysql
    - phpmyadmin
