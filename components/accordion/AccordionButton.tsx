/* eslint-disable */
import { AccordionButton as ChakraAccordionButton } from "@chakra-ui/react";

export default function AccordionButton(props: any) {
  return (
    <ChakraAccordionButton
      {...props}
      borderRadius="5px"
      bg="#f0eaf8"
      _hover={{ bg: "#f0eaf8" }}
      alignItems="center"
      display="flex"
      mb="10px"
    />
  );
}
