import {
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
    useColorModeValue
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { setSelectedGroup, setSelectedInstitute, setSubgroup } from 'store/settings';
import { useRouter } from 'next/router';
import { setSettingsToCookies } from 'utils';
import { SETTINGS } from 'constants/routes';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { setCookie } from 'cookies-next';

const ThemePicker = dynamic(() => import('components/UI/ThemePicker'));

interface ISettingsProps {
    onBack: () => void;
}

const Settings: React.FC<ISettingsProps> = ({ onBack }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [modalId, setModalId] = useState<string | null>(null);
    const isSettingsPage = router.asPath.includes(SETTINGS);
    const shouldRenderAddBtn = isSettingsPage && !window.matchMedia('(display-mode: standalone)').matches;
    const buttonColor = useColorModeValue('white', 'green.500');
    const {
        institutes,
        selectedGroup,
        selectedInstitute,
        subGroup
    } = useAppSelector(state => state.settings);

    const [selected, setSelected] = useState({
        institute: selectedInstitute ?? '',
        group: selectedGroup ?? '',
        subgroup: subGroup ?? 1
    });

    const isDisabled = !selected.group || !selected.institute;

    const groups = useMemo(() => {
        if (selected.institute) {
            return institutes.find(el => el.institute === selected.institute)?.groups ?? [];
        }

        return institutes.reduce((arr, el) => [...arr, ...el.groups], [] as string[]);
    }, [selected.institute, institutes]);

    const handleSelectInstitute = (institute: string) => {
        setSelected({
            group: '',
            institute,
            subgroup: 1
        });
        handleCloseModal();
    }

    const handleSelectGroup = (group: string) => {
        setSelected(state => ({
            ...state,
            group
        }));
        handleCloseModal();
    }

    const handleSelectSubgroup = (subgroup: number) => {
        setSelected(state => ({
            ...state,
            subgroup
        }));
    }

    const handleOpenModal = (modalId: string) => {
        setModalId(modalId);
    }

    const handleCloseModal = () => {
        setModalId(null);
    }

    const handleConfirm = () => {
        dispatch(setSelectedInstitute(selected.institute));
        dispatch(setSelectedGroup(selected.group));
        dispatch(setSubgroup(selected.subgroup));
        setSettingsToCookies(selected.group, selected.subgroup, selected.institute);
        router.push('/');
    }

    const handleAdd = () => {
        setCookie('confirmed', '');
        window.location.href = '/';
    }

    return (
        <Container maxW='full' minH='100vh' bg={useColorModeValue('green.400', 'gray.800')}>
            <Flex justify='center' align='center' minH='inherit'>
                <Container maxW='xl' p='2'>
                    <Text
                        fontSize={{ base: '2xl', md: '4xl' }}
                        fontWeight='bold'
                        align='center'
                        mb='20'
                        color='white'
                    >
                        Налаштування
                    </Text>
                    <Stack spacing={4}>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='bold'
                            color='white'
                        >
                            Факультет
                        </Text>
                        <Button
                            color='white'
                            rightIcon={<ChevronDownIcon />}
                            onClick={handleOpenModal.bind(null, 'institute')}
                        >
                            {selected.institute || 'Виберіть факультет'}
                        </Button>
                        <Modal
                            onClose={handleCloseModal}
                            isOpen={modalId === 'institute'}
                            scrollBehavior='inside'
                        >
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Виберіть факультет</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack w='full' spacing={2} direction='column' align='center'>
                                    {institutes.map(({ institute }) => (
                                        <Button
                                            key={institute}
                                            onClick={handleSelectInstitute.bind(null, institute)}
                                            variant='ghost'
                                            color='white'
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
                            color='white'
                        >
                            Група
                        </Text>
                        <Button
                            color='white'
                            rightIcon={<ChevronDownIcon />}
                            onClick={handleOpenModal.bind(null, 'group')}
                        >
                            {selected.group || 'Виберіть групу'}
                        </Button>
                        <Modal
                            onClose={handleCloseModal}
                            isOpen={modalId === 'group'}
                            scrollBehavior='inside'
                        >
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Виберіть групу</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack w='full' spacing={2} direction='column' align='center'>
                                    {groups.map(group => (
                                        <Button
                                            key={group}
                                            onClick={handleSelectGroup.bind(null, group)}
                                            variant='ghost'
                                            color='white'
                                        >
                                            {group}
                                        </Button>
                                    ))}
                                </Stack>
                            </ModalBody>
                            </ModalContent>
                        </Modal>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='bold'
                            color='white'
                            align='center'
                        >
                            Підгрупа
                        </Text>
                        <ButtonGroup justifyContent='center'>
                            <Button
                                onClick={handleSelectSubgroup.bind(null, 1)}
                                isActive={selected.subgroup === 1}
                            >
                                1
                            </Button>
                            <Button
                                onClick={handleSelectSubgroup.bind(null, 2)}
                                isActive={selected.subgroup === 2}
                            >
                                2
                            </Button>
                        </ButtonGroup>
                        {isSettingsPage && <ThemePicker />}
                        {shouldRenderAddBtn && (
                            <Button onClick={handleAdd}>
                                На початковий екран
                            </Button>
                        )}
                        <Button
                            color='green.500'
                            w={{ base: 'full', sm: 'auto' }}
                            onClick={handleConfirm}
                            disabled={isDisabled}
                        >
                            Підтвердити
                        </Button>
                        <Button
                            color={buttonColor}
                            w={{ base: 'full', sm: 'auto' }}
                            variant='ghost'
                            onClick={onBack}
                        >
                            Назад
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </Container>
    );
}

export default Settings;
