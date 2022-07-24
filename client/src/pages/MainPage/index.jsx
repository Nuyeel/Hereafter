import { useContext, useEffect } from 'react';
import HeaderContext, { headers } from '../../context/HeaderContext/HeaderContext';

function MainPage(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    useEffect(()=> {
        setHeader(headers[pageName]);
    }, []);

    return <div className="container">我是首頁</div>;
}

export default MainPage;
