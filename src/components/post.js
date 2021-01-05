import LumenButtons from "./vote-buttons";

const Post = ({ post }) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <LumenButtons post={post} />
      ...
    </HStack>
  );
};

export default Post;