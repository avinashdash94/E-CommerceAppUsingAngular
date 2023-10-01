# EcommerceProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#Step to setup Fake APIs
-------------------------
1)To use Fake Api go to following link
https://github.com/typicode/json-server

2)Install Json Server using folloing command
npm install -g json-server

3)Create a .json file anywhere like for us we have created on root level(db.json)
Now Run the folloing command in the same direcltory where db.json file is created
json-server --watch db.json

4) it will start server the port it shows like( http://localhost:3000)
5) rnn the url on browser to see all the data in the Resource section if no resurce is visible add some data in Db.json and refereseh the page in browser.
 We can add data from postman too. To know more go to folloing link https://github.com/typicode/json-server
 
font awesome cdn 
------------------
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/css/all.min.css" integrity="sha512-f2MWjotY+JCWDlE0+QAshlykvZUtIm35A6RHwfYZPdxKgLJpL8B+VVxjpHJwZDsZaWdyHVhlIHoblFYGkmrbhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/js/all.min.js" integrity="sha512-ocx3trI5wqU15rW421ikZHRPxmBg6+00d56x9AUn1DhS/YFTu0EHoVXSeKbFmXrz4kEQJmus8jOvDgqZ/TyfoA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 

All Icon to check: https://fontawesome.com/v4/icons/

Bootstrap Installation site and command
---------------------------------------
Site: https://ng-bootstrap.github.io/#/home
Command: ng add @ng-bootstrap/ng-bootstrap

IF follow ingIssue faces 
------------------------
while installing new npm package(like bootstrap) if versons are not matching use the following command and again install the package 

npm config set legacy-peer-deps true