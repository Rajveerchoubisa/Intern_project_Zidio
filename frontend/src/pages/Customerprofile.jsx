import {
  Box,
  Avatar,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Icon,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar || ""
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Profile updated!",
        description: "Your changes have been saved.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUser(response.data.user);
      onClose();
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Failed to load profile</Text>
      </Flex>
    );
  }

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-br, #ffecd2, #fcb69f)"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="2xl"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Avatar
          size="2xl"
          name={user.name}
          src={user.avatar || ""}
          mb={4}
          bg="purple.400"
          color="white"
        />
        <Heading
          fontSize="2xl"
          mb={2}
          fontFamily="'Comic Sans MS', cursive"
          color="purple.600"
        >
          {user.name}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={1}>
          {user.email}
        </Text>
        <Text fontWeight="bold" color="gray.700" mb={6}>
          Role: <span style={{ color: "#FF4E50" }}>{user.role}</span>
        </Text>

        <Button
          leftIcon={<Icon as={FaUserEdit} />}
          colorScheme="teal"
          variant="solid"
          mt={6}
          onClick={onOpen}
        >
          Edit Profile
        </Button>

        {/* Edit Profile Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="name" value={formData.name} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" value={formData.email} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Avatar</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const imageUrl = await uploadToCloudinary(file);
                          setFormData((prev) => ({
                            ...prev,
                            avatar: imageUrl,
                          }));
                        } catch (error) {
                          console.error("Image upload failed:", error);
                        }
                      }
                    }}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleUpdateProfile}>
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default CustomerProfile;
