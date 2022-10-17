import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <section className='footer'>
            <h2>
                <Link to="/">
                </Link>
            </h2>
            <p>
                <strong>Popcorn Movie Recommendation System</strong>
                {' '}
                Copyright© {new Date().getFullYear()}
            </p>
        </section>
    );
}

export default Footer;
