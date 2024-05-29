# Appealing Signup/Login Page

## Introduction

- In the web applications that I have previously built, I have always had a strong emphasis on building and launching features at a rapid pace without much consideration to implementing and testing the application's security.
- In this project, I plan on changing this and building a simple web application with a strong emphasis on security.

## Features

1. **Authorization**: Utilizing Open source software such as `Bcrypt` to hash user passwords for authentication and store the hashed passwords in MongoDB.
2. **Access Control**: Allowing users to securely grant and remove specific privileges based on Role Based Access Control (`RBAC`).
3. **Penetration Testing**: Trying to break my application in any way by using Cross-site scripting (`XSS`)

## Tech Stack

- **Frontend**: React Typescript and JSON WEB tokens (JWT)
  - Additional: React Router, Tailwind CSS, Shadcn UI, Framer Motion, and Aceternity UI
- **Backend**: Node JS, Express, Bcrypt
- **Database**: MongoDB

## Installation & Setup

1.  **Clone the Repo:**

    ```
    git clone https://github.com/Castro19/Authorize-Users-project.git
    ```

2.  **Install Packages in root folder:**

    ```
    npm install
    ```

3.  **Install Packages on Client and Server:**

    ```
    npm run install: all
    ```

4.  **Run the Project**

    ```
    npm start
    ```

## Project Display

![SignUp](/docs/imgs/signup.png)

![Login](/docs/imgs/login.png)

![User Logged In](/docs/imgs/home.png)

![Setting up Access Control](/docs/imgs/permissions.png)
