import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { MEMBER_PASSWORD_REVISE } from '../../config/ajax-path';
import MemberPasswordReviseForm from './MemberPasswordReviseForm';

function MemberPasswordRevise(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <MemberPasswordReviseForm />;
}

export default MemberPasswordRevise;
