import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Доступ з початкового екрану</ModalHeader>
                <ModalBody>
                    <Text>
                        Цей веб-додаток застосовує worker, за допомогою якого Ви зможете отримати доступ до розкладу не відкриваючи браузер.
                    </Text>
                    <Text>
                        Для того щоб додати додаток на початковий екран, потрібно дотримуватись інструкцій з <Link color='cyan.500' href='https://ua.phhsnews.com/articles/howto/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet.html' isExternal>цієї статті</Link>
                        (Примітка: Для IOS слід додавати тільки через браузер Safari). <strong>Додавати слід з цього екрану</strong>
                    </Text>
                    <Text>
                        Цей пункт можна пропустити, та пізніше виконати в налаштуваннях за бажанням.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' onClick={onClose}>
                        ОК
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default InfoModal;
