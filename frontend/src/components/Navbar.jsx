// src/components/Navbar.jsx

import {
  Box,
  Flex,
  Button,
  Heading,
  Spacer,
  
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  // Show navbar only on home page

  return (
    <Box
      bgGradient="linear(to-r, #FDC830, #F37335)"
      px={8}
      py={4}
      boxShadow="lg"
      borderBottom="4px solid #FF4E50"
    >
      <Flex align="center">
        {/* Left: Brand Title */}
        <Heading
          fontSize="2xl"
          fontFamily="'Comic Sans MS', cursive"
          color="white"
        >
          SuperEcommerce 🛍️
        </Heading>

        <Spacer />

        {/* Right: Login & Signup Buttons */}
        <Flex gap={4}>
          <Link to="/login">
            <Button colorScheme="purple" variant="solid">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="yellow" variant="outline" borderColor="white" color="white">
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
