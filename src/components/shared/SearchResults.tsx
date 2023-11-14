import { Models } from "appwrite";
import GridPostList from "./GridPostList";
import Loader from "./Loader";

type SearchResultsProps = {
  isSearchLoading: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchLoading,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchLoading) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="w-full text-light-4 mt-10 text-center">No Results Found</p>
  );
};

export default SearchResults;
