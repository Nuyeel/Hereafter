import AuthContextProvider from './AuthContext/AuthContextProvider';
import ThemeContextProvider from './ThemeContext/ThemeContextProvider';
import HeaderContextProvider from './HeaderContext/HeaderContextProvider';

function ProviderContainer(props) {
    return (
        <AuthContextProvider>
            <ThemeContextProvider>
                <HeaderContextProvider>{props.children}</HeaderContextProvider>
            </ThemeContextProvider>
        </AuthContextProvider>
    );
}

export default ProviderContainer;
