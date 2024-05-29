# Present Steps (for me)

## Authentication

1. Show the empty array for the mongoDB schema including users and secrets
2. Two users sign up (attacker and Bob (victim) )
3. Show the mongoDB schema and how the users now store the hashed passwords
4. Optional (signout and sign back in as proof)

## Access Control

1. Bob (victim user) creates a public secret
2. He grants the attacker write access for a second.
3. Attacker can now update the message.
4. Attacker will try to write to it again but before they are able to, Bob removes permissions for the attacker
5. Attacker will receive an error message on client **(implement this)**
6. Bob's secret remains unchanged from the attacker's second update.

## Cross-Site scripting

1. Attacker will now create a public secret with the following string as the description:

```
<img src="#" onerror="window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'">
```

2. Make sure it is public and submit it.
3. Bob will now refresh his page and get a funny surprise.
