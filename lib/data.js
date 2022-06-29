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

// Helper function. Called by fetchCommentsOfComments (below) - note that these
// are recursive...
const getComments = async (parent_id, prisma) => {
  let comments = await prisma.comment.findMany({
    where: {
      parentId: parent_id,
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

  if (comments.length) {
    comments = await fetchCommentsOfComments(comments, prisma);
  }

  return comments;
};

// Helper function to enable comments on comments
const fetchCommentsOfComments = async (comments, prisma) => {
  const fetchCommentsOfComment = async (comment, prisma) => {
    comment.comments = await getComments(comment.id, prisma);
    return comment;
  };

  return Promise.all(
    comments.map((comment) => {
      comment = fetchCommentsOfComment(comment, prisma);
      return comment;
    })
  );
};

// Returns the post data for the given post ID.   Check for parentId: null ensures that
// comments without children appear at the top level of the chain of comments.
export const getPost = async (id, prisma) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: {
        where: {
          parentId: null,
        },
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

  if (post.comments) {
    post.comments = await fetchCommentsOfComments(post.comments, prisma);
  }

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

// Returns the user's profile information.
export const getUser = async (name, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  return user;
};

// Return the posts for a given user.
export const getPostsFromUser = async (user_name, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        name: user_name,
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })

  return posts
}