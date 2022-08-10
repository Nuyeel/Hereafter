// 使用套件
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Redux(活動購物車數字)
import store from './store/store.js';
import { Provider } from 'react-redux';

// 共通組件
import ProviderContainer from './context/ProviderContainer';
import ScrolltoTop from './components/ScrolltoTop';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
// import Genie from './components/Genie';
import Background from './components/Background';

// 頁面組件
// import Test from './components/Test'; // 僅供測試
import NextLife from './pages/NextLife';
import ShareWall from './pages/ShareWall/ShareWall';
import ShareWallList from './pages/ShareWall/ShareWallList';
import ShareWallDetail from './pages/ShareWall/ShareWallDetail';
import ShareWallPost from './pages/ShareWall/ShareWallPost';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordRevise from './pages/ForgotPasswordRevise';
import MemberProfile from './pages/MemberProfile';
import MemberProfileRevise from './pages/MemberProfileRevise';
import MemberPasswordRevise from './pages/MemberPasswordRevise';
import MemberEventOrder from './pages/MemberEventOrder/MemberEventOrderForm';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Event from './pages/Event';
import EventList from './pages/Event/EventList';
import EventDetail from './pages/EventDetail/EventDetail';
import OrderSteps from './pages/OrderSteps';
import Gooddeed from './pages/Gooddeed';
import Games from './pages/Games';
import Intro from './pages/Intro';
import Place from './pages/Place';
import PlaceLikedPage from './pages/Place/PlaceLikedPage.js';
import RebornCart from './pages/RebornCart';
import LoadingLogo from './components/LoadingLogo.jsx';
import Maker from './pages/avatar/maker/Maker';
import Showcase from './pages/avatar/showcase/Showcase.js';
import News from './pages/News/News';
import AboutUsFirst from './pages/AboutUsFirst/AboutUsFirst';
import AboutUsSecond from './pages/AboutUsSecond/AboutUsSecond';
import AboutUsThird from './pages/AboutUsThird/AboutUsThird';

// 讓setLightBox方法 <MainPage><Nav>可共用
import { useState } from 'react';

function App() {
    // 認證登入狀態 (也可以新增其他 state 紀錄其他狀態)
    // auth for Authorization

    // 讓setLightBox方法 <MainPage><Nav>可共用
    const [lightBox, setLightBox] = useState('nav_lightbox_hidden'); //光箱預設是隱藏

    // 會員陰德值
    const [userGooddeed, setUserGooddeed] = useState({
        show: false,
        gooddeed: 0,
    });

    return (
        <BrowserRouter>
            <Provider store={store}>
                <ProviderContainer>
                    {/* TODO: 主頁面的 navbar 是一種 */}
                    {/* TODO: 一般頁面的 navbar 是一種 */}
                    {/* TODO: 點擊變成全頁面的 navbar 是一種 */}
                    {/* TODO: 用 props 做條件 render */}
                    <Nav
                        lightBox={lightBox}
                        setLightBox={setLightBox}
                        userGooddeed={userGooddeed}
                        setUserGooddeed={setUserGooddeed}
                    />
                    <MainContent>
                        {/* ScrollToTop 會在切換分頁時讓頁面回到最上方 */}
                        <ScrolltoTop>
                            {/* 路由列表開始 */}
                            <Routes>
                                {/* 切換顯示的組件放在裡面 */}
                                {/* 利用 props 傳入頁面組件狀態 */}
                                <Route
                                    path=""
                                    element={
                                        <MainPage
                                            pageName="mainpage"
                                            setLightBox={setLightBox}
                                        />
                                    }
                                />
                                {/* ============================== */}
                                {/* 測試路由 */}
                                {/* ============================== */}
                                {/* <Route path="test" element={<Test />} /> */}
                                {/* ============================== */}
                                {/* 分享牆路由 */}
                                {/* ============================== */}
                                <Route path="sharewall" element={<ShareWall />}>
                                    <Route
                                        index
                                        element={
                                            <ShareWallList pageName="sharewall" />
                                        }
                                    />
                                    <Route
                                        path="post"
                                        element={
                                            <ShareWallPost pageName="default" />
                                        }
                                    />
                                    <Route
                                        path=":sharePostID"
                                        element={
                                            <ShareWallDetail pageName="default" />
                                        }
                                    />
                                </Route>
                                {/* ============================== */}
                                {/* 登入路由 */}
                                {/* ============================== */}
                                <Route path="/login" element={<Login />} />
                                {/* ============================== */}
                                {/* 註冊路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                {/* ============================== */}
                                {/* 忘記密碼路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/forgotpassword"
                                    element={<ForgotPassword />}
                                />
                                {/* ============================== */}
                                {/* 忘記密碼修改頁路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/forgotpasswordrevise"
                                    element={<ForgotPasswordRevise />}
                                />
                                {/* ============================== */}
                                {/* 會員中心主頁路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/memberprofile"
                                    element={<MemberProfile />}
                                />
                                {/* ============================== */}
                                {/* 會員中心資料修改頁路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/memberprofilerevise"
                                    element={<MemberProfileRevise />}
                                />
                                {/* ============================== */}
                                {/* 會員中心密碼修改頁路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/memberpasswordrevise"
                                    element={<MemberPasswordRevise />}
                                />
                                {/* ============================== */}
                                {/* 會員中心活動訂單頁路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/membereventorder"
                                    element={<MemberEventOrder />}
                                />
                                {/* ============================== */}
                                {/* 良辰吉地路由 */}
                                {/* ============================== */}
                                <Route
                                    path="place"
                                    element={<Place pageName="place" />}
                                />
                                <Route
                                    path="place-liked"
                                    element={
                                        <PlaceLikedPage pageName="place" />
                                    }
                                />
                                {/* ============================== */}
                                {/* 轉生購物車路由 */}
                                {/* ============================== */}
                                <Route
                                    path="reborn-cart"
                                    element={
                                        <RebornCart pageName="rebornCart" />
                                    }
                                />
                                <Route
                                    path="loading"
                                    element={<LoadingLogo />}
                                />
                                {/* ============================== */}
                                {/* 活動列表路由 */}
                                {/* ============================== */}
                                <Route path="/events" element={<Event />}>
                                    <Route index element={<EventList />} />
                                    <Route
                                        path=":eventSid"
                                        element={<EventDetail />}
                                    />
                                </Route>

                                {/* ============================== */}
                                {/* 活動購物車路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/ordersteps"
                                    element={<OrderSteps />}
                                />
                                {/* ============================== */}
                                {/*  我的衣櫃路由*/}
                                {/* ============================== */}
                                <Route
                                    path="/showcase"
                                    element={<Showcase pageName="showcase" />}
                                />
                                {/* ============================== */}
                                {/* 來生形象製造器路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/maker"
                                    element={<Maker pageName="maker" />}
                                />
                                {/* ============================== */}
                                {/* 陰德值測驗路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/gooddeed"
                                    element={<Gooddeed pageName="gooddeed" />}
                                />
                                {/* ============================== */}
                                {/* 陰德值遊戲路由 */}
                                {/* ============================== */}
                                <Route path="/games" element={<Games />} />
                                {/* ============================== */}
                                {/* Intro路由 */}
                                {/* ============================== */}
                                <Route
                                    path="/intro"
                                    element={<Intro pageName="Intro" />}
                                />

                                {/* ============================== */}
                                {/* 來生路由 */}
                                {/* ============================== */}
                                {/* FIXME: 可以想想看這頁需不需要 Header */}
                                <Route
                                    path="nextlife"
                                    element={<NextLife pageName="default" />}
                                />
                                {/* ============================== */}
                                {/*  關於我們路由*/}
                                {/* ============================== */}
                                <Route
                                    path="/aboutusfirst"
                                    element={
                                        <AboutUsFirst pageName="aboutusfirst" />
                                    }
                                />
                                {/* ============================== */}
                                {/*  關於我們路由*/}
                                {/* ============================== */}
                                <Route
                                    path="/aboutussecond"
                                    element={
                                        <AboutUsSecond pageName="aboutussecond" />
                                    }
                                />
                                {/* ============================== */}
                                {/*  關於我們路由*/}
                                {/* ============================== */}
                                <Route
                                    path="/aboutusthird"
                                    element={
                                        <AboutUsThird pageName="aboutusthird" />
                                    }
                                />
                                {/* ============================== */}
                                {/*  最新消息路由*/}
                                {/* ============================== */}
                                <Route
                                    path="/news"
                                    element={<News pageName="news" />}
                                />

                                {/* 404 是最後一個路由 */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                            {/* 路由列表結束 */}
                        </ScrolltoTop>
                    </MainContent>
                    {/* <Genie /> */}
                    <Background />
                </ProviderContainer>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
