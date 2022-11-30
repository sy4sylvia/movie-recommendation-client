import React, { useEffect, useState } from 'react';
import {Table, Typography} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

//
// const searchURL = 'http://localhost:8080/api/product/search';
// const productURL = 'http://localhost:8080/api/product/';

// const getItem = (text, value) => {
//     return { text, value,};
// }
//
// const furnitureChildren = [];
// const officeChildren = [];
// const techChildren = [];
//
// _.forEach(FURNITURE, function(obj) {
//     furnitureChildren.push(getItem(obj.label, obj.key));
// });
//
// _.forEach(OFFICE, function(obj) {
//     officeChildren.push(getItem(obj.label, obj.key));
// });
//
// _.forEach(TECHNOLOGY, function(obj) {
//     techChildren.push(getItem(obj.label, obj.key));
// });

const columns = [
    {
        title: 'Movie Name',
        dataIndex: 'title',
        render: (text) => <a onClick={() => console.log('clicked')}>{text}</a>,
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: 'Genres',
        dataIndex: 'genres',
        filters: [
            {
                text: 'Furniture',
                value: 'Furniture',
                // children: furnitureChildren
            },
            {
                text: 'Office',
                value: 'office',
                // children: officeChildren
            },
            {
                text: 'Technology',
                value: 'technology',
                // children: techChildren
            },
        ],
        onFilter: (value, record) => {
            // Filter on the three categories
            if (value === 'Furniture' || value === 'Office' || value === 'Technology') {
                console.log('record category', record.category);
                return record.category.indexOf(value) === 0;
            } else {
                return record.genres.indexOf(value) === 0;
            }
        }
    },
    {
        title: 'Year',
        dataIndex: 'year',
        sorter: (a, b) => a.year - b.year,
    },
];

const DATA = [
    {
        key: '1',
        id: 'IN-2014-JR162107-41675',
        title: '????????',
        genres: 'Comedy',
        year: '2012'
    },
];

const Test = () => {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const searchText = localStorage.getItem('searchText');
    const fetchMovies = () => {
        console.log('called');
        setLoading(true);
        axios.get('/movies', {params: {q: searchText}})
            .then(function (response) {
                const dummy = {
                    "movieId": 5,
                    "title": "Father of the Bride Part II",
                    "year": 1995
                };

                const dummy2 = {
                    "movies": [
                        dummy
                    ]
                };
                console.log(typeof dummy2)

                // console.log(JSON.parse())
                // console.log('response data on the movies page axios', response.data);
                console.log(typeof response.data);
                console.log(response.data);
                // console.log(JSON.parse(response.data));
                //
                // console.log(JSON.parse(response.data));

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
                    console.log(response);
                    // stringify the object and store in the local storage
                    localStorage.setItem('curMovie', JSON.stringify(response.data));
                    navigate('/movie');
                } else {
                    alert('Ha?');
                    navigate('/');
                }
            }).catch((error) => alert(error));
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
export default Test;