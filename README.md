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
Open the cloned repo on your vs code.
Create the database titled Matcha, run node models\config.js
Create a database tables, run node models\setup.js
Generate 500 random users, run node tests\profile_generator.js

# RUNNING THE PROGRAM
Run code app.js to start the server
Navigate to localhost:8082 in your browser to open the website

# CODE BREAKDOWN
- Back end technologies
    - JavaScript
    - node.js
    - express
 - Front end technologies
   - HTML
   - CSS
   - Bootstrap
- Libraries/modules/dependencies
    - body-parser
    - express-session
- Database management systems
    - mysql
    - phpmyadmin
