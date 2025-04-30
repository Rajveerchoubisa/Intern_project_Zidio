import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Heading,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploaders = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "Zidio_Ecommerce"); // 👈 Set your Cloudinary Upload Preset
      data.append("cloud_name", "rajveercloud");        // 👈 Set your Cloudinary Cloud Name
      
      uploaders.push(
        axios.post(`https://api.cloudinary.com/v1_1/rajveercloud/image/upload`, data)
          .then((res) => {
            setImages((prev) => [...prev, res.data.secure_url]);
          })
          .catch((err) => console.error("Image upload failed:", err))
      );
    }

    await Promise.all(uploaders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const productData = { ...formData, images };

      await axios.post("http://localhost:5000/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Add New Product</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price (₹)</FormLabel>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Stock</FormLabel>
            <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Mug">Mug</option>
              <option value="Hoodie">Hoodie</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Upload Images</FormLabel>
            <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          </FormControl>

          {images.length > 0 && (
            <HStack spacing={4}>
              {images.map((img, idx) => (
                <Image key={idx} src={img} alt="Uploaded Image" boxSize="100px" objectFit="cover" />
              ))}
            </HStack>
          )}

          <Button type="submit" colorScheme="teal" mt={4}>
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProduct;
