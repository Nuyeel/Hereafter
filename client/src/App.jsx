// 使用套件
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Context
import HeaderContext, { headers } from './context/HeaderContext/HeaderContext';

// 共通組件
import ProviderContainer from './context/ProviderContainer';
import ScrolltoTop from './components/ScrolltoTop';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Genie from './components/Genie';
import Background from './components/Background';

// 頁面組件
import Test from './components/Test'; // 僅供測試
// import NextLife from './pages/NextLife/NextLife';
import ShareWall from './pages/ShareWall/ShareWall';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ShareWallList from './pages/ShareWall/ShareWallList';
import ShareWallDetail from './pages/ShareWall/ShareWallDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordRevise from './pages/ForgotPasswordRevise';
import MainPage from './pages/MainPage';

function App() {
    // 認證登入狀態 (也可以新增其他 state 紀錄其他狀態)
    // auth for Authorization
    const [auth, setAuth] = useState(false);

    // TODO: useEffect() 時發送 AJAX 給 Server 端 setAuth()
    // 否則使用者自己刷新頁面就會變回未登入
    // 不知道可以不可以用 JWT 解決

    return (
        <BrowserRouter>
            <ProviderContainer>
                {/* TODO: 主頁面的 navbar 是一種 */}
                {/* TODO: 一般頁面的 navbar 是一種 */}
                {/* TODO: 點擊變成全頁面的 navbar 是一種 */}
                {/* TODO: 用 props 做條件 render */}
                <Nav theme="light" auth={auth}></Nav>
                <MainContent>
                    {/* ScrollToTop 會在切換分頁時讓頁面回到最上方 */}
                    <ScrolltoTop>
                        {/* 路由列表開始 */}
                        <Routes>
                            {/* 切換顯示的組件放在裡面 */}
                            {/* 利用 props 傳入頁面組件狀態 */}
                            <Route
                                path=""
                                element={<MainPage pageName="mainpage" />}
                            />
                            {/* ============================== */}
                            {/* 測試路由 */}
                            {/* ============================== */}
                            <Route path="test" element={<Test />} />
                            {/* ============================== */}
                            {/* 分享牆路由 */}
                            {/* ============================== */}
                            <Route
                                path="sharewall"
                                element={<ShareWall auth={auth} />}
                            >
                                <Route
                                    index
                                    element={
                                        <ShareWallList
                                            auth={auth}
                                            pageName="sharewall"
                                        />
                                    }
                                />
                                <Route
                                    path=":sharePostID"
                                    element={<ShareWallDetail auth={auth} />}
                                />
                            </Route>
                            {/* ============================== */}
                            {/* 登入路由 */}
                            {/* ============================== */}
                            <Route
                                path="/login"
                                element={
                                    <Login auth={auth} setAuth={setAuth} />
                                }
                            />
                            {/* ============================== */}
                            {/* 註冊路由 */}
                            {/* ============================== */}
                            <Route
                                path="/register"
                                element={
                                    <Register auth={auth} setAuth={setAuth} />
                                }
                            />
                            {/* ============================== */}
                            {/* 忘記密碼路由 */}
                            {/* ============================== */}
                            <Route
                                path="/forgotpassword"
                                element={
                                    <ForgotPassword
                                        auth={auth}
                                        setAuth={setAuth}
                                    />
                                }
                            />
                            {/* ============================== */}
                            {/* 忘記密碼修改頁路由 */}
                            {/* ============================== */}
                            <Route
                                path="/forgotpasswordrevise"
                                element={
                                    <ForgotPasswordRevise
                                        auth={auth}
                                        setAuth={setAuth}
                                    />
                                }
                            />
                            {/* 404 是最後一個路由 */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                        {/* 路由列表結束 */}
                    </ScrolltoTop>
                </MainContent>
                {/* <Genie /> */}
                <Background theme="light" />
                {/* <Background /> */}
            </ProviderContainer>
        </BrowserRouter>
    );
}

export default App;
