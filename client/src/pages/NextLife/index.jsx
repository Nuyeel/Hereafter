import { useState, useEffect, useContext, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import NextLifeCube from './subpages/NextLifeCube';

// import '../../styles/NextLife.scss';
// TODO: 來生頁面會強制轉換為生者配色
// DONE: 如果要記得會員的選擇 這功能也可以改成在 Background.jsx 做
// FIXME: 強制鎖住配色 可以做在 Nav 也可以做在 useLayoutEffect()

// TODO: 這一頁的寫法 應該是相同頁面 step render
// TODO: 先做 step 2 的狀況

function NextLife(props) {
    const { pageName } = props;
    const { isDead } = useContext(AuthContext);
    const { setTheme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    // 強制將主題配色轉換為淺色
    // FIXME: 如果要記得會員的選擇 這功能也可以改成在 Background.jsx 做
    useEffect(() => {
        setTheme(themes.light);
    }, []);

    return (
        <>
            <div className="container">
                <h1>NextLife.jsx</h1>
                {/* DONE: 條件 Render 成功 */}
                <h2>{isDead ? '我涼了ㄛ' : '我還活著(預設)'}</h2>
            </div>
            {isDead ? <NextLifeCube /> : ''}
        </>
    );
}

export default NextLife;
