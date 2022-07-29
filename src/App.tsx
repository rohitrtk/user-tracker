import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Entry from "./components/Entry";

import { Button, useDisclosure } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar addButtonClick={onOpen} />
      <Tracker />
      <Entry isOpen={isOpen} onClose={onClose} />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
