// src/pages/Home.jsx

import { Box, Button, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import superhero from '../assets/superhero.png'

export default function Home() {
  return (
    <>
    <Navbar />
    <Box
      className="min-h-screen bg-gradient-to-r from-purple-900 to-black text-white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={10}
        alignItems="center"
        justifyContent="center"
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Box maxW="lg">
          <Heading fontSize="5xl" fontWeight="bold" mb={4}>
            Welcome to Zidio
          </Heading>
          <Text fontSize="xl" mb={6}>
            Discover your favorite <span className="text-yellow-400">superhero</span> merch,
            tech gadgets, and more – all in one place.
          </Text>
          <Stack direction="row" spacing={4} justify={{ base: 'center', md: 'start' }}>
            <Link to="/login">
              <Button colorScheme="yellow" size="lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" colorScheme="yellow" size="lg">
                Join Us
              </Button>
            </Link>
          </Stack>
        </Box>
         <Image
          src={superhero}
          alt="Hero Banner"
          boxSize={{ base: '500px', md: '500px' }}
          className="rounded-xl shadow-lg"
        />
      </Stack>
    </Box>
    </>
  );
}
