import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Stack,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      console.log("✅ Products Fetched:", res.data);  // Debug log
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Product deleted",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      // Refresh product list after deletion
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Delete failed:", err);
      toast({
        title: "Error deleting product",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box p={8} textAlign="center">
        <Text>No Products Found 😢</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading fontFamily="Comic Sans MS">Manage Products</Heading>
        <Button as={RouterLink} to="/admin/products/add-product" colorScheme="teal">
          Add New Product
        </Button>
      </Stack>

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={product.images && product.images.length > 0 ? product.images[0] : ""}
                  alt={product.name}
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>₹{product.price}</Td>
              <Td>{product.stock}</Td>
              <Td>
                <Stack direction="row">
                  <Button as={RouterLink} to={`/admin/products/edit/${product._id}`} colorScheme="blue" size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(product._id)} colorScheme="red" size="sm">
                    Delete
                  </Button>
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminProducts;
