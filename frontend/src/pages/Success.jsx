import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2} color="green.500">
        🎉 Payment Successful!
      </Heading>
      <Text color={"gray.500"} mb={6}>
        Thank you for your purchase. Your order is being processed.
      </Text>

      <Link to="/shop">
        <Button colorScheme="green" variant="solid">
          Continue Shopping
        </Button>
      </Link>
    </Box>
  );
};

export default Success;
