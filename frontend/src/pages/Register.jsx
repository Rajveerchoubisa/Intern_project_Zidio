
  import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Select,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Navbar from '../components/Navbar.jsx'
  
  export default function Register() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
  
        if (res.ok) {
          toast({
            title: 'Registered successfully!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          navigate('/login');
        } else {
          toast({
            title: 'Registration failed',
            description: data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'An error occurred',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
        <>
        <Navbar />
        <Box
        maxW="sm"
        mx="auto"
        mt={12}
        p={8}
        bg="orange.50"
        borderWidth="4px"
        borderStyle="dashed"
        borderColor="blue.400"
        borderRadius="2xl"
        boxShadow="lg"
      >
        <Heading
          mb={6}
          size="xl"
          textAlign="center"
          fontFamily="'Comic Neue', cursive"
          color="blue.700"
        >
          🎉 Join the Squad!
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input
                name="name"
                onChange={handleChange}
                borderColor="blue.300"
                _focus={{ borderColor: 'blue.500' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Email</FormLabel>
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                borderColor="blue.300"
                _focus={{ borderColor: 'blue.500' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                borderColor="blue.300"
                _focus={{ borderColor: 'blue.500' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Role</FormLabel>
              <Select
                name="role"
                onChange={handleChange}
                value={formData.role}
                borderColor="blue.300"
                _focus={{ borderColor: 'blue.500' }}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              fontFamily="'Comic Neue', cursive"
              fontWeight="bold"
              _hover={{ bg: 'blue.600', transform: 'scale(1.05)' }}
              transition="0.3s"
            >
              Register 🦹‍♀️
            </Button>
          </Stack>
        </form>
      </Box>
      </>
    );
  }
  