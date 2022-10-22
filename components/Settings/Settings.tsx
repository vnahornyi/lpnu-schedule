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
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { setSelectedGroup, setSelectedInstitute, setSubgroup } from 'store/settings';
import { useRouter } from 'next/router';
import { setSettingsToCookies } from 'utils';
import { SETTINGS } from 'constants/routes';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ThemePicker = dynamic(() => import('components/UI/ThemePicker'));

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [modalId, setModalId] = useState<string | null>(null);
    const isSettingsPage = router.asPath.includes(SETTINGS);
    const shouldRenderAddBtn = isSettingsPage && !window.matchMedia('(display-mode: standalone)').matches;
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
        localStorage.setItem('confirmed', '');
        window.location.href = '/';
    }

    return (
        <Container maxW='full' minH='100vh'>
            <Flex justify='center' align='center' minH='inherit'>
                <Container maxW='xl' p='2'>
                    <Text
                        fontSize={{ base: '2xl', md: '4xl' }}
                        fontWeight='bold'
                        align='center'
                    >
                        Налаштування
                    </Text>
                    <Stack spacing={4}>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='bold'
                        >
                            Інститут
                        </Text>
                        <Button
                            rightIcon={<ChevronDownIcon />}
                            onClick={handleOpenModal.bind(null, 'institute')}
                        >
                            {selected.institute || 'Виберіть інститут'}
                        </Button>
                        <Modal
                            onClose={handleCloseModal}
                            isOpen={modalId === 'institute'}
                            scrollBehavior='inside'
                        >
                            <ModalOverlay />
                            <ModalContent>
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
                        </>}
                        {isSettingsPage && <ThemePicker />}
                        {shouldRenderAddBtn && (
                            <Button onClick={handleAdd}>
                                На початковий екран
                            </Button>
                        )}
                        {!isSettingsPage && (
                            <Button
                                color='green.500'
                                w={{ base: 'full', sm: 'auto' }}
                                onClick={handleConfirm}
                                disabled={isDisabled}
                            >
                                Підтвердити
                            </Button>
                        )}
                    </Stack>
                </Container>
            </Flex>
        </Container>
    );
}

export default Settings;
