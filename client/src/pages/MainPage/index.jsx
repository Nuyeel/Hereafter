import { useContext, useEffect } from 'react';
import HeaderContext, { headers } from '../../context/HeaderContext/HeaderContext';
import AuthContext from '../../context/AuthContext/AuthContext';

function MainPage(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);

    useEffect(()=> {
        setHeader(headers[pageName]);
    }, []);

    return (
        <>
            <div className="container">
                <p>我是首頁</p>
                {authorized ? <p>我有登入</p> : <p>我沒登入</p>}
            </div>
        </>
    );
}

export default MainPage;
