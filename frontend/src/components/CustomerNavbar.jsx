import {
  Box,
  Flex,
  Button,
  Text,
  Spacer,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaStore, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      bg={useColorModeValue("#FF5F6D", "#FFC371")}
      px={6}
      py={4}
      boxShadow="md"
    >
      <Flex align="center">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          fontFamily="Comic Sans MS"
        >
          🦸‍♂️ Zidio Shop
        </Text>
        <Spacer />
        <Button
          leftIcon={<FaStore />}
          colorScheme="yellow"
          variant="solid"
          mr={3}
          onClick={() => navigate("/categories")}
        >
          Categories
        </Button>

        <Button
          colorScheme="blue"
          variant="solid"
          mr={3}
          onClick={() => navigate("/my-orders")}
        >
          My-Orders
        </Button>
        
        <IconButton
          icon={<FaUser />}
          colorScheme="purple"
          variant="ghost"
          onClick={() => navigate("/profile")}
          aria-label="Profile"
          mr={2}
        />
        <IconButton
        icon={<FaCartShopping />}
        colorScheme="purple"
        variant= "ghost"
        onClick={() => navigate('/cart')}
        mr={2}
        /> 
        <IconButton
        icon={<FaHeart />}
        colorScheme="red"
        variant= "ghost"
        onClick={() => navigate('/cart')}
        mr={2}
        />
        <IconButton
          icon={<FaSignOutAlt />}
          colorScheme="red"
          onClick={handleLogout}
          aria-label="Logout"
        />
        
      </Flex>
    </Box>
  );
};

export default CustomerNavbar;
