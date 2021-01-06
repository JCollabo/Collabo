import { DrawerCloseButton, IconButton, Text, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const db = firebase.firestore();

const VoteButtons = ({ post }) => {
  const [isVoting, setVoting] = useState(false);
  const [votedMessage, setVotedMessage] = useState([]);

  useEffect(() => {
    // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [0];

    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedMessage(previousVotes);
  }, []);

  const handleDisablingOfVoting = (messageId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedMessage;
    previousVotes.push(messageId);

    setVotedMessage(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedMessage));
  };

  const handleClick = async (type) => {
    setVoting(true);

    // Do calculation to save the vote.
    let upVotesCount = message.upVotesCount;
    let downVotesCount = message.downVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection("Message").doc(message.id).set({
      title: message.title,
      upVotesCount,
      downVotesCount,
      createdAt: message.createdAt,
      updatedAt: date.toUTCString(),
    });

    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(message.id);

    setVoting(false);
  };

  const checkIfMessageIsAlreadyVoted = () => {
    if (votedMessage.indexOf(message.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="purple"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfMessageIsAlreadyVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {message.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton
          size="lg"
          colorScheme="yellow"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()}
        />
        <Text bg="gray.100" rounded="md" w="100%" p={1}>
          {message.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;
