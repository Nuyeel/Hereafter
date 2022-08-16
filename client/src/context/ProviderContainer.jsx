import MeshContextProvider from './MeshContext/MeshContextProvider';
import AuthContextProvider from './AuthContext/AuthContextProvider';
import ThemeContextProvider from './ThemeContext/ThemeContextProvider';
import HeaderContextProvider from './HeaderContext/HeaderContextProvider';

function ProviderContainer(props) {
    return (
        <MeshContextProvider>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <HeaderContextProvider>
                        {props.children}
                    </HeaderContextProvider>
                </ThemeContextProvider>
            </AuthContextProvider>
        </MeshContextProvider>
    );
}

export default ProviderContainer;
