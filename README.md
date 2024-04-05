# TMU Connect

TMU Connect is a classified advertisements website tailored specifically for TMU students.
This platform allows students to post and browse classified ads in various categories,
fostering a seamless exchange of items and academic services within the university community.

## Features

1. **User Authentication**

   - Secure login and registration system for TMU students.

2. **Responsive Design**

   - Interface seamlessly adapts to both desktop and mobile screens.

3. **Classified Ad Categories**

   - _Items Wanted:_ Students can post ads seeking specific items.
   - _Items for Sale:_ Students can post ads selling specific items.
   - _Academic Services:_ Section for offerings like tutoring, textbook exchanges, and study groups.

4. **Search Functionality**

   - Efficient search capabilities with filters such as category, price, and location.

5. **Ad Posting Interface**

   - User-friendly interface for posting new ads with text, images, and relevant details.

6. **Communication Platform**

   - Secure system for users to communicate with each other within the website.

7. **Admin Dashboard**

   - For site administrators to manage ads, users, and site content.

8. **Mobile Optimization**
   - Full functionality and enhanced user experience on mobile devices.

## Prerequisites

1. **Node.js**
   - Install Node.js from the [official website](https://nodejs.org/).
   - Verify the installation by running `node -v` and `npm -v` in the terminal.
2. **MySQL**
   - Install MySQL from the [official website](https://dev.mysql.com/downloads/).

## Deploying the Application

Ensure you have all the prerequisites installed before proceeding.

### Manual Deployment

#### Install Dependencies

```bash
npm install --prefix client
npm install --prefix server
```

#### Build the application

```bash
npm run build --prefix client
npm run build --prefix server
```

#### Setup the Database

1. Change directory to the server folder.
   - `cd server`
2. Copy the `.env.example` file to `.env.
   - `cp .env.example .env`
3. Modify the `.env` file to configure the MySQL database.
   - Update the `{USER}` and `{PASSWORD}` fields with your MySQL username and password.
4. Deploy the database
   - `npx prisma db push`

#### Start the Production Server

```bash
node server/dist/server.js
```

### Docker Deployment

#### Build the Docker Image

```bash
docker build -t tmu-connect .
```

#### Run the Docker Container

Replace the `DATABASE_URL` environment variable with your MySQL database URL.

```bash
docker run -d -p 5000:5000 -e DATABASE_URL=mysql://root:password@localhost:3306/TMU-connect tmu-connect
```

### Additional Configuration

- To run the application in production mode, set the `NODE_ENV` environment variable to `production`. The default mode for docker is `production`.
- To configure the server port, set the `PORT` environment variable. The default port is `5000`.
- To enable SSL for the server, set the `SSL` environment variable to `true`. This only enables SSL checks and does not provide SSL certificates.

## Setting Up a Local Development Environment

Ensure you have all the prerequisites installed before proceeding.

### Install Dependencies

```bash
npm install --prefix client
npm install --prefix server
```

### Setup the Database

1. Change directory to the server folder.
   - `cd server`
2. Copy the `.env.example` file to `.env`.
   - `cp .env.example .env`
3. Modify the `.env` file to configure the MySQL database.
   - Update the `{USER}` and `{PASSWORD}` fields with your MySQL username and password.
4. Deploy the database
   - `npx prisma db push`

### Start the Development Server

```bash
npm start --prefix server
```
