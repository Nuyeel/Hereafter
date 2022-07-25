import Header from './Header';

// TODO: 記得要修正根據不同的設備高度調整 paddingTop
const MainContentStyles = {
    paddingTop: '96px',
    // overflow: 'hidden',
};

function MainContent(props) {
    return (
        // 感覺以我們的設計來說不用 <main> 但先維持
        // 這裡假設 nav 高度是 100px
        // 多給 20px 來做下面內容的 margin-top
        // 因為 margin 最好統一是 bottom 來防止 margin collapse
        <main role="main" className="flex-shrink-0" style={MainContentStyles}>
            <Header />
            {props.children}
        </main>
    );
}

export default MainContent;
