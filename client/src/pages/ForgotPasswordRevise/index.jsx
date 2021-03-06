import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FORGOT_PASSWORD_REVISE } from '../../config/ajax-path';
import ForgotPasswordReviseForm from './ForgotPasswordReviseForm';

function ForgotPasswordRevise(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <ForgotPasswordReviseForm />;
}

export default ForgotPasswordRevise;
