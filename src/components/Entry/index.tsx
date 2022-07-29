import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import {
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack
} from "@chakra-ui/react";

import { fs } from "../../firebase";

interface IEntry {
  isOpen: boolean;
  onClose: () => void;
}

const Entry = ({ onClose, isOpen }: IEntry) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              Add New Entry
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EntryForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Entry;

const EntryForm = ({ onClose }: { onClose: () => void }) => {

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submitEntry = async () => {
    if (!firstNameRef.current?.value.length) return;
    if (!lastNameRef.current?.value.length) return;
    if (!emailRef.current?.value.length) return;

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailAddress = emailRef.current.value;

    onClose();

    toast.promise(addDoc(collection(fs, "entries"), {
      firstName,
      lastName,
      emailAddress
    }), {
      loading: "Saving...",
      success: <b>Added entry!</b>,
      error: <b>Failed to add entry!</b>
    });
  }

  return (
    <FormControl>
      <Stack spacing="3">
        <Input ref={firstNameRef} type="text" placeholder="First Name" variant="flushed" />
        <Input ref={lastNameRef} type="text" placeholder="Last Name" variant="flushed" />
        <Input ref={emailRef} type="email" placeholder="Email Address" variant="flushed" />
        <Center>
          <Button w="60%" onClick={submitEntry}>Submit</Button>
        </Center>
      </Stack>
    </FormControl>
  );
}