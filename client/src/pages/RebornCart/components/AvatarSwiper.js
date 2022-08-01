// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper';

import SoulIcon from '../../Place/components/SoulIcon';

function AvatarSwiper(props) {
    const { avatarDataList, setSelectedAvatarInd } = props;

    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            onSlideChange={(e) => {
                // console.log(e.activeIndex);
                const avaIndex = e.activeIndex;
                setSelectedAvatarInd(avaIndex);
            }}
        >
            {avatarDataList.map((v, i) => {
                return (
                    <SwiperSlide key={v.sid}>
                        <div className="ava-option">
                            <img
                                src={`images/${v.img}`}
                                alt=""
                                className="ava-img"
                            />
                            <div className="price">
                                <SoulIcon className="soul-icon" />
                                <span>{v.price}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default AvatarSwiper;
