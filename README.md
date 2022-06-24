# Reddit Clone

This week's project is to create a Reddit clone.

## Initial Setup

1. Initial setup of Next.js and NextAuth.js is the same as prior weeks. The completed project for reference is here: https://github.com/flaviocopes/bootcamp-2022-week-11-reddit
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

2. In pages/utils.js, there will be 3 buttons for generating fake users, random subreddits, random posts and comments from random users, and the ability to clean up the database. This time, the code is better and makes use of an array of tasks to generate the buttons.
3. Handle the APIs in pages/api/utils.js.

## Show Posts on the Homepage

1. Add a 'lib/data.js' file to manage all the data access functions, starting with 'getPosts'.
2. Components added for Post and Posts.
3. 'index.js' updated to use new components.
4. Flavio likes to use 'export default function MyFunction(someInput) {}' instead of using arrow functions:

```
const MyFunction = (someInput) => {

}
export default MyFunction
```

The reason is for debugging purposes - function name is available in the former and not the latter.

## Implement Signup, Login, Logout, and User Selection

1. Add a signup link in the 'header' of 'index.js' Flavio uses the CSS 'href', but that generates a warning to use 'next/link', which I have done.
2. Fixed the padding and case on the 'header' elements.
3. Login is connected to mailtrap.io as before. Added the changes from Week 10 to next.config.js to eliminate any issues with 'home'.
4. Mailtrap.io was not receiving the requests for some reason, so credentials have been reset....
5. All users will have a username....
6. In this section, we'll add the 'pages/setup.js' and 'api/setup.js' to handle the login and logout. The 'setup' form also ensures that the user name is at least 5 characters and is alpha/numeric.
