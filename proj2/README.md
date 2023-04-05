# Vulnerabilities educational web application
## Jan Zbořil

---

- Project 2  
- WAP course  
- Faculty of Information Technology  
- Brno University of Technology  
- 2023

---

Web application for educational purposes demnstrate few common vulnerabilities often found in web applications. In forms of labs, the user can learn how to exploit these vulnerabilities and how to prevent them. The labs are targeting simulated web servers, which are vulnerable to specific exploits. The exploits shown are usualy the easiest to perform, but they are still very dangerous. However, servers are normally immune to these most simple versions of the exploits.  

Application focuses on the following vulnerabilities:
 - Stored XSS
 - Reflected XSS
 - Clickjacking
 - CSRF (Cross-Site Request Forgery)

In each lab, the user will learn how to prevent the vulerability and can
continue to extrenal sources with more information about the vulnerability.

---

## Technical

Application written in `node.js` using the `express` framework.  
Using the `ejs` templating engine. App uses a clean CSS, which can be editable.

No database is used, data stored in runtime memory of the server or in the session/local storage of the user's browser. This approach seemed to make sense to me, when the application is not bulky, not supposed to be used by many users at once, each user is doing his own lab and the attacks are more or less a simulation and not a real attack against a server. Given the nature of the labs, having a database could be a security risk.

### Directory structure:
 - `index.js` - main application file
 - `package.json` - npm package file
 - Dockerfile - docker file
 - `public` - static files
    - `fonts`
    - `images`
    - `styles`
 - `server_scripts` - server side scripts for runtime storage etc.
 - `views` - ejs templates for HTML pages
 - `api`- client side javascript - page and lab logic

---

## Installation

 - app is running on `http://localhost:8000`

### Requirements

 - speciefied in the `package.json`
 - `node.js`
 - `npm` for additional packages installation

### Local

- clone the repository
- install the packages using `npm install`
- run the application using `npm start` or `nodemon start`

### Docker local build

- clone the repository
- build the image using `docker build -t wap .`
- run the container using `docker run -p 8000:8000 wap`

### Docker hub

See https://hub.docker.com/repository/docker/rolllikerollo/wap/general

- pull the image using `docker pull rolllikerollo/wap:final`
- run the container using `docker run -p 8000:8000 rolllikerollo/wap:final`