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

## Implement the Single Subreddit View

1.  Here we will only see posts for a given subreddit.
2.  We create an 'r' folder under pages for the dynamic routing since our paths are '/r/...' which is weird. Under the folder 'r' is the page '[subreddit].js' - a dynamic page that receives the name of a subreddit as the parameter. This is available in 'getServerSideProps()' in 'params.subreddit'.
3.  Add 2 functions to 'data.js':' getSubreddit()' and 'getPostsFromSubreddit()'. Note that in 'getPostsFromSubreddit()' where clause, the Prisma filter on relations is used. This could have been done with a where clause subredditName: subreddit - the former was used to introduce another feature.
4.  Add a link from the subreddit page back to the home page in '[subbreddit].js'
5.  Add a link from a post to the subreddit in 'Post.js'.

## Create the Single Post View

1. Here we'll see posts and comments. The URL here is '/r/<SUBREDDIT NAME>/comments/<UNIQUE POST ID>/'. Under the 'r' folder, we'll need a '[subreddit]' and under that, we'll need a 'comments' folder. Inside the 'comments' folder, add the '[id].js' file. This file will contain the post and subreddit data.
2. Access the data we need here with a new function in data.js: 'getPost()'.
3. The end result is that from the home page, the timestamp and title of the post is a link to the post. UI here is terrible.....''

## Create a Consistent Header

1. In this section, we're creating a header bar for each page that provides a somewhat consistent interface for each page.
2. Just by chance, the subreddit description I tested was 2 lines, which made it disappear in the given space. I needed to increase the padding to 20 (instead of 2).

## Provide Comment Input

1. Add UI to enable people to add their own comments - this will occur in the 'Post' view.
2. Add a 'NewComment' component which will be included in the 'Post' component. The requests are handled by 'api/comment.js'. We may also allow comments to comments, so the 'NewComment' component can be re-used for that purpose.
3. Import the 'NewComment' component to '[id].js' and add to the page. Conditional added to check that the user is logged in.
4. To test the 'login' check, open an incognito window - that will not have the session set and will indicate that the user needs to log in...

## Show the Post Comments

1. Add a 'Comments' component to handle showing comments. The new component is imported into '[id].js' and added to the JSX at the bottom.
2. 'getPost' in data.js is updated to include the comments for a given post.

## Add Up and Down Votes on Posts

1. In '[id].js', addition JSX is added to add the UI. The rules regarding the arrow is that the user can only vote once (e.g. can't vote up and then vote down).
2. Changes in the section are a bit confusing, but in essence the changes will be in 'pages/r/[subreddit]/comments/[id].js' and data.js. The api is handled in a new handler, 'pages/api/vote.js'.
3. In the 'vote.js' file, to ensure that only one vote is allowed per user, we use the 'upsert()' method provided by Prisma to update or insert a value if it’s not there.
4. Add 'getVote' to data.js - this is then used in '[id].js' 'getServerSideProps'. Note the use of 'session?' - in case the user is not logged in...here we also could have used 'findFirst' instead of 'findMany'....
5. Note that in 'getServerSideProps'm '{params}' is changed to '{context}' in the argument of the function because we need it for' getSession()'.
6. The 'fat arrow' is used to indicate that the vote is the logged in user's vote...otherwise, we show the 'small arrow'....seems weird.

## Allow Users to Create Posts

1. Apparently Reddit uses 'submit' as the URL/page for creating new posts, so that's what we'll be doing. Either way, 'submit' isn't the best...
2. The new page 'pages/r/[subreddit]/submit.js' is created to handle the URL '/r/<subreddit>/submit'. The request is sent using the API '/api/post'. Again, not the best ....
3. The component that is exported from 'submit.js' is 'NewPost'...I kid you not.
4. Only show the page if the user is logged in...
5. The new post form page is linked from the subreddit page. We're mimicking Reddit where you have a fake form and when you click it, you’re redirected to the '/submit' URL. See changes to 'pages/r/[subreddit].js'. Again, only show the form if the user is logged in...
6. How this all works, is that for a given subreddit, you'll see a "post' text area, and when you click on it, you're taking to a form page where you actually enter the post....
7. Instead of showing the user that they are not logged in, we could instead redirect them to the login page...
