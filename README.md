# For the love of food

For the love of food is recipe sharing application. Users can create, search, and share recipes with an easy to use interface.

The app is fully responsive, for easy veiwing on any device. Sass was used to style the front end.

The client side of the application is built using React and Redux. The component layout can be found __src__ directory with App.js acting as the highest level component.

The server is built with Express.js and Passport. Routes are found in the __routes__ directory.

## Deployed link

<http://epic-albattani-61c20d.netlify.com/>

## Tech Stack

### Client

* React
* React Router
* Redux
* Redux Thunk
* Redux Form
* Sass

### Server

* BCrypt
* Express
* JSON Web Tokens
* Mongoose
* Passport

### Database

* MongoDB

## RESTful Architecture

### Secure Endpoints

#### Recipes ('/recipes')

* POST
* PUT
* DELETE

### Public Endpoints

#### Recipes ('/recipes')

* GET

#### Search ('/search/recipes)

* GET

#### Users ('/user')

* GET
* POST
