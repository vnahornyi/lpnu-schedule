import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { setSelectedGroup, setSelectedInstitute, setSubgroup } from 'store/settings';
import { useRouter } from 'next/router';
import { setSettingsToLocalStorage } from 'utils';
import { SETTINGS } from 'constants/routes';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ThemePicker = dynamic(() => import('components/UI/ThemePicker'));

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [modalId, setModalId] = useState<string | null>(null);
    const isSettingsPage = router.asPath.includes(SETTINGS);
    const {
        institutes,
        selectedGroup,
        selectedInstitute,
        subGroup
    } = useAppSelector(state => state.settings);

    const groups = useMemo(() => {
        if (selectedInstitute) {
            return institutes.find(el => el.institute === selectedInstitute)?.groups ?? [];
        }

        return institutes.reduce((arr, el) => [...arr, ...el.groups], [] as string[]);
    }, [selectedInstitute, institutes]);

    useEffect(() => {
        setSettingsToLocalStorage(selectedGroup ?? '', subGroup, selectedInstitute ?? '');
    }, [selectedGroup, selectedInstitute, subGroup]);

    const handleSelectInstitute = (institute: string) => {
        dispatch(setSelectedGroup(''));
        dispatch(setSelectedInstitute(institute));
        handleCloseModal();
    }

    const handleSelectGroup = (group: string) => {
        dispatch(setSelectedGroup(group));
        handleCloseModal();
    }

    const handleSelectSubgroup = (subgroup: number) => {
        dispatch(setSubgroup(subgroup));
    }

    const handleOpenModal = (modalId: string) => {
        setModalId(modalId);
    }

    const handleCloseModal = () => {
        setModalId(null);
    }

    return (
        <Container maxW='full' minH='100vh'>
            <Box
                as='header'
                w='full'
                py='10'
            >
                <Text
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight='bold'
                    align='center'
                >
                    Налаштування
                </Text>
            </Box>
            <Flex justify='center' align='center' minH='calc(100vh - 86px - 116px)'>
                <Container maxW='xl' p='2'>
                    <Stack spacing={4}>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='bold'
                        >
                            Інститут
                        </Text>
                        <Button
                            rounded='xl'
                            rightIcon={<ChevronDownIcon />}
                            onClick={handleOpenModal.bind(null, 'institute')}
                        >
                            {selectedInstitute || 'Виберіть інститут'}
                        </Button>
                        <Modal
                            onClose={handleCloseModal}
                            isOpen={modalId === 'institute'}
                            scrollBehavior='inside'
                        >
                            <ModalOverlay />
                            <ModalContent mx='4' my='6' rounded='3xl'>
                            <ModalHeader>Виберіть інститут</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack w='full' spacing={2} direction='column' align='center'>
                                    {institutes.map(({ institute }) => (
                                        <Button
                                            key={institute}
                                            onClick={handleSelectInstitute.bind(null, institute)}
                                            variant='ghost'
                                        >
                                            {institute}
                                        </Button>
                                    ))}
                                </Stack>
                            </ModalBody>
                            </ModalContent>
                        </Modal>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='bold'
                        >
                            Група
                        </Text>
                        <Button
                            rounded='xl'
                            rightIcon={<ChevronDownIcon />}
                            onClick={handleOpenModal.bind(null, 'group')}
                        >
                            {selectedGroup || 'Виберіть групу'}
                        </Button>
                        <Modal
                            onClose={handleCloseModal}
                            isOpen={modalId === 'group'}
                            scrollBehavior='inside'
                        >
                            <ModalOverlay />
                            <ModalContent mx='4' my='6' rounded='3xl'>
                            <ModalHeader>Виберіть групу</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack w='full' spacing={2} direction='column' align='center'>
                                    {groups.map(group => (
                                        <Button
                                            key={group}
                                            onClick={handleSelectGroup.bind(null, group)}
                                            variant='ghost'
                                        >
                                            {group}
                                        </Button>
                                    ))}
                                </Stack>
                            </ModalBody>
                            </ModalContent>
                        </Modal>
                        {isSettingsPage && <>
                            <Text
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight='bold'
                                align='center'
                            >
                                Підгрупа
                            </Text>
                            <ButtonGroup justifyContent='center'>
                                <Button
                                    rounded='xl'
                                    onClick={handleSelectSubgroup.bind(null, 1)}
                                    isActive={subGroup === 1}
                                >
                                    1
                                </Button>
                                <Button
                                    rounded='xl'
                                    onClick={handleSelectSubgroup.bind(null, 2)}
                                    isActive={subGroup === 2}
                                >
                                    2
                                </Button>
                            </ButtonGroup>
                        </>}
                        {isSettingsPage && <ThemePicker />}
                    </Stack>
                </Container>
            </Flex>
        </Container>
    );
}

export default Settings;
