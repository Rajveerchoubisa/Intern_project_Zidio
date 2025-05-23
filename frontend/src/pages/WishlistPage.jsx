import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const bgCard = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  if (wishlistItems.length === 0) {
    return (
      <Box
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl" fontWeight="bold" color="white">
          🦸 No items in your wishlist.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10"
    >
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={10}
        className="text-yellow-400"
      >
        ⭐ Your Wishlist
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {wishlistItems.map((item) => (
          <Box
            key={item._id}
            bg={bgCard}
            color={textColor}
            borderRadius="xl"
            boxShadow="xl"
            p={4}
            className="hover:shadow-2xl transition duration-300"
          >
            <Image
              src={item.image}
              alt={item.name}
              borderRadius="md"
              mb={4}
              boxSize="150px"
              objectFit="contain"
              mx="auto"
            />
            <Stack spacing={2} textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
              <Text fontSize="md" color="yellow.400" fontWeight="semibold">
                ₹{item.price}
              </Text>
              <Button
                onClick={() => removeFromWishlist(item._id)}
                colorScheme="red"
                variant="solid"
              >
                Remove ❌
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WishlistPage;
