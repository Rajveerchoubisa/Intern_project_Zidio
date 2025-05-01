import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  HStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const toast = useToast();

  const token = localStorage.getItem("token");

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      toast({ title: "Failed to fetch coupons", status: "error" });
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/coupons",
        { code, discount, expiryDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: "Coupon created", status: "success" });
      setCode("");
      setDiscount("");
      setExpiryDate("");
      fetchCoupons();
    } catch (err) {
      toast({ title: "Failed to create coupon", status: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/coupons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Coupon deleted", status: "info" });
      fetchCoupons();
    } catch (err) {
      toast({ title: "Failed to delete", status: "error" });
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={6}>Manage Coupons</Heading>

      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input
          placeholder="Discount %"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <Input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleCreate}>
          Create
        </Button>
      </HStack>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Discount</Th>
            <Th>Expires</Th>
            <Th>Used</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon._id}>
              <Td>{coupon.code}</Td>
              <Td>{coupon.discount}%</Td>
              <Td>{new Date(coupon.expiryDate).toLocaleDateString()}</Td>
              <Td>{coupon.usageCount}</Td>
              <Td>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(coupon._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageCoupons;
