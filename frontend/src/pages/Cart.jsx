// import {
//   Box,
//   Heading,
//   VStack,
//   Image,
//   Text,
//   Button,
//   HStack,
//   IconButton,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   FormControl,
//   FormLabel,
//   useToast,
// } from "@chakra-ui/react";
// import { useCart } from "../context/CartContext";
// import { AddIcon, MinusIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Cart = () => {
//   const {
//     cartItems = [],
//     removeFromCart,
//     clearCart,
//     incrementQty,
//     decrementQty,
//   } = useCart();

//   const [address, setAddress] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });
//   const [userHasAddress, setUserHasAddress] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.shippingAddress) {
//           setAddress(res.data.shippingAddress);
//           setUserHasAddress(true);
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch user address:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   const total = cartItems.reduce((acc, item) => {
//     const price = parseInt(item.price?.toString().replace("₹", "") || "0");
//     return acc + price * (item.quantity || 1);
//   }, 0);

//   const handleCheckout = async () => {
//     if (!userHasAddress) return onOpen();

//     try {
//       const res = await axios.post("http://localhost:5000/api/stripe/create-checkout-session", {
//         cartItems: cartItems.map(({_id, name, price, image, quantity }) => ({
//           productId: _id,
//           name,
//           price: parseInt(price.toString().replace("₹", "")),
//           image,
//           quantity,
//         })),
//         shippingAddress: address,
//       });
//       window.location.href = res.data.url;
//     } catch (err) {
//       console.error("❌ Checkout failed:", err);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put("http://localhost:5000/api/auth/update-address", address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserHasAddress(true);
//       toast({
//         title: "Address saved",
//         status: "success",
//         duration: 2000,
//         isClosable: true,
//       });
//       onClose();
//       handleCheckout();
//     } catch (err) {
//       toast({
//         title: "Failed to save address",
//         status: "error",
//         duration: 2000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box p={8} minH="100vh" bg="gray.50">
//       <Heading mb={6}>🛒 Your Cart</Heading>

//       {cartItems.length === 0 ? (
//         <Text>No items in cart.</Text>
//       ) : (
//         <VStack spacing={6} align="stretch">
//           {cartItems.map((item, idx) => (
//             <HStack
//               key={idx}
//               p={4}
//               borderWidth="1px"
//               borderRadius="lg"
//               bg="white"
//               spacing={6}
//               align="center"
//             >
//               <Image src={item.image} boxSize="100px" />
//               <Box flex="1">
//                 <Text fontWeight="bold">{item.title}</Text>
//                 <Text>Price: {item.price}</Text>
//                 <HStack mt={2}>
//                   <IconButton
//                     size="sm"
//                     icon={<MinusIcon />}
//                     onClick={() => decrementQty(item.title)}
//                   />
//                   <Text>{item.quantity || 1}</Text>
//                   <IconButton
//                     size="sm"
//                     icon={<AddIcon />}
//                     onClick={() => incrementQty(item.title)}
//                   />
//                 </HStack>
//               </Box>
//               <Button
//                 size="sm"
//                 colorScheme="red"
//                 onClick={() => removeFromCart(item.title)}
//               >
//                 Remove
//               </Button>
//             </HStack>
//           ))}

//           <Box textAlign="right" mt={6}>
//             <Text fontSize="xl" fontWeight="bold">
//               Total: ₹{total}
//             </Text>
//             <HStack justify="end" mt={4}>
//               <Button colorScheme="red" onClick={clearCart}>
//                 Clear Cart
//               </Button>
//               <Button colorScheme="green" onClick={handleCheckout}>
//                 Proceed to Checkout
//               </Button>
//             </HStack>
//           </Box>
//         </VStack>
//       )}

//       {/* Address Modal */}
//       <Modal isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Shipping Address</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <VStack spacing={4}>
//               <FormControl isRequired>
//                 <FormLabel>Full Name</FormLabel>
//                 <Input
//                   value={address.fullName}
//                   onChange={(e) =>
//                     setAddress((prev) => ({ ...prev, fullName: e.target.value }))
//                   }
//                 />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel>Address</FormLabel>
//                 <Input
//                   value={address.address}
//                   onChange={(e) =>
//                     setAddress((prev) => ({ ...prev, address: e.target.value }))
//                   }
//                 />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel>City</FormLabel>
//                 <Input
//                   value={address.city}
//                   onChange={(e) =>
//                     setAddress((prev) => ({ ...prev, city: e.target.value }))
//                   }
//                 />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel>Postal Code</FormLabel>
//                 <Input
//                   value={address.postalCode}
//                   onChange={(e) =>
//                     setAddress((prev) => ({ ...prev, postalCode: e.target.value }))
//                   }
//                 />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel>Country</FormLabel>
//                 <Input
//                   value={address.country}
//                   onChange={(e) =>
//                     setAddress((prev) => ({ ...prev, country: e.target.value }))
//                   }
//                 />
//               </FormControl>
//             </VStack>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="teal" mr={3} onClick={handleSaveAddress}>
//               Save & Continue
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Cart;



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
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [userHasAddress, setUserHasAddress] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.shippingAddress) {
          setAddress(res.data.shippingAddress);
          setUserHasAddress(true);
        }
      } catch (err) {
        console.error("❌ Failed to fetch user address:", err);
      }
    };

    const fetchCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/coupons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleCheckout = async () => {
    if (!userHasAddress) return onOpen();

    try {
      const res = await axios.post("http://localhost:5000/api/stripe/create-checkout-session", {
        cartItems: cartItems.map(({ _id, name, price, image, quantity }) => ({
          productId: _id,
          name,
          price: parseInt(price.toString().replace("₹", "")),
          image,
          quantity,
        })),
        shippingAddress: address,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error("❌ Checkout failed:", err);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/update-address", address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserHasAddress(true);
      toast({
        title: "Address saved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      handleCheckout();
    } catch (err) {
      toast({
        title: "Failed to save address",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
                <Text fontWeight="bold">{item.title}</Text>
                <Text>Price: {item.price}</Text>
                <HStack mt={2}>
                  <IconButton
                    size="sm"
                    icon={<MinusIcon />}
                    onClick={() => decrementQty(item.title)}
                  />
                  <Text>{item.quantity || 1}</Text>
                  <IconButton
                    size="sm"
                    icon={<AddIcon />}
                    onClick={() => incrementQty(item.title)}
                  />
                </HStack>
              </Box>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => removeFromCart(item.title)}
              >
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
                      <Text fontSize="sm" color="gray.500">
                        {coupon.discount}% OFF
                      </Text>
                    </Box>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => applyCouponCode(coupon.code)}
                    >
                      Apply
                    </Button>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>

          <Box textAlign="right" mt={6}>
            {appliedCoupon && (
              <Text fontSize="md" color="green.600">
                Applied Coupon: {appliedCoupon.code} ({appliedCoupon.discount}% OFF)
              </Text>
            )}
            <Text fontSize="xl" fontWeight="bold">
              Total: ₹{total}
            </Text>
            <HStack justify="end" mt={4}>
              <Button colorScheme="red" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button colorScheme="green" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </HStack>
          </Box>
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shipping Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  value={address.address}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, postalCode: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  value={address.country}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, country: e.target.value }))
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveAddress}>
              Save & Continue
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;

