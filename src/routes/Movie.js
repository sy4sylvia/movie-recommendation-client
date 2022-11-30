import React, {useState} from 'react';
import {Typography, Button, Row, Col, Divider, Rate} from 'antd';
import axios from 'axios';

import 'antd/dist/antd.css';

const { Title } = Typography;

const Movie = () => {
    const [value, setValue] = useState(2.5);

    const movieId = localStorage.getItem('movieId');
    const curMovie = JSON.parse(localStorage.getItem('curMovie'));

    // console.log('curmovie, ', curMovie);
    const movieName = curMovie.title;
    const movieGenres = curMovie.genres;

    // TODO: change the movie image
    const contentStyle = {
        height: '240px',
        color: '#fff',
        lineHeight: '240px',
        textAlign: 'center',
        background: '#364d79',
    };

    const handleSubmitRating = () => {
        // console.log(value);
        // this value here is the rating for the movie
        let values = {'rating': value};
        values = Object.assign({'movieId': movieId}, values);
        console.log(values);  // {movieId: '5', rating: 5}

        axios.post('/rating', values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                console.log(response.data);
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
                        <h3 style={contentStyle}>Movie Image</h3>
                    </div>
                </Col>
                <Col span={4}>

                </Col>
                <Col className="gutter-row" span={8}>
                    <div>
                        <Title level = {3} italic ={true}>
                            {movieId} {movieName}
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {3}>
                            {movieGenres}
                        </Title>
                    </div>

                    <Rate
                        allowHalf
                        defaultValue={2.5}
                        onChange={setValue}
                        value = {value}
                    />

                    <Divider />

                    <Button type='primary' block onClick={handleSubmitRating}>
                        Submit Rating
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
    )
};

export default Movie;