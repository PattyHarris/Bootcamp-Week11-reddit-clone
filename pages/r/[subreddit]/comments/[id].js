import prisma from "lib/prisma";

import timeAgo from "lib/timeago";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { getPost, getSubreddit, getVotes, getVote } from "lib/data.js";
import NewComment from "components/NewComment";
import Comments from "components/Comments";

export default function Post({ subreddit, post, votes, vote }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!post) {
    return <p className="text-center p-5">Post does not exist 😞</p>;
  }

  // Helper function to update the up or down vote.
  const sendVote = async (up) => {
    await fetch("/api/vote", {
      body: JSON.stringify({
        post: post.id,
        up,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    router.reload(window.location.pathname);
  };

  return (
    <>
      <header className="bg-black text-white h-12 flex pt-3 px-5 pb-2">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <p className="grow"></p>
      </header>
      <header className="bg-black text-white h-12 flex pt-3 px-5 pb-20">
        <Link href={`/r/${subreddit.name}`}>
          <a className="text-center underline">/r/{subreddit.name}</a>
        </Link>
        <p className="ml-4 text-left grow">{subreddit.description}</p>
      </header>

      <div className="flex flex-row mb-4  px-10 justify-center">
        <div className="flex flex-col mb-4 border-t border-l border-b border-3 border-black p-10 bg-gray-200 my-10 text-center">
          <div
            className="cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              sendVote(true);
            }}
          >
            {vote?.up ? "⬆" : "↑"}
          </div>{" "}
          <div>{votes}</div>
          <div
            className="cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              sendVote(false);
            }}
          >
            {!vote ? "↓" : vote?.up ? "↓" : "⬇"}
          </div>{" "}
        </div>

        <div className="flex flex-col mb-4 border-t border-r border-b border-3 border-black p-10 pl-0 bg-gray-200 my-10">
          <div className="flex flex-shrink-0 pb-0 ">
            <div className="flex-shrink-0 block group ">
              <div className="flex items-center text-gray-800">
                Posted by {post.author.name}{" "}
                <p className="mx-2 underline">
                  {timeAgo.format(new Date(post.createdAt))}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-1">
            <a className="flex-shrink text-2xl font-bold color-primary width-auto">
              {post.title}
            </a>
            {post.image && (
              <img
                className="flex-shrink text-base font-normal color-primary width-auto mt-2"
                src={post.image}
                alt="Comment image"
              />
            )}
            <p className="flex-shrink text-base font-normal color-primary width-auto mt-2">
              {post.content}
            </p>
          </div>
          {session ? (
            <NewComment post={post} />
          ) : (
            <p className="mt-5">
              <Link href="/api/auth/signin">
                <a className="mr-1 underline">Login</a>
              </Link>
              to add a comment
            </p>
          )}
          <Comments comments={post.comments} post={post} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const subreddit = await getSubreddit(context.params.subreddit, prisma);

  let post = await getPost(parseInt(context.params.id), prisma);
  post = JSON.parse(JSON.stringify(post));

  let votes = await getVotes(parseInt(context.params.id), prisma);
  votes = JSON.parse(JSON.stringify(votes));

  let vote = await getVote(
    parseInt(context.params.id),
    session?.user.id,
    prisma
  );
  vote = JSON.parse(JSON.stringify(vote));

  return {
    props: {
      subreddit,
      post,
      votes,
      vote,
    },
  };
}
