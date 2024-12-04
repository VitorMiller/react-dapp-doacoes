import PropTypes from 'prop-types';
import { isLogged } from './authService';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Authorization = ({ children }) => {
    if (isLogged()) {
        return children;
    } else {
        toast.error('Você precisa estar logado para acessar essa página!', { delay: 1 });
        return <Navigate to="/login" />;
    }
};

Authorization.propTypes = {    
    children: PropTypes.node.isRequired    
};

export default Authorization;