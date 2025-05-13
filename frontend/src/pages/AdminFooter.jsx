import {
    Box,
    Container,
    Text,
    Stack,
    Link,
    HStack,
    Icon,
  } from "@chakra-ui/react";
  import { FaDiscord, FaEnvelope, FaTools } from "react-icons/fa";
  
  const AdminFooter = () => {
    return (
      <Box bg="gray.800" color="gray.300" mt={10}>
        <Container maxW="6xl" py={6}>
          <Stack direction={["column", "row"]} justify="space-between">
            <Text fontWeight="bold">🛠️ Zidio Admin Panel</Text>
            <HStack spacing={4}>
              <Link href="mailto:admin@zidio.com">
                <Icon as={FaEnvelope} boxSize={4} /> <Text>Email Support</Text>
              </Link>
              <Link href="https://discord.gg/your-server" isExternal>
                <Icon as={FaDiscord} boxSize={4} /> <Text>Admin Discord</Text>
              </Link>
              <Link href="/admin/documentation">
                <Icon as={FaTools} boxSize={4} /> <Text>Docs</Text>
              </Link>
            </HStack>
          </Stack>
          <Text fontSize="xs" textAlign="center" mt={4} color="gray.500">
            Admin tools © {new Date().getFullYear()} Zidio
          </Text>
        </Container>
      </Box>
    );
  };
  
  export default AdminFooter;
  