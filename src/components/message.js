import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import LumenButton from "./lumenbutton";

const Messages = ({ messages }) => {
  return (
    <HStack key={message.id} w="100%" alignItems="flex-start">
      <VoteButtons message={message} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text>{message.formValue}</Text>
      </Box>
    </HStack>
  );
};

export default Post;