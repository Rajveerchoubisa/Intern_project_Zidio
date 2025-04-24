import {
    Box,
    Heading,
    VStack,
    Image,
    Text,
    Button,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  import { useCart } from "../context/CartContext";
  import { AddIcon, MinusIcon } from "@chakra-ui/icons";
  import axios from 'axios'


  
  const Cart = () => {
    const {
      cartItems,
      removeFromCart,
      clearCart,
      incrementQty,
      decrementQty,
    } = useCart();

    if (!cartItems || !Array.isArray(cartItems)) {
      return <Text>Something went wrong. Cart is not loading properly.</Text>;
    }
    console.log("Cart Items Debug:", cartItems);
    const total = cartItems.reduce(
      (acc, item) =>
        acc + parseInt(item.price.replace("₹", "")) * item.quantity,
      0
    );

    const handleCheckout = async () => {
      
      try {
        const response = await axios.post("http://localhost:5000/api/create-checkout-session", {
          cartItems: cartItems.map(({ title, price, image, quantity }) => ({
            title,
            price: parseInt(price.replace("₹", "")), // Convert to number
            image,
            quantity
          }))
        });
    
        window.location.href = response.data.url;
      } catch (err) {
        console.error("Checkout failed:", err);
      }
    };
  
    return (
      <Box p={8} minH="100vh">
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
                    <Text>{item.quantity}</Text>
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
  
            <Box textAlign="right" mt={6}>
              <Text fontSize="xl" fontWeight="bold">
                Total: ₹{total}
              </Text>
              <HStack justify="end" mt={4}>
                <Button colorScheme="red" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button colorScheme="green"  onClick={handleCheckout}>Proceed to Checkout</Button>
              </HStack>
            </Box>
          </VStack>
        )}
      </Box>
    );
  };
  
  export default Cart;
  