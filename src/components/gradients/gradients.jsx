import React from 'react';
import getColors from './colors';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './gradients.css';
import { hexGenerator } from './../color-code-generator/code-generator';

var userColors = [];

const getUserColors = (startIndex = 0, limit = 16) => {
    return userColors.slice(startIndex, startIndex + limit);
}

export default class Gradients extends React.Component {
    constructor(props) {
        super(props);
        this.loadMainColors = this.loadMainColors.bind(this);
        this.loadUserColors = this.loadUserColors.bind(this);
        this.loadMoreMainColors = this.loadMoreMainColors.bind(this);
        this.loadMoreUserColors = this.loadMoreUserColors.bind(this);
        this.pushColors = this.pushColors.bind(this);
        this.loadTime = 1;
        this.state = {
            allColors: [],
            startIndex: 0,
            limitColors: 16,
            mainComponent: true,
        };
        this.initScrollEvent = this.initScrollEvent.bind(this);
        this.loadingHandler = this.loadingHandler.bind(this);
        this.initiateLoading = this.initiateLoading.bind(this);
        this.removeColor = this.removeColor.bind(this);
    }

    initScrollEvent() {
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                if (this.state.mainComponent) {
                    this.loadMoreMainColors();
                } else {
                    this.loadMoreUserColors();
                }
            }
        };
    }

    removeColor(key) {
        localStorage.removeItem(key);
        var filteredColors = this.state.allColors.filter(color => color.key !== key);
        this.setState({ allColors: filteredColors }, () => {
            this.loadMoreUserColors();
        });
    }

    pushColors(colors) {
        var colorList = [];
        colors.forEach((color, idx) => {
            var key = Object.keys(color)[0];
            var value = JSON.parse(color[key]);
            var element = (<Col xs="12" sm="6" md="3" key={key} style={{ padding: "0" }}>
                <div className="gradient-box" style={{ background: `linear-gradient(135deg, ${value.color1}, ${value.color2})`, height: "200px" }}>
                    {this.state.mainComponent ? '' :
                        <Button variant="danger" size="sm" className="delete-gradient" onClick={() => { this.removeColor(key); }}>
                            <span>&#10005;</span>
                        </Button>
                    }
                    <div className="hexCodes">
                        <span>#{hexGenerator(value.color1).HEX} &#8658; #{hexGenerator(value.color2).HEX}</span>
                    </div>
                    <Button variant="info" className="modify-gradient">
                        <Link to={{ pathname: '/modify', state: { color1: value.color1, color2: value.color2 } }} className="modify-link">
                            View / Modify
                        </Link>
                    </Button>
                </div>
            </Col>);
            colorList.push(element);
        });
        this.setState({ allColors: [...this.state.allColors, ...colorList] });
    }

    loadingHandler(colors) {
        if (colors.length === 0) {
            return;
        }
        this.pushColors(colors);
        this.loadTime++;
    }

    loadMoreMainColors() {
        var colors = getColors(this.state.startIndex + this.state.limitColors * this.loadTime, this.state.limitColors);
        this.loadingHandler(colors);
    }

    loadMoreUserColors() {
        var colors = getUserColors(this.state.startIndex + this.state.limitColors * this.loadTime, this.state.limitColors);
        this.loadingHandler(colors);
    }

    loadMainColors() {
        var colors = getColors(this.state.startIndex, this.state.limitColors);
        this.pushColors(colors);
    }

    loadUserColors() {
        userColors = [];
        var colorKeys = Object.keys(localStorage);
        colorKeys.sort().reverse();
        for (var i = 0; i <= colorKeys.length - 1; i++) {
            let key = colorKeys[i];
            if(key.startsWith('gradient-')) {
                let value = localStorage.getItem(key);
                userColors.push({ [key]: value });
            }
        }
        var colors = getUserColors(this.state.startIndex, this.state.limitColors);

        this.pushColors(colors);
    }

    componentWillReceiveProps() {
        window.removeEventListener("scroll", () => {
            if (this.state.mainComponent) {
                this.loadMoreMainColors();
            } else {
                this.loadMoreUserColors();
            }
        });

        this.loadTime = 1;

        this.setState({
            allColors: [],
            mainComponent: true
        }, () => {
            this.initiateLoading();
        });
    }

    initiateLoading() {
        if (this.props.location.pathname === "/user-gradients") {
            this.setState({ mainComponent: false }, () => {
                this.loadUserColors();
            });
        } else {
            this.loadMainColors();
        }
        this.initScrollEvent();
    }

    componentDidMount() {
        this.initiateLoading();
    }

    render() {
        var heading = this.state.mainComponent ? <h4>Pre-generated Gradients</h4> : <h4>Random Gradients Generated by You</h4>
        return (
            <div className="gradient-wrapper">
                <div className="gradient-row text-center">
                    <div className="gradient-info">
                        {heading}
                        <span>Hover/click on gradients to get further information</span>
                    </div>
                    <Row>
                        {this.state.allColors.length ? this.state.allColors :
                            <div className="empty-gradient">
                                <h2>You didn't generate any gradient.</h2>
                            </div>
                        }
                    </Row>
                    {!this.state.allColors.length || this.state.mainComponent ? '' : <div>
                        <Button variant="danger" onClick={() => {
                            localStorage.clear();
                            this.setState({ allColors: [] });
                        }} className="delete-all">Delete All Gradients</Button>
                    </div>}
                </div>
            </div>
        );
    }
}
