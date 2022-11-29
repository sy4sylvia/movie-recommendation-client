import React, {useState} from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, List, Menu, Input, Typography} from 'antd';
import axios from 'axios';

import './App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function App() {

    const [profile, setProfile] = useState(null);
    const [movies, setMovies] = useState(null);

    const getProfile = () => {
        axios({
            method: 'GET',
            url: '/profile'
        }).then((response) => {
            const responseData = response.data
            setProfile({
                profile_id: responseData.id
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            }
        })
    }

    // TODO: post the id to the backend, and receive a response of the recommended movies
    const onSearch = (value) => {
        axios.post('/user', {
            userId: parseInt(value)
        }).then((response) => {
            // correspond to the parsed on line 73
            if (response.status === 200) {
                setMovies(response.data);
            } else if (response.status === 400) {
                alert('Please input a valid user id');
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            }
        });


    }

    return (
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
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                        (icon, index) => ({
                            key: String(index + 1),
                            icon: React.createElement(icon),
                            label: `nav ${index + 1}`,
                        }),
                    )}
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
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Typography.Title>Welcome to Movie Recommendation System!</Typography.Title>

                        <div className ='input-user-id-bar'>
                            <Search
                                placeholder='Enter user ids to view different movie recommendation for them'
                                enterButton='Get Recommendation'
                                onSearch={onSearch}
                                prefix={<UserOutlined className="site-form-item-icon" />}>
                            </Search>
                        </div>

                        {movies &&
                            <div className='movie-list'>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={movies}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description={item.genres}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        }





                        <Button onClick={getProfile}>Click me</Button> to Get Your User Id
                        {profile &&
                            <div>
                                <p>Profile name: {profile.profile_id}</p>
                            </div>
                        }

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
    );
}

export default App;
