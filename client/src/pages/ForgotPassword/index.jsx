import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FORGOT_PASSWORD } from '../../config/ajax-path';
import ForgotPasswordForm from './ForgotPasswordForm';

function ForgotPassword(props) {
    const { auth, setAuth } = props;
    // 嘗試進行頁面跳轉
    const navigate = useNavigate();

    return <ForgotPasswordForm />;
}

export default ForgotPassword;
