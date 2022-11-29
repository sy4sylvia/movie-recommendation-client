import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {useNavigate} from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import {ITEMS} from "./components/NavbarItems";

const { Header, Content, Footer, Sider } = Layout;

function App() {
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log(e);
        if (e.key === 'register') {
            navigate('/register');
        } else if (e.key === 'login') {
            navigate('/login');
        } else if (e.key === 'view-movies') {
            navigate('/movies');
        }
    };

    return (
        <div className='App'>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu
                        onClick={onClick}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}
                        items={ITEMS}
                    />
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{
                            color: 'white',
                            padding: 0,
                        }}
                    >
                        Popcorn Movie Recommendation System
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                        }}
                    >
                        <div>
                            <Routes>
                                <Route exact path={'/'} element={<Home />} />
                                <Route exact path={'/home'} element={<Home />} />
                                <Route exact path = '/register' element={<Register />} />
                                <Route exact path = '/login' element={<Login />} />
                            </Routes>
                        </div>

                    </Content>

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Popcorn Movie Recommendation System ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>

            {/*<Footer*/}
            {/*    style={{*/}
            {/*        textAlign: 'center',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Awesome E-commerce ©{new Date().getFullYear()}*/}
            {/*</Footer>*/}

        </div>
    );
}

export default App;
