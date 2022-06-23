# Reddit Clone

This week's project is to create a Reddit clone.

## Initial Setup

1. Initial setup of Next.js and NextAuth.js is the same as prior weeks.  The completed project for reference is here: https://github.com/flaviocopes/bootcamp-2022-week-11-reddit
2. Setup Prisma as before, and add tables for Subreddit.

## Endpoints

1. We'll be using the following endpoints - 1 static and 3 dynamic endpoints:
```
Homepage
The URL is `/` 

Subreddit URL
`/r/<SUBREDDIT NAME>/` is a URL of a subreddit, like `/r/javascript` or `/r/aww`. 

New post URL
`/r/<SUBREDDIT NAME>/submit` is a URL to submit a new post to a subreddit, like `/r/pets/submit`

Single post URL
A single post URL is `/r/<SUBREDDIT NAME>/comments/<UNIQUE POST ID>/`

User profile URL
`/u/<USERNAME>` is the URL of a user profile, like `/u/flaviocopes`
```

## Fake Data

1. Install the "faker" module:
```
npm install -D @faker-js/faker
```
2. In pages/utils.js, there will be 3 buttons for generating fake users, random subreddits, random posts and comments from random users, and the ability to clean up the database.  This time, the code is better and makes use of an array of tasks to generate the buttons.
3. Handle the APIs in pages/api/utils.js.