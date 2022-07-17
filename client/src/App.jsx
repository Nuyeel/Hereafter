import Background from './components/Background';
import Nav from './components/Nav';
// NextLife 目前只是測試引用 css 的位置
// 統一放在 styles 中的好處是一目了然 集中管理
// 大家的 css 都在同一個資料夾內
// 可以自己先註解掉 只是讓大家知道可以用
import NextLife from './pages/NextLife/NextLife';

function App() {
    return (
        <>
            <Nav />
            <Background />
            <NextLife />
            <img src="http://localhost:3500/uploads/shared/test.png" alt="" />
        </>
    );
}

export default App;
