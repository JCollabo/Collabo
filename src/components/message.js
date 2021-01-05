import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";

const Message = ({ message }) => {
  return (
    <HStack key={message.id} w="100%" alignItems="flex-start">
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text>{message.title}</Text>
      </Box>
    </HStack>
  );
};


import VoteButtons from "./vote-buttons";

const Message = ({ message }) => {
  return (
    <HStack key={message.id} w="100%" alignItems="flex-start">
      <VoteButtons message={message} />
      ...
    </HStack>
  );
};


export default Post;