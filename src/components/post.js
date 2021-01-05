import VoteButtons from "./vote-buttons";

const Post = ({ post }) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      ...
    </HStack>
  );
};

export default Post;