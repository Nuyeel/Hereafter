import Background from './components/Background';
import Nav from './components/Nav';

// NextLife 目前只是測試引用 css 的位置
// 統一放在 styles 中的好處是一目了然 集中管理
// 大家的 css 都在同一個資料夾內
// 可以自己先註解掉 只是讓大家知道可以用
// import NextLife from './pages/NextLife/NextLife';

import Genie from './components/Genie';

function App() {
    return (
        <>
            <Nav />
            {/* FIXME: Just For Test */}
            {/* <Background theme="light" /> */}
            <Background theme="dark" />
            {/* <NextLife /> */}
            {/* <img
                src="http://localhost:3500/uploads/images/shared/test.png"
                alt=""
            /> */}
            {/* FIXME: 目前 svg 素材會導致視窗被撐高 */}
            {/* <Genie /> */}
        </>
    );
}

export default App;
