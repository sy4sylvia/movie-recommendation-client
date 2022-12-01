import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import MoviesPage from './routes/MoviesPage';
import Movie from './routes/Movie';

import {ITEMS} from './components/NavbarItems';

const { Header, Content, Footer, Sider } = Layout;

function App() {
    const navigate = useNavigate();
    let randomMovieId = 51;
    // invalid movie id in the database, get random movie id
    if (randomMovieId === 51) {
        axios.get('/movieIds')
            .then(response => {
                if (response.status === 200) {
                    const movieIdList = response.data.movieIds;
                    console.log(typeof movieIdList);
                    randomMovieId = movieIdList[Math.floor(Math.random() * movieIdList.length)];
                    localStorage.setItem('movieId', randomMovieId.toString());
                    console.log(randomMovieId);
                }

            }).catch(error => {
            if (error.response.status === 400) {
                // a lot of missing data
                alert('Something went wrong on our side, please try again.')
            } else {
                alert(error)
            }
        });
    }


    const onClick = (e) => {
        console.log(e);
        if (e.key === 'register') {
            navigate('/register');
        } else if (e.key === 'login') {
            navigate('/login');
        } else if (e.key === 'view-movies') {
            navigate('/movies');
        } else if (e.key === 'rate-movies') {
            axios.get('/movie', {params: {movieId: randomMovieId.toString()}})
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data);
                        // stringify the object and store in the local storage
                        localStorage.setItem('curMovie', JSON.stringify(response.data));
                        navigate('/movie');
                    }
                }).catch((error) => {
                    if (error.response.status === 400) {
                        // a lot of missing data
                        alert('Something went wrong on our side, please try again.')
                    } else {
                        alert(error)
                    }
                });
        } else if (e.key === 'logout') {
            localStorage.clear();
            navigate('/login');
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
                    >
                        <Button
                            onClick={() => navigate('/')}
                            block
                        >
                            Popcorn Movie Recommendation System
                        </Button>

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
