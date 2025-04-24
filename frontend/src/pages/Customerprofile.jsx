import {
  Box,
  Avatar,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaUserEdit } from 'react-icons/fa';

const CustomerProfile = () => {
  // Example data (replace with real data from backend or context)
  const user = {
    name: 'Rajveer Choubisa',
    email: 'rajveer@example.com',
    role: 'Customer',
  };

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-br, #ffecd2, #fcb69f)"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="2xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Avatar
          size="2xl"
          name={user.name}
          src=""
          mb={4}
          bg="purple.400"
          color="white"
        />
        <Heading
          fontSize="2xl"
          mb={2}
          fontFamily="'Comic Sans MS', cursive"
          color="purple.600"
        >
          {user.name}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={1}>
          {user.email}
        </Text>
        <Text fontWeight="bold" color="gray.700" mb={6}>
          Role: <span style={{ color: '#FF4E50' }}>{user.role}</span>
        </Text>
        <Button
          leftIcon={<Icon as={FaUserEdit} />}
          colorScheme="teal"
          variant="solid"
        >
          Edit Profile
        </Button>
      </Box>
    </Flex>
  );
};

export default CustomerProfile;
