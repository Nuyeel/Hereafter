import './showcase.css';
import { useContext, useState, useEffect } from 'react';
import ThemeContext from '../../../context/ThemeContext/ThemeContext';
//import styled from '@emotion/styled';
import { Showcase_Data } from '../../../config/ajax-path';
import axios from 'axios';
import AvatarCard from './AvatarCard';
//import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Showcase() {
    const { theme } = useContext(ThemeContext);
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

    return (
        <>
            <div
                className="container showcase"
                style={{
                    color: theme.cHeader,
                }}
            >
                <Carousel
                    showStatus={false}
                    autoPlay={false}
                    centerMode={true}
                    infiniteLoop={true}
                >
                    {avatarData.map((v, i) => {
                        return (
                            <AvatarCard theme={theme} key={i} avatarinfo={v} />
                        );
                    })}
                </Carousel>
            </div>
        </>
    );
}
export default Showcase;
