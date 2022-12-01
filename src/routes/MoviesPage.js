import React, { useEffect, useState } from 'react';
import {Table, Typography} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const columns = [
    {
        title: 'Movie Name',
        dataIndex: 'title',
        render: (text) => <a onClick={() => console.log('clicked')}>{text}</a>,
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: 'Genres',
        dataIndex: 'genres',
        sorter: (a, b) => a.genres.localeCompare(b.genres),
    },
    {
        title: 'Year',
        dataIndex: 'year',
        sorter: (a, b) => a.year - b.year,
    },
];

const MoviesPage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchMovies = () => {
        setLoading(true);
        axios.get('/movies')
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    setData(response.data.movies);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.length, // total count before the filter
                        },
                    });
                    //refresh the page if already at the /results
                    // navigate('/movies');
                    // window.location.reload();
                } else {
                    alert('Please log in before you search for a product.');
                    navigate('/login');
                }
            }).catch((error) => alert(error));
    };

    useEffect(() => {
        fetchMovies();
    }, [JSON.stringify(tableParams)]);

    const fetchSingleMovie = (movieId) => {
        localStorage.setItem('movieId', movieId);
        axios.get('/movie', {params: {movieId: movieId}})
            .then(function (response) {
                if (response.status === 200) {
                    // stringify the object and store in the local storage
                    localStorage.setItem('curMovie', JSON.stringify(response.data));
                    navigate('/movie');
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    alert('Movie not found.');
                } else {
                    alert(error);
                }
        });
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <div>
            <Title
                style={{
                    marginTop: '36px',
                }}
            >
                Movies
            </Title>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                onRow={(record) => {
                    return {
                        // click row
                        onClick: () => {
                            console.log(record.movieId);
                            fetchSingleMovie(record.movieId);
                        },
                    };
                }}
            />
        </div>
    )
};
export default MoviesPage;