import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import MoviesPage from './routes/MoviesPage';
import Movie from './routes/Movie';
import Test from './routes/Test';

import {ITEMS} from './components/NavbarItems';

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
        } else if (e.key === 'rate-movies') {
            const randomMovieId = Math.floor(Math.random() * 10000) + 1
            localStorage.setItem('movieId', randomMovieId.toString());
            axios.get('/movie', {params: {movieId: randomMovieId.toString()}})
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data);
                        // stringify the object and store in the local storage
                        localStorage.setItem('curMovie', JSON.stringify(response.data));
                        navigate('/movie');
                    } else {
                        alert('Something went wrong, please return to home page');
                        navigate('/');
                    }
                }).catch((error) => alert(error));
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
                                <Route exact path = '/movies' element={<MoviesPage />} />
                                <Route exact path = '/movie' element={<Movie />} />
                                <Route exact path = '/test' element={<Test />} />
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
