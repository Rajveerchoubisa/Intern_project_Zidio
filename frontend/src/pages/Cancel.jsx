import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2} color="red.500">
        ❌ Payment Cancelled
      </Heading>
      <Text color={"gray.500"} mb={6}>
        Something went wrong or you cancelled the payment.
      </Text>

      <Link to="/cart">
        <Button colorScheme="red" variant="solid">
          Return to Cart
        </Button>
      </Link>
    </Box>
  );
};

export default Cancel;
