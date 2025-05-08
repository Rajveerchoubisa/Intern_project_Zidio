import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Image,
    Button,
    VStack,
  } from '@chakra-ui/react';
  import {useCart} from '../context/CartContext'
  import CustomerNavbar from '../components/CustomerNavbar';
  import { useToast } from '@chakra-ui/react';
  
  const tshirtProducts = [
    {
      name: 'Oversized Tee',
      price: '₹699',
      image: 'https://via.placeholder.com/200x200.png?text=Oversized+Tee',
    },
    {
      name: 'Graphic Printed',
      price: '₹799',
       image: 'https://via.placeholder.com/200x200.png?text=Graphic+Tee',
    },
    {
      name: 'Polo T-Shirt',
      price: '₹999',
      image: 'https://via.placeholder.com/200x200.png?text=Polo+Tee',
    },
    {
      name: 'Crop Top (Women)',
      price: '₹599',
      image: 'https://via.placeholder.com/200x200.png?text=Crop+Top',
    },
  ];
  
  const themeProducts = [
    {
      name: 'Marvel Universe Tee',
      price: '₹899',
      image: 'https://via.placeholder.com/200x200.png?text=Marvel+Tee',
    },
    {
      name: 'Anime Hero Tee',
      price: '₹799',
      image: 'https://via.placeholder.com/200x200.png?text=Anime+Tee',
    },
    {
      name: 'Classic Comic Tee',
      price: '₹849',
      image: 'https://via.placeholder.com/200x200.png?text=Classic+Tee',
    },
    {
      name: 'Star Wars Tee',
      price: '₹999',
      image: 'https://via.placeholder.com/200x200.png?text=Sci-Fi+Tee',
    },
  ];
  
  const ProductCard = ({ name, price, image }) => { 
    
    const {addToCart} = useCart();
    const toast = useToast();

    const handleAddToCart = () => {
        addToCart({name,price,image});

        toast({
            title: "Added to cart",
            description: `${name} has been added to your cart.`,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top", 
          });
    }

    return (

    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
      _hover={{ transform: 'scale(1.02)', transition: '0.2s ease-in-out' }}
    >
      <Image src={image} alt={name} objectFit="cover" w="100%" h="200px" />
      <Box p="4">
        <Heading size="md" mb="2">
          {name}
        </Heading>
        <Text fontWeight="bold" mb="3" color="teal.600">
          {price}
        </Text>
        <Button colorScheme="purple" onClick={handleAddToCart} w="full">
          Add to Cart
        </Button>
      </Box>
    </Box>
  )
};
  
  const ComicCollection = () => {
    return (
        <>
        <CustomerNavbar /> 
      <Box bg="gray.100" py={10} px={5} minH="100vh">
        <VStack spacing={10} maxW="7xl" mx="auto">
          {/* T-Shirts Section */}
          <Box w="full">
            <Heading size="lg" mb={6} color="red.400">
              👕 T-Shirt Types
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {tshirtProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </SimpleGrid>
          </Box>
  
          {/* Comic Themes Section */}
          <Box w="full">
            <Heading size="lg" mb={6} color="blue.500">
              🎨 Comic-Based Themes
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {themeProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
      </>
    );
  };
  
  export default ComicCollection;
  