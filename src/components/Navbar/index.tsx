import { ReactNode } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  IconButton
} from "@chakra-ui/react";
import {
  AddIcon
} from "@chakra-ui/icons";

interface INavbar {
  addButtonClick?: () => void;
}

const Navbar = ({ addButtonClick }: INavbar) => {
  return (
    <>
      <Box bg="gray.100" boxShadow="lg" px="4">
        <Flex h={16} alignItems="center" justifyContent="center">
          <IconButton
            size="md"
            icon={<AddIcon />}
            aria-label="add-entry"
            onClick={addButtonClick}
          />
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;