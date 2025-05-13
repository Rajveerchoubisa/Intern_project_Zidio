import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    HStack,
    Icon,
    Divider,
  } from "@chakra-ui/react";
  import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <Box bg="gray.900" color="gray.200" mt={10}>
        <Container maxW="6xl" py={10}>
          <Stack
            direction={["column", "row"]}
            justify="space-between"
            spacing={8}
            align="flex-start"
          >
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                🦸‍♂️ Zidio Store
              </Text>
              <Text fontSize="sm" color="gray.400">
                Starry Night & Comic Superheroes Apparel
              </Text>
            </Box>
  
            <Stack spacing={2}>
              <Text fontWeight="bold" mb={1}>
                Explore
              </Text>
              <Link href="/categories">T-Shirts</Link>
              <Link href="/categories">Collections</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </Stack>
  
            <Stack spacing={2}>
              <Text fontWeight="bold" mb={1}>
                Support
              </Text>
              <Link href="/faq">FAQ</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </Stack>
  
            <Box>
              <Text fontWeight="bold" mb={2}>
                Follow Us
              </Text>
              <HStack spacing={4}>
                <Link href="https://instagram.com" isExternal>
                  <Icon as={FaInstagram} boxSize={5} />
                </Link>
                <Link href="https://twitter.com" isExternal>
                  <Icon as={FaTwitter} boxSize={5} />
                </Link>
                <Link href="https://facebook.com" isExternal>
                  <Icon as={FaFacebook} boxSize={5} />
                </Link>
              </HStack>
            </Box>
          </Stack>
  
          <Divider my={6} borderColor="gray.600" />
          <Text fontSize="sm" textAlign="center" color="gray.500">
            © {new Date().getFullYear()} Zidio. All rights reserved.
          </Text>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
  