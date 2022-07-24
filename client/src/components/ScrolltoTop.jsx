import React from 'react';
import { withRouter } from '../utils/withRouter';

// 頁面切換時要用捲軸讓頁面回到最上方
class ScrollToTop extends React.Component {
    // 寫成類別型元件是為了在函式型元件的 useLayoutEffect() 階段套用
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
