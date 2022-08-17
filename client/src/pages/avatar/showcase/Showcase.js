import './showcase.css';
import { useContext, useState, useEffect } from 'react';
import ThemeContext from '../../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../../context/HeaderContext/HeaderContext';
import { Showcase_Data } from '../../../config/ajax-path';
import axios from 'axios';
import AvatarCard from './AvatarCard';
//import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Showcase(props) {
    const { pageName } = props;

    const { theme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);

    const [avatarData, setAvatarData] = useState([]);
    //載入Loading動畫用
    const [isLoading, setIsLoading] = useState(false);
    //1秒後自動關掉spinner(設定isLoading為false)
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [isLoading]);
    const getAvatarData = async () => {
        const member = JSON.parse(localStorage.getItem('auth'));

        if (member !== null) {
            const postData = { id: member['sid'] };
            const r = await axios.post(Showcase_Data, postData);
            setAvatarData(r.data.data);
        } else {
            console.log('Meow 未登入');
        }
    };

    useEffect(() => {
        setIsLoading(true);

        getAvatarData();
    }, []);

    const [mobile, setMobile] = useState('mobile');

    const handleRWD = () => {
        if (window.innerWidth > 1200) setMobile('PC');
        else setMobile('mobile');
    };

    useEffect(() => {
        window.addEventListener('resize', handleRWD);
        handleRWD();

        return () => {
            window.removeEventListener('resize', handleRWD);
        };
    }, []);

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    if (mobile === 'PC') {
        return (
            <>
                <div
                    className="container showcase"
                    style={{
                        color: theme.cHeader,
                        overflow: 'hidden',
                    }}
                >
                    <Carousel
                        showStatus={false}
                        autoPlay={false}
                        centerMode={true}
                        showArrows={false}
                        emulateTouch={false}
                        showThumbs={false}
                    >
                        {avatarData.map((v, i) => {
                            return (
                                <AvatarCard
                                    theme={theme}
                                    key={i}
                                    avatarinfo={v}
                                />
                            );
                        })}
                    </Carousel>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div
                    className="container showcase"
                    style={{
                        color: theme.cHeader,
                    }}
                >
                    {avatarData.map((v, i) => {
                        return (
                            <AvatarCard theme={theme} key={i} avatarinfo={v} />
                        );
                    })}
                </div>
            </>
        );
    }
}
export default Showcase;
