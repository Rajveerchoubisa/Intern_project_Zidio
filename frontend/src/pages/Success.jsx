import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Image,
  Divider,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    console.log("🌟 Stripe session ID from URL:", sessionId);

    if (sessionId) {
      axios
        .get(`http://localhost:5000/api/stripe/session/${sessionId}`)
        .then((res) => {
          console.log("✅ Order fetched:", res.data);
          setOrder(res.data);
        })
        .catch((err) => {
          console.error("❌ Order fetch failed:", err);
          setError(true);
        })
        .finally(() => setLoading(false));
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Fetching your order...</Text>
      </Box>
    );
  }

  if (error || !order || !Array.isArray(order.cart)) {
    return (
      <Box textAlign="center" py={20}>
        <Heading>Something went wrong 😢</Heading>
        <Text>We couldn’t confirm your order.</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" py={10} px={6} bg="gray.50">
      <Box maxW="lg" mx="auto" bg="white" p={6} borderRadius="lg" shadow="md">
        <Heading color="green.500" mb={4}>✅ Payment Successful</Heading>
        <Text fontSize="lg" mb={4}>Thanks for shopping with <b>Zidio</b>! Here's your order:</Text>

        <VStack spacing={4} align="stretch">
          {order.cart.map((item, index) => (
            <Box key={index} p={3} borderWidth="1px" borderRadius="md">
              <HStack>
                <Image src={item.image} boxSize="60px" />
                <Box>
                  <Text fontWeight="bold">{item.title}</Text>
                  <Text>₹{item.price} × {item.quantity}</Text>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>

        <Divider my={4} />
        <Text fontSize="lg" fontWeight="bold">Total Paid: ₹{order.total}</Text>

        <Button as={RouterLink} to="/shop" mt={6} colorScheme="purple" width="full">
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default Success;
