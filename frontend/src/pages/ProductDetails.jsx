// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <Box p={10}>
      <VStack spacing={5} align="start">
        <Image src={product.image} boxSize="300px" />
        <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
        <Text>{product.description}</Text>
        <Text fontSize="lg" color="green.500">₹{product.price}</Text>
        <Text>Rating: ⭐ {product.ratings}</Text>
        <Button colorScheme="teal">Add to Cart</Button>
      </VStack>
    </Box>
  );
};

export default ProductDetails;
