import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();

  const { user } = useUserContext();
  const { data: post, isPending: isLoadingPost } = useGetPostById(id || "");

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isLoadingPost ? (
        <Loader />
      ) : (
        <>
          <div className="post_details-card">
            <img src={post?.imageUrl} alt="post" className="post_details-img" />
            <div className="post_details-info">
              <div className="flex-between w-full">
                <Link
                  to={`/profile/${post?.creator?.$id}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={
                      post?.creator?.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                  />

                  <div className="flex flex-col">
                    <p className="subtle-semibold lg:body-bold text-light-1">
                      {post?.creator.name}
                    </p>
                    <div className="flex items-center gap-2 text-light-3">
                      <p className="tiny-bold lg:small-regular">
                        {multiFormatDateString(post.$createdAt)}
                      </p>{" "}
                      -{" "}
                      <p className="tiny-bold lg:small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex-center">
                  <Link
                    to={`/update-post/${post?.$id}`}
                    className={`${user?.id !== post?.creator.$id && "hidden"}`}
                  >
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={`ghost_details-delete_btn ${
                      user?.id !== post?.creator.$id && "hidden"
                    }`}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              </div>

              <hr className="border w-full border-dark-4/80" />

              <div className="small-medium lg:base-medium flex flex-col flex-1 w-full">
                <p>{post?.caption}</p>
                <ul className="flex flex-wrap gap-1 mt-2">
                  {post?.tags.map((tag: string) => (
                    <li key={tag} className="">
                      <Badge className="bg-primary-500 text-light-1">
                        #{tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
