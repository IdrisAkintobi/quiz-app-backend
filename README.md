# Quiz builder web API

A RESTful API for quiz builder where users can create their own quizzes and other users can take them and see how many questions they got right.

## Technologies Used

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)

## Documentation

- Api is currently hosted at [Amazon EC2](http://3.138.190.59/)

## Getting Started

---

### Installing/Run locally

- Make sure you have `nodejs`, `mongodb`, `redis` installed.

  bash

  - yarn

  - Create/configure `.env` environment according to sample.env file.

  - Run `yarn build` to compile the application.
  - Run `yarn start` to start the server

### Run with docker

- Make sure you have `docker` installed.

  bash

  - cd to the folder directory and Run `docker compose up`

### Testing

- To test or consume the API locally, you can make use of [Postman](https://documenter.getpostman.com/view/19915303/VUjTmPCY) to simulate a front-end client.
- You can also test by running `yarn test`.

## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `GET` Get a data
- `PATCH` Edit a data
- `DELETE` Delete a data

## Authentication

Bearer token is used to authenticate the user.

Authentication is required for all requests excluding login and signup.

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `OK` created successfully
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `500` `Internal serval error` There was a problem with the network or database
- `401` `Unauthorized` The user is not authorized to access the resource
- `403` `Forbidden` The user is not authorized to access the resource
- `404` `Not Found` The resource was not found
- `409` `Conflict` The resource already exists

#

#

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/19915303/VUjTmPCY)     [![AWS](https://a0.awsstatic.com/libra-css/images/logos/aws_smile-header-desktop-en-white_59x35.png)](http://ec2-3-138-190-59.us-east-2.compute.amazonaws.com//)

#

#

<video controls width="900" heigth="600" >
    <source src="https://user-images.githubusercontent.com/13175868/185267539-43adfd4d-6556-4636-aeed-48b972055d8c.mp4">
</video>

#

#
