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
  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  
  const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      description: "",
      stock: "",
      category: "",
    });
    const [images, setImages] = useState([]);
  
    const token = localStorage.getItem("token"); // 👈 get token from local storage
  
    // Fetch product data
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
          const { name, price, description, stock, category, image } = res.data;
          setFormData({ name, price, description, stock, category });
          if (image) setImages([image]);
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      };
      fetchProduct();
    }, [id]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleImageUpload = async (e) => {
      const files = e.target.files;
      const uploaders = [];
  
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", "Zidio_Ecommerce");
        data.append("cloud_name", "rajveercloud");
  
        uploaders.push(
          axios
            .post("https://api.cloudinary.com/v1_1/rajveercloud/image/upload", data)
            .then((res) => {
              setImages([res.data.secure_url]); // replace image
            })
            .catch((err) => console.error("Image upload failed:", err))
        );
      }
  
      await Promise.all(uploaders);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const productData = {
          ...formData,
          image: images[0] || "",
        };
  
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        navigate("/admin/products");
      } catch (err) {
        console.error("Failed to update product:", err);
      }
    };
  
    return (
      <Box p={8}>
        <Heading mb={6}>Edit Product</Heading>
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
              <FormLabel>Upload Image</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </FormControl>
  
            {images.length > 0 && (
              <HStack spacing={4}>
                {images.map((img, idx) => (
                  <Image key={idx} src={img} alt="Uploaded" boxSize="100px" objectFit="cover" />
                ))}
              </HStack>
            )}
  
            <Button type="submit" colorScheme="teal" mt={4}>
              Update Product
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default EditProduct;
  