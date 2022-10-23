import { Box, useBreakpointValue } from '@chakra-ui/react';
import { SETTINGS } from 'constants/routes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Footer = dynamic(() => import('components/UI/Footer'));
const Header = dynamic(() => import('components/Schedule/Header'));

interface IDashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    const shouldRenderFooter = useBreakpointValue({ base: true, lg: false });
    const shouldRenderHeader = pathname !== SETTINGS;

    return (
        <Box
            minH='100vh'
            w='full'
        >
            {shouldRenderHeader && <Header />}
            {children}
            {shouldRenderFooter && <Footer />}
        </Box>
    );
}

export default DashboardLayout