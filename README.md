# Cornershop Frontend Test

#### ⚠️ Before you begin

> Create a new git repository on the root of this folder, upload it to Github, and invite [@mcarafie](https://github.com/mcarafie) and [@cornershop-hr](https://github.com/cornershop-hr) as collaborators.

## Overview

You have been commissioned to implement a counter application following the design specs provided [here](https://www.figma.com/file/6CnuM0Gj9oiwi2AV9vXLRH/Counters-for-the-web?node-id=0%3A1).

The application consists of several screens where each screen has one or multiple states that you will have to implement following the design specs the best you can.

We have provided starter boilerplate so you can write your application without any hassle and also a NodeJS dummy backend with all the neccessary endpoints to persist your data.

For bootstrapping the frontend application we're using `react-scripts`, so as you might have guessed you **must** use React (it's our primary view layer for frontend applications here at Cornershop).

> Note: This is NOT a backend test. Don't make it require any databases. Don't touch the server folder. Just leave it as it is.

## Requirements

Your submission will be evaluated considering the following criterias:

- Good implementation of UI elements, both visually and at code level.
  - Extra points for writing custom styling code for UI elements.
  - Use whatever CSS flavor you want: plane old CSS, SASS, LESS, CSS-in-JS, CSS modules, everything is allowed.
- Good architecture and software design.
  - _Hint:_ Usage of design patterns, good code organization, separation of concerns, etc. 
- Use of best practices when writing code.
  - _Hint:_ Idiomatic & readable code, good use of composition, DRY, etc.
- The application must persist data back to the server.
- Feature completion (all features must be implemented for a perfect score).
- Good management of state using built-in React features or third party dependencies (context, `redux`, `mobx`, `xstate` or whatever you might like).
- You must include tests.
  - Behavior tests are perfect.
- Your project must be self-contained (make sure you're not using global dependencies).
- We would love to understand your thought process, so writing a little summary of your choices, what you did and how you solved the test is required (write it here on this README file).

Please consider that we expect your solution to be production-ready. In other words, that millions of users would be thrilled to use your product.

> Note: You can use whatever dependencies/libraries you want, the only requirement dependency-wise is to use React.


## Getting started

First and foremost, make sure you have `node` and `npm` (or `yarn`) installed on your machine, then run:

```bash
$ npm install
$ npm start
```

For `yarn` users:

```bash
$ yarn
$ yarn start
```

## API endpoints / examples

Since the backend API runs locally on a different port (`3001`) than the `react-scripts` dev server (`3000`), we have setup a proxy so you don't have to do anything special to consume the API (fetching data from `/api/v1/counter` will do).

> The following endpoints are expecting a `Content-Type: application/json` header.

#### **GET** `/api/v1/counter`.

_Fetch a list of counters._
```javascript
/* Response */
[]
```

#### **POST** `/api/v1/counter`.

_Adds a counter._

```javascript
/* Body */
{ title: "bob" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **POST** `/api/v1/counter/inc`
_Increments the value of a counter._
```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 1 }
```

#### **POST** `/api/v1/counter/dec`
_Decrements the value of a counter._

```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **DELETE** `/api/v1/counter`
_Deletes a counter._

```javascript
/* Body */
{ id: "qwer" }

/* Response */
"qwer" // The id of the deleted counter
```
---

Good luck! 🎉

We hope your submission is… to die for.

![Coffin dance](coffin.gif)

# How I solved (kinda)

## some intro first
I know about React since early 2014 and I read a lot about it from time to time but not frequently put it on practice since at my current job, React is not the main frontend library for projects. 
I've been working with Vuejs since 2017. 
Previous to that I was dealing with scopes on AngularJS (2013) and prior that I was doing my own frontend  things with the help of the always loved jQuery (2011). 

With the experience of jumping into different libs and frameworks I eventually got some kind of personal recipe of how to approach into new technologies and enjoy the proccess, I will  try to make it the most TL;DR possible

## how it started
drawbacks First things first. I wanted to know how the respected people on front end development are building React apps nowadays. One of the drawbacks I encountered years ago when trying to
get into ReactJs was the extremely fragmented ecosystem and over-opinionated discussions about how to do things "right" with React.
I must say that as of 2021 it is a huge change. I enjoyed the proccess from the very beginning. `create-react-app` seems a more mature toolkit for creating new React app.

## the recipe to not get mad dealing with so many new things at same time
I'm little bit old on front end dev, but many things about the "React way"
of doing things were new to me. When I was up to date about how to React (kinda), I splitted
the process into 3 phases in order to not expend a full day just trying to display
a painted button that shows an `alert(1)` message.
This 3 phases you can watch it on commit history of the repo.
I tried to write meaningful message commits most of the time. I hate non explanatory commit messages
  - **Basic App Routing and minimal HTML. Just care about implementing functionality**
        I forgot about css and how the app should look like and I just focused on get functional things done. I wanted to use the time wisely to in first place have the most functional aspects of the app solved. This way I would have enough time with any issue appearing regarding de architecture of the app. Css is just css anywhere so I left it until the app was actually doing "things". With the reduced time frame to complete the app, testing was left on purpose to the final stage since I wanted to hack around and get to use with React APIs. Leaving testing for the end also give me an opportunity to re read the code and make some refactors that in this first stage of the app development would be kinda over-optimizing, since I was still figuring out things and experimenting alot
  - **Style things up**
        When the app was creating counters, editing counters, etc, I spent some time reading about styling options for React Apps. Not much left to say here, I just love CSS and write it the more natural way possible. So I sticked with SCSS caring about the selectors and no to make a style mess with `!important` all over the place.
  - **Testing and Code Refactoring**
        I sticked with what I felt is at the moment the most expressive way of write tests.
        `testing-library` with `react-testing-library` was a mind blow for me.
        Some big refactors were made on this phase. My full-time work left me no enough time
        to do a near 100% test coverage, but I tried the best I could in the timeframe given


## final thoughts
I Really enjoyed the process of building this app. Hooks is a mindblowing concept and I would look into it with more time from now on. While building this app I completely forgot about needing
Vue or the Vue ways of do things front end development.
There are probably some performance work to do. I did not
spend enough time checking excesive re renders on some components.
It was a real challenge and it was nice to feelthe  thrill of trying and learning new things again. Finally, thanks to you guys to come up with this really nice test! 

As mentioned before, you can check details of the process viewing GIT Commit history
