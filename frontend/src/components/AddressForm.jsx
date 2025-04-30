// src/components/AddressForm.jsx
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  const AddressForm = ({ onAddressSaved }) => {
    const [address, setAddress] = useState({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
  
    const toast = useToast();
  
    useEffect(() => {
      const fetchAddress = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.shippingAddress?.address) {
          setAddress(res.data.shippingAddress);
          if (onAddressSaved) onAddressSaved(res.data.shippingAddress);
        }
      };
      fetchAddress();
    }, []);
  
    const handleChange = (e) => {
      setAddress({ ...address, [e.target.name]: e.target.value });
    };
  
    const handleSave = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.put("http://localhost:5000/api/auth/update-address", address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast({
          title: "Address saved successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        if (onAddressSaved) onAddressSaved(address);
      } catch (err) {
        toast({
          title: "Error saving address",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input name="fullName" value={address.fullName} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input name="address" value={address.address} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input name="city" value={address.city} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input name="postalCode" value={address.postalCode} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input name="country" value={address.country} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSave}>
            Save Address
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default AddressForm;
  