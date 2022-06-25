import prisma from "./prisma";

export const getPosts = async (prisma) => {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return posts;
};

// Returns the details of a subreddit.
export const getSubreddit = async (name, prisma) => {
  return await prisma.subreddit.findUnique({
    where: {
      name,
    },
  });
};

// Returns the posts of a specific subreddit.
export const getPostsFromSubreddit = async (subreddit, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: subreddit,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return posts;
};

// Returns the post data for the given post ID.
export const getPost = async (id, prisma) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return post;
};
