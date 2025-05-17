import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  Badge,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Spinner size="xl" m={10} />;

  return (
    <Box p={6} minH="100vh" bg="gray.50">
      <Heading mb={6}>📦 My Orders</Heading>

      {orders.length === 0 ? (
        <Text>No orders yet.</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {orders.map((order) => (
            <Box key={order._id} bg="white" p={4} rounded="lg" shadow="md">
              <Text fontWeight="bold" mb={1}>
                Order ID: {order._id}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </Text>

              <HStack mt={2}>
                <Badge colorScheme="purple">{order.status}</Badge>
                <Badge
                  colorScheme={order.paymentStatus === "Paid" ? "green" : "red"}
                >
                  {order.paymentStatus}
                </Badge>
                {order.isDelivered && (
                  <Badge colorScheme="blue">Delivered</Badge>
                )}
              </HStack>

              <Divider my={3} />
              <Text fontWeight="medium" mb={2}>
                Items:
              </Text>
              <VStack align="start" spacing={1}>
                {order.orderItems.map((item, idx) => (
                  <Text key={idx}>
                    Product :{item.product?.name || "N/A"} × {item.quantity}
                  </Text>
                ))}
              </VStack>

              <Text mt={3}>Total: ₹{order.totalPrice}</Text>
              <Text fontSize="sm" color="gray.600">
                Shipping to: {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default MyOrders;
