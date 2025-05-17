import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import CustomerNavbar from "../components/CustomerNavbar";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";



const Shop = () => {
  const { addToCart } = useCart();
  const toast = useToast();

  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the products state
      } catch (error) {
        setError(error.message); // Set error message if there's an issue
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <CustomerNavbar />
      <Box
        bgGradient="linear(to-br, #FEE140, #FA709A)"
        minH="100vh"
        py={10}
        px={8}
      >
        <Heading
          fontFamily="Comic Sans MS"
          textAlign="center"
          mb={10}
          color="white"
        >
          Superhero Store 🦸‍♀️
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {products.map((product) => {
            const handleAddToCart = () => {
              addToCart(product);
              toast({
                title: "Added to cart",
                description: `${product.name} has been added to your cart.`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
            };

            return (
              <Box
                key={product.id}
                bg="white"
                p={5}
                rounded="xl"
                shadow="xl"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
              >
                <VStack spacing={3}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    boxSize="200px"
                    objectFit="cover"
                  />
                  <Text fontSize="xl" fontWeight="bold">
                    {product.title}
                  </Text>
                  <Text fontSize="lg" color="green.600">
                    {product.price}
                  </Text>
                  <Button colorScheme="purple" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Shop;
