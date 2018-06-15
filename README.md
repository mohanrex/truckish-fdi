# Truckish-FDI

> Truckish Frontend Developer Assignment.

## Folder Structure

This boilerplate has 2 main directories:

- frontend - contains angular app bootstraped using angular-cli and angular material.
- backend - contains backend part of this application. For more details see README.md inside this folder.

## Install and Use

> Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running node -v and npm -v in a terminal/console window.
> Older versions produce errors, but newer versions are fine.

### To start the backend
```sh
# cd into project backend root
$ npm i
# start the api
$ npm start
```
> There are five stadiums and one demo user which is already present. Demo user credentials are test@test.com:test123
> Whenever you restart the backend or do some changes in backend files the database will be cleared.

### To start the frontend

```sh
# cd into project frontend root
$ npm install -g @angular/cli
$ npm i
# start the server
$ ng serve
```
> Angular Material is already included. You can directly start using Angular Material components. [More Info]https://material.angular.io/components/categories

### API Documentation
You can find the api documentation at [Postman Collection]https://documenter.getpostman.com/view/3745793/RWEdugXj

## General Assessment Info
This problem requires you to showcase your skills in Angular 2 or greater and integrating angular with other third party apis like google map and weather API etc.. Kindly design the pages with your own ideas by following material design guidelines.
You can also improve this application by implementing creative additional functionalities on your own.

### Phase I
- Implement a login page
- Implement a home page which will show all the Football Stadiums in a card based view. This card should have an image, name, 25 letters of description and address
- Implement a logout functionality

### Phase II
- When a user clicks the stadium name, the detailed page of the stadium needs to be shown.
- Detailed page needs to show Name, full description and image.
- It should show a map in which the location of the stadium should be marked and shown
- This page should also contain weather information of that place by using Weather API.

### Phase III
- Implement a Register/signup page.
- Implement a form which will allow the user to add more stadiums.
- Form should collect all the information