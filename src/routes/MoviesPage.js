import React, {useState} from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import {Avatar, Button, List, Rate, Space, Typography} from 'antd';
import axios from 'axios';

// TODO: data here should be GET from the backend

const data = Array.from({length: 23,}).map((_, i) => ({
    id: i,
    rating: 0,
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const MoviesPage = () => {

    // const totalNum = data.length;

    const [value, setValue] = useState(2.5);

    // const [movies, setMovies] = useState(null);
    const allMovies = [];
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {},
    };

    const getAllMovies = () => {
        axios.get('/movies')
            .then((response) => {
                // TODO: json object instead of string here
                console.log(response.data);
                console.log(typeof response.data);
            // const responseData = response.data;
            //     console.log(response.data);
            //
            //     const tmp = JSON.parse(JSON.stringify(response.data));
            //     console.log(tmp);
            //     console.log('tmp,', typeof tmp);
            //     const tmpParsed = JSON.parse(tmp);
            //     console.log('tmpParsed, ', typeof tmpParsed);
            // console.log(response);
            // console.log(typeof response.data);

            // const curMovie = {
            //     href: 'https://ant.design',
            //     title: `ant design part ${i}`,
            //     avatar: 'https://joeschmoe.io/api/v1/random',
            //     description:
            //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content: {response.data.}
            // }
            // setProfile({
            //     profile_id: responseData.id
            // })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            }
        })
    }

    return (
        <div>
            <Button onClick={getAllMovies}>Click me</Button>
            {allMovies}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
                renderItem={(item) => {
                    // TODO: send back the rating, movieId to the backend
                    return (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="72" key="list-vertical-message" />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}

                            <Typography.Paragraph>
                                //TODO: direct to a new page for separate rating with more movie info
                                Rating: {item.rating}
                                <Rate
                                    allowHalf
                                    defaultValue={2.5}
                                    onChange = {(value) => {
                                        setValue(value);
                                        item.rating = value;
                                        console.log(item.id, item.rating);
                                    }}
                                    // onChange={setValue}
                                    value = {value}
                                    // style ={{borderBottom: 'solid'}}
                                />
                            </Typography.Paragraph>

                        </List.Item>
                    )
                }}
            />
        </div>
    );
}
export default MoviesPage;