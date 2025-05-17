import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const {
    cartItems = [],
    removeFromCart,
    clearCart,
    incrementQty,
    decrementQty,
  } = useCart();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedAddresses(res.data.shippingAddress || []);
      } catch (err) {
        console.error("❌ Failed to fetch addresses:", err);
      }
    };

    const fetchCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/coupons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableCoupons(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch coupons", err);
      }
    };

    fetchUser();
    fetchCoupons();
  }, []);

  const applyCouponCode = (code) => {
    const coupon = availableCoupons.find((c) => c.code === code);
    if (coupon) {
      setAppliedCoupon(coupon);
      toast({
        title: "Coupon applied!",
        description: `${coupon.code} gives you ${coupon.discount}% off`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const rawTotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price?.toString().replace("₹", "") || "0");
    return acc + price * (item.quantity || 1);
  }, 0);

  const discountAmount = appliedCoupon ? (rawTotal * appliedCoupon.discount) / 100 : 0;
  const total = rawTotal - discountAmount;

  const handleSaveAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`, {
        shippingAddress: newAddress,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Address added", status: "success", duration: 2000 });
      setNewAddress({ fullName: "", address: "", city: "", postalCode: "", country: "" });
      setAddingNew(false);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedAddresses(res.data.shippingAddress || []);
    } catch (err) {
      toast({ title: "Failed to save address", status: "error", duration: 2000 });
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/auth/delete-address/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Address deleted", status: "info", duration: 2000 });
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedAddresses(res.data.shippingAddress || []);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleCheckout = async () => {
    if (selectedIndex === null) {
      toast({ title: "Please select an address", status: "warning", duration: 2000 });
      return;
    }
    const shippingAddress = savedAddresses[selectedIndex];
    
    try {
      const mappedCart = cartItems.map((item) => ({
        productId: item._id,
        name: item.name || item.title || "Product", // fallback name
        price: parseInt(item.price?.toString().replace(/[^\d]/g, "") || "0", 10),
        image: typeof item.image === "string" ? item.image : "", // ensure string
        quantity: item.quantity || 1,
      }));
  
      console.log("🚀 Sending to Stripe:", mappedCart);
  
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-checkout-session`, {
        cartItems: mappedCart,
        shippingAddress,
        coupon: appliedCoupon?.code || null,   
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error("❌ Checkout failed:", err);
    }
  };

  return (
    <Box p={8} minH="100vh" bg="gray.50">
      <Heading mb={6}>🛒 Your Cart</Heading>

      {cartItems.length === 0 ? (
        <Text>No items in cart.</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {cartItems.map((item, idx) => (
            <HStack
              key={idx}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              spacing={6}
              align="center"
            >
              <Image src={item.image} boxSize="100px" />
              <Box flex="1">
                <Text fontWeight="bold">{item.name}</Text>
                <Text>Price: {item.price}</Text>
                <HStack mt={2}>
                  <IconButton size="sm" icon={<MinusIcon />} onClick={() => decrementQty(item._id)} />
                  <Text>{item.quantity || 1}</Text>
                  <IconButton size="sm" icon={<AddIcon />} onClick={() => incrementQty(item._id)} />
                </HStack>
              </Box>
              <Button size="sm" colorScheme="red" onClick={() => removeFromCart(item._id)}>
                Remove
              </Button>
            </HStack>
          ))}

          <Box p={4} bg="white" borderRadius="lg" borderWidth="1px">
            <Text fontWeight="bold" mb={2}>Available Coupons:</Text>
            {availableCoupons.length === 0 ? (
              <Text fontSize="sm">No coupons available.</Text>
            ) : (
              <VStack align="start">
                {availableCoupons.map((coupon) => (
                  <HStack
                    key={coupon._id}
                    spacing={4}
                    p={2}
                    borderWidth="1px"
                    borderRadius="md"
                    width="100%"
                    justify="space-between"
                  >
                    <Box>
                      <Text fontWeight="semibold">{coupon.code}</Text>
                      <Text fontSize="sm" color="gray.500">{coupon.discount}% OFF</Text>
                    </Box>
                    <Button size="sm" colorScheme="blue" onClick={() => applyCouponCode(coupon.code)}>
                      Apply
                    </Button>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>

          {/* Saved Addresses */}
          <Box mt={8} p={4} bg="white" borderRadius="lg" borderWidth="1px">
            <Heading size="sm" mb={2}>Shipping Addresses</Heading>
            {savedAddresses.length > 0 ? (
              <RadioGroup onChange={(val) => setSelectedIndex(parseInt(val))} value={String(selectedIndex)}>
                <VStack align="start">
                  {savedAddresses.map((addr, i) => (
                    <HStack key={i} spacing={4} align="start">
                      <Radio value={String(i)}>
                        <Box>
                          <Text><strong>{addr.fullName}</strong></Text>
                          <Text>{addr.address}, {addr.city}</Text>
                          <Text>{addr.postalCode}, {addr.country}</Text>
                        </Box>
                      </Radio>
                      <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => handleDeleteAddress(i)} />
                    </HStack>
                  ))}
                </VStack>
              </RadioGroup>
            ) : (
              <Text>No saved addresses.</Text>
            )}
            <Button mt={4} onClick={() => setAddingNew(true)} colorScheme="blue">Add New Address</Button>
          </Box>

          <Box textAlign="right" mt={6}>
            {appliedCoupon && (
              <Text fontSize="md" color="green.600">
                Applied Coupon: {appliedCoupon.code} ({appliedCoupon.discount}% OFF)
              </Text>
            )}
            <Text fontSize="xl" fontWeight="bold">Total: ₹{total}</Text>
            <HStack justify="end" mt={4}>
              <Button colorScheme="red" onClick={clearCart}>Clear Cart</Button>
              <Button colorScheme="green" onClick={handleCheckout}>Proceed to Checkout</Button>
            </HStack>
          </Box>
        </VStack>
      )}

      <Modal isOpen={addingNew} onClose={() => setAddingNew(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Shipping Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {Object.keys(newAddress).map((key) => (
                <FormControl key={key} isRequired>
                  <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                  <Input
                    value={newAddress[key]}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, [key]: e.target.value }))}
                  />
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSaveAddress} colorScheme="teal" mr={3}>Save</Button>
            <Button variant="ghost" onClick={() => setAddingNew(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;


