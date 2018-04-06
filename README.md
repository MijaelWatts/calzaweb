# Intro

This project started because of the need to give access to a catalog to specific customers of a store. So a login that gives access to the control panel to the Admin of the store was built. The same login redirects the customers to the catalog of the store.

[This is the basic mockup of the actual system](http://www.meih.com.mx/mw/calzaweb/) Watch it live!!!!

Want to login?
usuario: test@test.com
contraseña: password

## About the Technologies
This project uses ReactJS and Firebase. The purpose is to showcase how these two can interact with no server, but using only DB as a Service.


## Prerequisites


* [Node.js](https://nodejs.org/en/download/) - Download Node to your machine.
* [Firebase](https://console.firebase.google.com/) - You will create your DB here (Near future will have the instructions on how to do this).
* [Chrome](https://www.google.com/chrome/) - Doesn't accept other explorers.

### Installation

Download or clone this repo.
Create a DB in Firebase similar to the one loacted at the file 
```sh
calzaweb/calzaweb/src/config/firebase-db-example.json
```
Install the dependencies and devDependencies and start the server.

```sh
$ cd calzaweb/calzaweb
$ npm install
$ npm start
```