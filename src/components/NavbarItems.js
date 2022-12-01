import { StarOutlined, UserDeleteOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return { key, icon, children, label,};
}

const ITEMS = [
    getItem('Register', 'register', <UserOutlined />),
    getItem('Login', 'login', <UserSwitchOutlined />),
    getItem('View Movies', 'view-movies', <VideoCameraOutlined />),
    getItem('Rate Random Movies', 'rate-movies', <StarOutlined />),
    getItem('Log Out', 'logout', <UserDeleteOutlined />),
];

export  {ITEMS};