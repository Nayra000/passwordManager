# Password Manager

Welcome to Password-Manager, a RESTful API to store your passwords safely and smoothly.

## Badges

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## About

This Password-Manager REST API allows users to securely store and manage their passwords in a centralized database. With this API, users can create, update, delete, and retrieve their password records using HTTP methods. It provides a convenient and secure way to organize and access sensitive information.

## Tech/Framework used

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Git](https://git-scm.com/)
- [NodeMailer](https://nodemailer.com/about/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)
- [Mailtrap](https://mailtrap.io/)
- [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running

### Installation

To install the Password-Manager, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repo-link>
   ```

2. Navigate to the project directory:

   ```bash
   cd <app-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   To run this project, you will need to add the following environment variables to your .env file\
   `HOST=`\
   `PORT=`\
   `DATABASE=`\
   `DATABASE_PASSWORD=`\
   `SECRET_KEY=` jwt secrete key\
   `EXPIRE_IN=` jwt expired date\
   `JWT_COOKIE_EXPIRES_IN=`\
   `EMAIL_USERNAME=`\
   `EMAIL_PASSWORD=`\
   `EMAIL_HOST=`\
   `EMAIL_PORT=`

5. Start the application:
   ```bash
   npm run start
   ```

## Usage

Once the application is up and running, you can visit `http://localhost:<port>` or `deployed link` in your api-testing tool like postman to explore the application

## API

Password-Manager provides a RESTful API to performe various actions. You can find the API documentation [here :link:](https://documenter.getpostman.com/view/28868026/2sA2rDvKnK).

## Features

- User registration and authentication
- Sign up, Log in, Logout, Update, and reset password.
- crud operations for passwords to each user

## To Do

- [ ] make a more-secure login approach
- [ ] replace mail transporter with real one
- [ ] set password generator
