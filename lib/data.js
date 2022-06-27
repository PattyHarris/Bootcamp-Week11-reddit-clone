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
      comments: {
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          author: true,
        },
      },
    },
  });

  return post;
};

// Returns the number of votes for a post.
export const getVotes = async (post, prisma) => {
  const upvotes = await prisma.vote.count({
    where: {
      postId: post,
      up: true,
    },
  });
  const downvotes = await prisma.vote.count({
    where: {
      postId: post,
      up: false,
    },
  });

  return upvotes - downvotes;
};

// Returns the user's vote
export const getVote = async (post_id, user_id, prisma) => {
  const vote = await prisma.vote.findMany({
    where: {
      postId: post_id,
      authorId: user_id,
    },
  });

  if (vote.length === 0) return null;
  return vote[0];
};
