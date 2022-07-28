// 使用套件
import { useEffect, useContext } from 'react';

// Context
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

function ShareWallDetail(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    return <h3 style={{ color: '#FFF' }}>ShareWallDetail.jsx</h3>;
}

export default ShareWallDetail;
