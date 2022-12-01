import React, {useState} from 'react';
import {Typography, Button, Row, Col, Divider, Rate} from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';

const { Title } = Typography;

const Movie = () => {
    const userId = localStorage.getItem('myUserId');

    const navigate = useNavigate();

    // set the initial rating value to be 5 for better view effect
    const [value, setValue] = useState(5);
    // const movieId = localStorage.getItem('movieId');
    const curMovie = JSON.parse(localStorage.getItem('curMovie'));

    const movieName = curMovie.title;
    const movieGenres = curMovie.genres;
    const movieYear = curMovie.year;
    const movieId = curMovie.movieId

    const contentStyle = {
        height: '240px',
        color: '#fff',
        lineHeight: '240px',
        textAlign: 'center',
        background: '#364d79',
    };

    const handleSubmitRating = () => {
        let values = {'rating': value};
        values = Object.assign({'movieId': parseInt(movieId)}, values);
        values = Object.assign({'userId': parseInt(userId)}, values);

        axios.post('/rating', values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                console.log(response.data);
                navigate('/movies');

            } else {
                alert('Missing info');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    return (
        <div style={{padding: '120px 120px'}} >
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <Col className="gutter-row" span={12}>
                    <div>
                        <h3 style={contentStyle}>{movieId} {movieName}</h3>
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div>
                        <Title level = {3} italic ={true}>
                            {movieName}
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {4}>
                            Genres: {movieGenres}
                        </Title>
                        <Title level={5}>Year of Release: {movieYear}</Title>
                    </div>

                    <Rate
                        allowHalf
                        onChange={setValue}
                        value = {value}
                    />

                    <Divider />

                    <Button type='default' block onClick={handleSubmitRating}>
                        Submit Rating
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
    )
};

export default Movie;