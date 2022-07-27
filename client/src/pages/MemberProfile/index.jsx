import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TEST_MEMBER_PROFILE } from '../../config/ajax-path';
import MemberProfileForm from './MemberProfileForm';

function MemberProfile(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <MemberProfileForm />;
}

export default MemberProfile;
