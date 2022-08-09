// import {
//     ScrollMotionContainer,
//     ScrollMotionItem,
// } from '../../components/ScrollMotion';
// import { useContext, useState, useEffect } from 'react';
// 會員登入context
// import AuthContext from '../../context/AuthContext/AuthContext';
//載入資料

// 子曾元件和css
import HeroesDemo from './heroes/HeroesDemo';
import './introstyle.scss';

function Intro() {
    return (
        <>
            <h2>INTROOO</h2>
            <HeroesDemo />
        </>
    );
}

export default Intro;
