import React, {useState} from 'react'
import {  UserOutlined } from '@ant-design/icons';
import { Button, Layout, List, Input, Typography} from 'antd';
import axios from 'axios';

import '../App.css';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Search } = Input;

const Home = () => {

    const [profile, setProfile] = useState(null);
    const [movies, setMovies] = useState(null);

    const userId = localStorage.getItem('myUserId');
    console.log(userId);

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

    const onSearch = (value) => {
        axios.post('/user-recommendation', {
            userId: parseInt(value)
        }).then((response) => {
            if (response.status === 200) {
                setMovies(response.data);
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                alert('Please try a user id between 1 and 610 besides your user id.');
            } else {
                alert(error);
            }
        });
    }

    return (
        <Content
            style={{
                margin: '0',
            }}
        >
            <div
                className="site-layout-background"
                style={{
                    padding: 0,
                    minHeight: 360,
                }}
            >
                <Typography.Title style={{margin: '7%'}}>
                    Welcome to Movie Recommendation System!
                </Typography.Title>

                <Button onClick={getProfile}>Click me</Button> to Get Your User Id
                {profile &&
                    <div>
                        <p> Your User Id: {userId}</p>
                    </div>
                }
                <div className ='input-user-id-bar'>
                    <Search
                        placeholder='Enter a user id between 1 and 610 to view the movie recommendation'
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
                                        title={item.title}
                                        description={item.genres}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                }

            </div>
        </Content>
    );
}

export default Home;
