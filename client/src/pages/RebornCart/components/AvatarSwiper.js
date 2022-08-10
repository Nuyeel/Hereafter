// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper';

import SoulIcon from '../../Place/components/SoulIcon';

function AvatarSwiper(props) {
    const { avatarDataList, avatarData, setSelectedAvatarInd } = props;

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
            {/* {avatarData.map((v) =>
                console.log(`${STATIC_SHAREWALL_AVA}/${v.img_name}`)
            )} */}
            {avatarData.length > 0 && (
                <>
                    {avatarData.map((v, i) => {
                        return (
                            <SwiperSlide key={v.avatar_id}>
                                <div className="ava-option">
                                    <img
                                        src={`http://localhost:3500/uploads/images/avatar/${v.img_name}`}
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
                </>
            )}
            {/* {avatarDataList.map((v, i) => {
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
            })} */}
        </Swiper>
    );
}

export default AvatarSwiper;
