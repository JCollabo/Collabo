import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import VoteButtons from "./vote-buttons";

const Message = ({ Message }) => {
  return (
    <HStack key={Message.id} w="100%" alignItems="flex-start">
      <VoteButtons Message={Message} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text>{Message.text}</Text>
      </Box>
    </HStack>
  );
};

export default Message;
