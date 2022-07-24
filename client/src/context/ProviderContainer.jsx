import ThemeContextProvider from './ThemeContext/ThemeContextProvider';
import AuthContextProvider from './AuthContext/AuthContextProvider';
import HeaderContextProvider from './HeaderContext/HeaderContextProvider';

function ProviderContainer(props) {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <HeaderContextProvider>
                    {props.children}
                </HeaderContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    );
}

export default ProviderContainer;
