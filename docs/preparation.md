# Present Steps (for me)

## Intro

- Explain overview of project, what it is, what it does, and what it will showcase
  - A full stack MERN web app hosted on HTTP (build web app before I attack it)
  - Implements auth & RBAC with the ability for users to create secrets that they can share w/ other users on the app
- Authentication, RBAC, and and XSS attack

## Authentication (bcrypt and JWT)

1. Show the empty array for the mongoDB schema including users and secrets
2. Two users sign up (attacker and Bob (victim) )
3. Show the mongoDB schema and how the users now store the hashed passwords
4. Show the console log and the JWT assoicated with the user
5. Optional (signout and sign back in as proof)

## Access Control

### Part 1: Normal Update & Explain Roles

1. Victim creates a public secret.
   - Explain the roles for a secret
   - Explain the 3 features for an admin (write, delete, and assign permissions)
2. Victim grants the attacker write access.
3. Attacker can now update the message.

### Part 2: RESTClient request using boomerang

- Explain process how I implemented the logic on the front-end before and how an attacker could still make a request to the server using a RESTClient or a bug.

  - Attacker Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImF0dGFja2VyIiwidXNlcklkIjoiMzVlMWU2NDAtZThkMy00NzM1LWFmNzMtMGMyZDdjMmJmOTc0IiwiaWF0IjoxNzE3NTI5OTE5LCJleHAiOjE3MTc1MzM1MTl9.UM5p4FXswHuh0wJB4IKy5u6mENfzW8J0QpT47DhA9V4
  - Victim Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InZpY3RpbTEyMyIsInVzZXJJZCI6IjZmNzZlMTExLWUzMDMtNDVjZi05NTI1LTY1MzE5ZjhhY2YwOCIsImlhdCI6MTcxNzUyOTkzNiwiZXhwIjoxNzE3NTMzNTM2fQ.lr9Cp9YKC0ucamLdoWeiRm0N--ZuJMOpLkrDnycQ_5M

1. Go on [boomerang](chrome-extension://eipdnjedkpcnlmmdfdkgfpljanehloah/workspace)

- Explain how I am making a request to the server without the client.
- Insert secretId to the URL
- Make the request without inserting the JWT token.

2. Insert the JWT token for the attacker and run it
   - Explain how the logic on the server checks the userID from the JWT to make sure the user making the request has the correct permissions
3. Showcase the bug that could also occur where the victim has attacker role to admin and removes it before they click the remove button.
   - Attacker will receive an error message on client
4. Insert victim JWT token into the header and delete secret on client or just delete it by pressing the button

## Cross-Site scripting

1. Attacker will now create a public secret with the following string as the description:

```
<img src="#" onerror="window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'">
```

2. Make sure it is public and submit it.
3. Victim will now refresh his page and get a funny surprise.
4. Fix this file to prevent XSS Scripting, [file](/client/src/components/secrets/Secret/Secret.tsx)
5. Showcase how the XSS attack is fixed and how React escapes these characters to prevent XSS attacks

- **Note**: Showcase the accidental attack I did on [https://wordcounter.net/](https://wordcounter.net/)
