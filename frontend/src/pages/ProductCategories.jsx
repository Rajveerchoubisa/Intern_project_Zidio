// pages/Shop.jsx
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  VStack,
  Input,
  Select,
  useToast,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import CustomerNavbar from "../components/CustomerNavbar";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const MotionBox = motion(Box);

const ProductCate = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filteredList = products;
    if (search) {
      filteredList = filteredList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filteredList = filteredList.filter((p) => p.category === category);
    }
    setFiltered(filteredList);
  }, [search, category, products]);

  const categories = [
    "Marvel Universe",
    "DC Comics",
    "Anime Superheroes",
    "Classic Comics",
    "Sci-Fi & Fantasy",
    "Video Game Characters",
    "Custom Fan Art",
  ];

  return (
    <>
      <CustomerNavbar />
      <Box px={8} py={10} bgGradient="linear(to-br, #2b1055, #7597de)">
        <Heading textAlign="center" color="white" mb={6} fontFamily="Bangers">
          Explore the Superhero Multiverse Store 🦸‍♂️
        </Heading>

        <Flex gap={4} mb={6} justify="center" flexWrap="wrap">
          <Input
            placeholder="Search Superhero Merch..."
            onChange={(e) => setSearch(e.target.value)}
            w={["100%", "300px"]}
            bg="white"
          />
          <Select
            placeholder="Filter by Category"
            onChange={(e) => setCategory(e.target.value)}
            w={["100%", "200px"]}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </Flex>

        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {filtered.map((product) => (
            <MotionBox
              key={product._id}
              p={5}
              rounded="2xl"
              shadow="xl"
              bg="white"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <VStack spacing={3}>
                <Image
                  src={product.image}
                  alt={product.name}
                  boxSize="200px"
                  objectFit="cover"
                  rounded="md"
                />
                <Link to={`/product/${product._id}`}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    _hover={{ color: "blue.400" }}
                  >
                    {product.name}
                  </Text>
                </Link>
                <Text fontSize="md" color="gray.600">
                  {product.category}
                </Text>
                <Text fontSize="xl" color="green.500">
                  ₹{product.price}
                </Text>
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    addToCart(product);
                    toast({
                      title: "Added to cart",
                      description: `${product.name} added!`,
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                >
                  Add to Cart
                </Button>
                <button
                  onClick={() => {
                    isInWishlist(product._id)
                      ? removeFromWishlist(product._id)
                      : addToWishlist(product);
                  }}
                >
                  {isInWishlist(product._id) ? "❤️" : "🤍"}
                </button>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProductCate;
