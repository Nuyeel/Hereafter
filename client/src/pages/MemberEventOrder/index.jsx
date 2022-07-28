import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { MEMBER_EVENT_ORDER } from '../../config/ajax-path';
import MemberEventOrderForm from './MemberEventOrderForm';

function MemberEventOrder(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <MemberEventOrderForm />;
}

export default MemberEventOrder;
