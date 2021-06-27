## Table of contents
* [General info](#general-info)
* [Tech Stack](#features)
* [Setup](#setup)
* [Usage](#usage)

## General info
This is an application that displays and searches [GitHub](https://github.com/) users using GitHub public API. It has 2 views - Landing Page and User Page, where the first one represents the list of the most popular Github users and the second one shows the data for specific users. The data is being stored inside of local storage. Succeeded searches are also visible on the landing page (uo to 3). You can change the view of the list on the Landing Page with 2 buttons on the right. App is mobile responsive. 

## Tech Stack
* React
* React Router
* SCSS
* Typescript
* Github API
* Eslint
* Enzyme
* Jest
* NPM

## Setup 

To run this project, install it locally using git clone command.

After that, go to the root directory and write in your terminal:

$ npm install

Before you continiue, you will need to get your personal access token to use this app. Follow these instructions:
* Go to your Github Page. Go to Settings -> Developer Settings -> Personal Acess Tokens.
* Click Generate new token. This will open the selection list for you: you will only need public_repos and read:user to run this app. Find them and select. 
* Finish gererating your token and copy it. Then, go to src/api/config.ts. Paste that to representing variable.

```javascript
export const TOKEN = 'paste it here';
```
After that, you are ready to go! Run following command: 

$ npm start

You can also run this command to check testsL

$ npm run test

You can run this command to check if code follows eslint enforced style:

$npm run lint

## Extras
* I've specified the amount of users displayed on the Landing page. You can change it (up to 30) by changing the value of userAmount (LandingPage, line 25).
* The Landing Page is listening to screen changes. It will remove the buttons for the view change after 600px, but please reload the page to see the changes if you want to look at the mobile version. 
* The cool thing about this app is that it saves data to Local Storage and makes API calls only when they are necesarry. It makes a big API call when you open the landing page or specific user page for the first time. Then it saves data and calls it directly from the local storage.

