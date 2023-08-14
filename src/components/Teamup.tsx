import UserModal from "./UserModal";
import {Input, Modal, Text} from "@chakra-ui/react"

export default function Teamup(props: any){
    const { isOpen, onOpen, onClose, name, profile } = props;
    return (
        <>
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <Text> AHHH</Text>
            </Modal>
        </>
    );
}