# Appealing Signup/Login Page

## Introduction

- This project repo can be forked or cloned and instantly be installed into your project application with minimal effort.

- Utilizing React Typescript, React Router, Tailwind CSS, Shadcn UI, Framer Motion, and Aceternity UI. This project provides a simplistic and modern look

![SignUp](https://live.staticflickr.com/65535/53665681325_a91226281c.jpg)

![Login](https://live.staticflickr.com/65535/53664353417_6acbfdf77a.jpg)

![User Logged In](https://live.staticflickr.com/65535/53664353412_7cc1a7150b.jpg)

## Installation & Setup

1.  **Clone the Repo:**

```
git clone https://github.com/Castro19/Authorize-Users-project.git
```

2. **Move into the client folder:**

```
cd Authorize-Users-project/$'\025'client
```

2. **Install Packages:**

```
npm install
```

3. **Configure Firebase:**

- Go to your [firebase console](https://console.firebase.google.com/u/0/)

  - Click `add project`
  - Follow their guidelines

- Once you create your project, a config ffile should be ready for you.

  - In your newly created Firebase project, click on the left sidebar for the option of `Project Settings`.
  - Scroll down until you are at the `Your Apps section` where you will `Add app`
  - Select the web with </> symbols. Click
  - Here you should get the `SDK setup and configuration`
  - Copy your firebaseConfig options.

- Now that you have your firebase configuration file, go into the sample.env and update the changes here.

- Finally rename `sample.env` to be `.env`

4. **Run the Project**

```
npm run dev
```
