import { IconButton, Text, VStack } from "@chakra-ui/core";
import React, { useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";

const LumenButtons = ({ message }) => {
  const handleClick = async (type) => {
    // Do calculation to save the vote.
    let lumens = message.lumens;

    const date = new Date();

    if (type === "lumen") {
      lumens = lumens + 1;
    }

    await db.collection("messages").doc(post.id).set({
      text: formValue,
      lumens,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });
  };

  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Lumen"
          icon={<FiArrowUp />}
          onClick={() => handleClick("lumen")}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {post.lumens}
        </Text>
      </VStack>
    </>
  );
};

export default LumenButtons;