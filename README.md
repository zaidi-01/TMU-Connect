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
   - *Items Wanted:* Students can post ads seeking specific items.
   - *Items for Sale:* Students can post ads selling specific items.
   - *Academic Services:* Section for offerings like tutoring, textbook exchanges, and study groups.

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

## Setting Up a Local Development Environment

### Prerequisites

1. **Node.js**
   - Install Node.js from the [official website](https://nodejs.org/).
   - Verify the installation by running `node -v` and `npm -v` in the terminal.
2. **MySQL**
   - Install MySQL from the [official website](https://dev.mysql.com/downloads/).

### Clone the Repository

```bash
git clone https://github.com/zaidi-01/TMU-Connect
cd TMU-Connect
```

### Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Setup the Database

1. Modify the `.env` file to configure the MySQL database.
   - Update the `{USER}` and `{PASSWORD}` fields with your MySQL username and password.
2. Deploy the database
   - `npx prisma db push`

### Start the Development Server

```bash
npm start
```
