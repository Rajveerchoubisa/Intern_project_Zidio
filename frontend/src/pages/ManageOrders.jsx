import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Select,
  useToast,
  Text,
  Stack,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error fetching orders",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Order status updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchOrders();
    } catch (err) {
      toast({
        title: "Failed to update status",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Spinner size="xl" m={10} />;

  return (
    <Box p={6}>
      <Heading mb={6}>Manage Orders</Heading>

      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <Table variant="simple" colorScheme="gray">
          <Thead bg="gray.100">
            <Tr>
              <Th>Customer</Th>
              <Th>Items</Th>
              <Th>Total (₹)</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Update Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.user?.name || "Guest"}</Td>
                <Td>
                  <Stack spacing={1}>
                    {order.orderItems.map((item, index) => (
                      <Box key={index}>
                        Product ID: {item.product} × {item.quantity}
                      </Box>
                    ))}
                  </Stack>
                </Td>
                <Td>{order.totalPrice}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Shipped"
                        ? "blue"
                        : "orange"
                    }
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      order.paymentStatus === "Paid" ? "green" : "red"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </Td>
                <Td>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ManageOrders;
