import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  useToast,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

const StatCard = ({ label, value }) => (
  <Stat
    p={5}
    shadow="md"
    borderWidth="1px"
    rounded="lg"
    bg="white"
    textAlign="center"
  >
    <StatLabel fontSize="lg" color="gray.600">
      {label}
    </StatLabel>
    <StatNumber fontSize="2xl">{value}</StatNumber>
  </Stat>
);

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        toast({
          title: "Error fetching analytics",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  if (loading) {
    return <Spinner size="xl" m={10} />;
  }

  if (!data) {
    return <Text>Error loading analytics data</Text>;
  }

  return (
    <Box p={6}>
      <Heading mb={6}>📊 Admin Analytics</Heading>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={6}>
        <StatCard label="Total Sales" value={`₹${data.totalSales}`} />
        <StatCard label="Total Orders" value={data.totalOrders} />
        <StatCard label="Total Users" value={data.totalUsers} />
        <StatCard label="Total Products" value={data.totalProducts} />
      </SimpleGrid>

      <Divider my={10} />
      <Heading size="md" mb={4}>
        🔥 Top Products
      </Heading>
      <VStack align="start" spacing={3}>
        {data.topProducts.map((product, idx) => (
          <Box key={idx} bg="white" p={4} rounded="lg" shadow="sm" w="full">
            <Text fontWeight="bold">{product.name}</Text>
            <Text color="gray.600">Orders: {product.orderCount}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminAnalytics;
