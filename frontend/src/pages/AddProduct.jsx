// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Select,
//   VStack,
//   Heading,
//   Image,
//   HStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     stock: "",
//     category: "",
//     ratings: "",
//   });
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const files = e.target.files;
//     const uploaders = [];

//     for (let i = 0; i < files.length; i++) {
//       const data = new FormData();
//       data.append("file", files[i]);
//       data.append("upload_preset", "Zidio_Ecommerce"); // 👈 Set your Cloudinary Upload Preset
//       data.append("cloud_name", "rajveercloud");        // 👈 Set your Cloudinary Cloud Name
      
//       uploaders.push(
//         axios.post(`https://api.cloudinary.com/v1_1/rajveercloud/image/upload`, data)
//           .then((res) => {
//             setImages((prev) => [...prev, res.data.secure_url]);
//           })
//           .catch((err) => console.error("Image upload failed:", err))
//       );
//     }

//     await Promise.all(uploaders);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const productData = { ...formData, images };

//       await axios.post("http://localhost:5000/api/products", productData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       navigate("/admin/products");
//     } catch (error) {
//       console.error("Failed to add product:", error);
//     }
//   };

//   return (
//     <Box p={8}>
//       <Heading mb={6}>Add New Product</Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4} align="stretch">
//           <FormControl isRequired>
//             <FormLabel>Product Name</FormLabel>
//             <Input name="name" value={formData.name} onChange={handleChange} />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Price (₹)</FormLabel>
//             <Input type="number" name="price" value={formData.price} onChange={handleChange} />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Description</FormLabel>
//             <Textarea name="description" value={formData.description} onChange={handleChange} />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Stock</FormLabel>
//             <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
//           </FormControl>

//           <FormControl isRequired>
//             <FormLabel>Category</FormLabel>
//             <Select name="category" value={formData.category} onChange={handleChange}>
//               <option value="">Select Category</option>
//               <option value="T-shirt">T-shirt</option>
//               <option value="Mug">Mug</option>
//               <option value="Hoodie">Hoodie</option>
//             </Select>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Upload Images</FormLabel>
//             <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
//           </FormControl>

//           {images.length > 0 && (
//             <HStack spacing={4}>
//               {images.map((img, idx) => (
//                 <Image key={idx} src={img} alt="Uploaded Image" boxSize="100px" objectFit="cover" />
//               ))}
//             </HStack>
//           )}

//           <Button type="submit" colorScheme="teal" mt={4}>
//             Add Product
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default AddProduct;




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
  useToast,
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
    ratings: "",
  });
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Zidio_Ecommerce");
    data.append("cloud_name", "rajveercloud");

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/rajveercloud/image/upload`, data);
      setImage(res.data.secure_url);
    } catch (err) {
      toast({
        title: "Image Upload Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Please upload an image.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const productData = {
        ...formData,
        image,
        price: Number(formData.price),
        stock: Number(formData.stock),
        ratings: Number(formData.ratings) || 0,
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Product Added Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/admin/products");
    } catch (error) {
      toast({
        title: "Failed to add product.",
        description: error.response?.data?.message || "Server error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Product Add Error:", error);
    }
  };

  return (
    <Box p={8} maxW="700px" mx="auto">
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
              <optgroup label="T-Shirt Types">
                <option value="Oversized">Oversized</option>
                <option value="Acid Wash">Acid Wash</option>
                <option value="Graphic Printed">Graphic Printed</option>
                <option value="Solid Color">Solid Color</option>
                <option value="Polo T-Shirts">Polo T-Shirts</option>
                <option value="Sleeveless">Sleeveless</option>
                <option value="Long Sleeve">Long Sleeve</option>
                <option value="Henley">Henley</option>
                <option value="Hooded">Hooded</option>
                <option value="Crop Tops">Crop Tops (Women)</option>
              </optgroup>
              <optgroup label="Comic-Based Themes">
                <option value="Marvel Universe">Marvel Universe</option>
                <option value="DC Comics">DC Comics</option>
                <option value="Anime Superheroes">Anime Superheroes</option>
                <option value="Classic Comics">Classic Comics</option>
                <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                <option value="Video Game Characters">Video Game Characters</option>
                <option value="Custom Fan Art">Custom Fan Art</option>
              </optgroup>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Ratings (out of 5)</FormLabel>
            <Input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              step="0.1"
              max="5"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Upload Product Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && (
              <HStack mt={2}>
                <Image src={image} boxSize="100px" objectFit="cover" alt="Preview" />
              </HStack>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={uploading}
            loadingText="Uploading..."
            mt={4}
          >
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProduct;
