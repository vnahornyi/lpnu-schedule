import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from 'constants/theme';

class MyDocument extends Document {
    render() {
        return (
            <Html lang='uk'>
                <Head>
                    <meta name="application-name" content="LPNU" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Розклад LPNU" />
                    <meta name="description" content="Тут ви можете знайти розклад Вашої групи" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#1A202C" />
                    <meta name="msapplication-tap-highlight" content="no" />
        
                    <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
        
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#1A202C" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />
        
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://lpnu-schedule.vercel.app" />
                    <meta name="twitter:title" content="Розклад LPNU" />
                    <meta name="twitter:description" content="Тут ви можете знайти розклад Вашої групи" />
                    <meta name="twitter:image" content="https://lpnu-schedule.vercel.app/icons/android-chrome-192x192.png" />
                    <meta name="twitter:creator" content="@VladyslavNahornyi" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Розклад LPNU" />
                    <meta property="og:description" content="Тут ви можете знайти розклад Вашої групи" />
                    <meta property="og:site_name" content="Розклад LPNU" />
                    <meta property="og:url" content="https://lpnu-schedule.vercel.app" />
                    <meta property="og:image" content="https://lpnu-schedule.vercel.app/icons/apple-touch-icon.png" />
                    <meta name="google-site-verification" content="GRhVYm42ADBjA4EpQaSV_y_QIHeL_1SfhyAYGsD4WYs" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
