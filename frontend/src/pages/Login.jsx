import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Navbar from '../components/Navbar.jsx'
  
  export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          withCredentials: true 
          
        });
        console.log("Login response:", res.data); 
        const data = await res.json();
  
        if (res.ok) {
          localStorage.setItem('User', JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          }));
          localStorage.setItem('token', data.token);
          
          // localStorage.setItem('token', data.token);
          // localStorage.setItem('User', JSON.stringify(data.user));

          toast({
            title: 'Login successful!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
  
          // Redirect based on role
          //console.log('User role:', data.role);
          if (data.user.role === 'admin'){
            navigate('/admin/dashboard');
          } 
          else if(data.user.role === 'customer') {
            navigate('/shop'); 
          }
        } else {
          toast({
            title: 'Login failed',
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
        minH="100vh"
        bgGradient="linear(to-br, yellow.100, pink.100)"
        fontFamily="'Comic Neue', cursive"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box
          maxW="sm"
          w="full"
          p={8}
          bg="white"
          borderWidth="5px"
          borderStyle="dashed"
          borderColor="purple.400"
          borderRadius="2xl"
          boxShadow="2xl"
        >
          <Heading
            mb={6}
            size="xl"
            textAlign="center"
            fontFamily="'Comic Neue', cursive"
            color="purple.700"
          >
            🔐 Login Portal
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  borderColor="purple.300"
                  _focus={{ borderColor: 'purple.600' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  borderColor="purple.300"
                  _focus={{ borderColor: 'purple.600' }}
                />
              </FormControl>
              <Button
                mt={4}
                colorScheme="purple"
                type="submit"
                fontWeight="bold"
                _hover={{ transform: 'scale(1.05)' }}
              >
                Login 🦸‍♂️
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      </>
    );
  }