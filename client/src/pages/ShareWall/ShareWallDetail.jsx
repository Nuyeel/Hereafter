// 使用套件
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { STATIC_SHAREWALL_AVA } from '../../config/ajax-path';

// Context
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

import './ShareWallDetail.scss';

function ShareWallDetail(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { sharePostID } = useParams();

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // TODO: 取得單一貼文內容
    useEffect(() => {}, []);

    return (
        <div className="container cpl-post-card-container d-flex justify-content-center align-items-center">
            <div className="cpl-post-card-body">
                <div className="row mx-0 px-2">
                    <div className="col-lg-6 p-0">
                        <img
                            src={`${STATIC_SHAREWALL_AVA}${sharePostID}.png`}
                            alt=""
                            className="cpl-psb-avatar"
                        />
                        <div className="cpl-spc-af-round" />
                        <div className="cpl-spc-af-square" />
                    </div>
                    <div className="col-lg-6 p-0">right</div>
                </div>
            </div>
        </div>
    );
}

export default ShareWallDetail;
