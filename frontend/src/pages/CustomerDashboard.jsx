// src/pages/CustomerDashboard.jsx

import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bgGradient="linear(to-r, purple.500, pink.400)" minH="100vh" color="white" py={20}>
      <VStack spacing={6}>
        <Text fontSize="4xl" fontWeight="bold">🎉 Welcome, {user?.name}!</Text>
        <Text fontSize="xl">You’re logged in as a Customer 🛒</Text>
        <Button colorScheme="whiteAlpha" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default CustomerDashboard;
