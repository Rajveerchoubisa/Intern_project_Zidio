// src/pages/AdminDashboard.jsx

import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="purple.600" color="white" p={6}>
        <VStack spacing={5} align="stretch">
          <Text fontSize="xl" fontWeight="bold">Admin Panel</Text>
          <Button as={RouterLink} to="/admin/products" colorScheme="purple" variant="outline">
            Manage Products
          </Button>
          <Button as={RouterLink} to="/admin/orders" colorScheme="purple" variant="outline">
            Manage Orders
          </Button>
          <Button as={RouterLink} to="/admin/users" colorScheme="purple" variant="outline">
            Manage Users
          </Button>
          <Button as={RouterLink} to="/admin/coupons" colorScheme="purple" variant="outline">
            Manage Coupons
          </Button>
          <Button as={RouterLink} to="/admin/analytics" colorScheme="purple" variant="outline">
            Analytics
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={10}>
        <Text fontSize="3xl" fontWeight="bold" mb={6}>Welcome, Admin!</Text>
        <Text>Manage your e-commerce store efficiently 🚀</Text>
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
