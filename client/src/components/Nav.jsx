// TODO: 條狀與全頁轉換

import { ReactComponent as NavLogo } from '../images/Nav/nav_logo.svg';
import { ReactComponent as NavSoul } from '../images/Nav/nav_soul.svg';
// import { ReactComponent as Soul } from '../images/Nav/soul.svg';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

function Nav() {
    return (
        <div
            // p-0 (如果 container 左右比較寬的話是 padding)
            // TODO: useContext Theme.Provider
            className={`nav container-fluid`}
        >
            <div className="nav-inner container d-flex justify-content-between align-items-center">
                <div className="nav-inner-left">
                    <NavLogo />
                </div>
                <div className="nav-inner-right">
                    <NavSoul />
                    <FaShoppingCart />
                    <BsFillPersonFill />
                    <FaBars />
                </div>
                {/* <Soul /> */}
            </div>
        </div>
    );
}

export default Nav;
