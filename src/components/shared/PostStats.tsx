import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
  showCommentAndShare?: boolean;
};

const PostStats = ({
  post,
  userId,
  showCommentAndShare = true,
}: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  // states
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // hooks
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [savedPostRecord]);

  // handler
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id != userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    /* e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    }

    savePost({ postId: post.$id, userId });
    setIsSaved(true); */
  };
  return (
    <div
      className={`flex justify-between items-center z-20 ${
        showCommentAndShare === false && "mt-1"
      }`}
    >
      <div className="flex gap-4 md:gap-8">
        <div className="flex items-center">
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            height={20}
            width={20}
            onClick={handleLikePost}
            className="cursor-pointer"
          />
          <p className="small-medium lg:base-medium ml-2">{likes.length}</p>
        </div>
        {showCommentAndShare && (
          <>
            {" "}
            <div className="flex items-center">
              <img
                src="/assets/icons/comment.png"
                alt="like"
                height={24}
                width={24}
                onClick={() => {}}
                className="cursor-pointer"
              />
              <p className="small-medium lg:base-medium ml-2">0</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/icons/share.svg"
                alt="like"
                height={24}
                width={24}
                onClick={() => {}}
                className="cursor-pointer"
              />
              <p className="small-medium lg:base-medium ml-2">0</p>
            </div>{" "}
          </>
        )}
      </div>
      <div
        className={`flex gap-2 mr-2 ${showCommentAndShare === false && "ml-3"}`}
      >
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save"
            height={20}
            width={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
