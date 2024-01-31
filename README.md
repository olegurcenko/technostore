## Project Name & Pitch

#### TechnoStore


My first project with registration system. There are 2 roles: admin, user. As user you can create orders, add products to your wishlist. Built with React, ExpressJS, Redux, JavaScript, and SCSS.

## Project Status
in development

#### Future features:

This project is currently in development. User could chat with admins soon. They will be able to open theme, discribe their problems, and admins will answer them. Then chat will be deleted from active, but you will be able to look at messages from chat history.

## Project Screen Shots

#### Homepage:   

![Screenshots](photo_2024-01-31_09-17-51.jpg)

#### Product Page:

![Screenshots](photo_2024-01-31_09-22-09.jpg)

#### Cart Page:

![Screenshots][photo_2024-01-31_09-23-44.jpg]

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

#### Front side:  

You need to change baseUrl to your localhost in axios.js

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`  

#### Back side:

Back will run on port 4444

Installation:

`npm install`

To Start Server:

`npm start`

## Reflection

  - What was the context for this project?
  		- I made this project to learn and later demonstrate my knowledge of Javascript. This project can be upgraded, so its ideal for me to show hw i improve my skills.
  - Why was this project challenging and therefore a really good learning experience?
  		- It was my first project with backend, so it was something new for me. Before this i used to write only front side.
  - What were some unexpected obstacles?
  		- The most difficult part for me was hosting, because i wanted to host website with ssl protocol. Front side i hosted, but when i faced withthe problem, that back side should have the same protocol to work. So i decided to run it on VPS server.
  - What tools did you use to implement this project?
  		- I used here React for frontend and Express for backend. In react additionaly i used Redux. For styles i used SCSS and then converted it to CSS. I'm making here axios requests, and store data with useContext React hook. Token saved in local storage.