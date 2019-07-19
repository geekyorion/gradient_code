import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './error.css';

export default class ErrorPage extends React.Component {
    render() {
        return(
            <div className="error-wrapper">
                <div className="error-msg">
                    <h2>Error 404 - Gradient Generator Not Found</h2>
                    <Link to="/">
                        <Button variant="dark" className="ErrorLink">
                            Go to colorful place
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}