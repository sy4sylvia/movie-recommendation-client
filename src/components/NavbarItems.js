import { FileDoneOutlined, StarOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return { key, icon, children, label,};
}

const ITEMS = [
    getItem('Register', 'register', <UserOutlined />),
    getItem('Login', 'login', <UserSwitchOutlined />),
    getItem('View Movies', 'view-movies', <VideoCameraOutlined />),
    getItem('Rate Random Movies', 'rate-movies', <StarOutlined />),
    getItem('Get Recommendation', 'recommendation', <FileDoneOutlined />),
];

export  {ITEMS};