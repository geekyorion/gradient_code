import React from 'react';
// import ReactDOM from 'react-dom';
import './codegenerator.css';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { ShowCopyCode, DownloadFile, ViewGradients } from './../modals/modals.jsx';
import { Link } from 'react-router-dom';

export default class CodeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 135,
            color1: this.generateBackground().color_first,
            color2: this.generateBackground().color_second,
            modalShowCode: false,
            modalShowView: false,
            modalShowDownload: false
        };
        this.generateRandom = this.generateRandom.bind(this);
        this.generateBackground = this.generateBackground.bind(this);
        this.generateRandomBackground = this.generateRandomBackground.bind(this);
        // this.displayMessage = this.displayMessage.bind(this);
        this.rotateAntiClockWise = this.rotateAntiClockWise.bind(this);
        this.rotateClockWise = this.rotateClockWise.bind(this);
    }

    /*
    displayMessage(message) {
        var para = React.createElement('p', { className: "message" }, message);
        ReactDOM.render(para, document.getElementById("generator-root"));
        setTimeout(() => ReactDOM.unmountComponentAtNode(document.getElementById("generator-root")), 1000);

        // var para = document.createElement("p");
        // para.setAttribute("class", "message");
        // para.innerHTML = message;
        // document.body.appendChild(para);
        // setTimeout(() => {para.remove();}, 1000);
    }
    */

    generateRandom() {
        return parseInt(Math.random() * 255);
    }

    generateBackground() {
        var angle = 135;
        var color_first = `rgb(${this.generateRandom()}, ${this.generateRandom()}, ${this.generateRandom()})`;
        var color_second = `rgb(${this.generateRandom()}, ${this.generateRandom()}, ${this.generateRandom()})`;
        var gradient = `linear-gradient(${angle}deg, ${color_first}, ${color_second})`;

        var color_obj = {};
        color_obj.color_first = color_first;
        color_obj.color_second = color_second;
        color_obj.gradient = gradient;

        return color_obj;
    }

    generateRandomBackground() {
        this.setState({ angle: 135, color1: this.generateBackground().color_first, color2: this.generateBackground().color_second });
    }

    rotateAntiClockWise() {
        if (this.state.angle - 45 === -45) {
            this.setState({ angle: 315 });
            // this.setState({ angle: 315 }, () => {
            //     this.displayMessage("Angle: " + this.state.angle);
            // });
        } else {
            this.setState({ angle: this.state.angle - 45 });
        }
    }

    rotateClockWise() {
        if (this.state.angle + 45 === 360) {
            this.setState({ angle: 0 });
        } else {
            this.setState({ angle: this.state.angle + 45 });
        }
    }

    render() {
        return (
            <div className="generator-wrapper" style={{ background: `linear-gradient(${this.state.angle}deg, ${this.state.color1}, ${this.state.color2})` }}>
                <div className="button-group-root">
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup size="md" className="button-group-child" aria-label="Basic Operations">
                            <Button variant="dark" onClick={this.generateRandomBackground}>Generate Random Gradient</Button>
                            <Button variant="secondary" onClick={this.rotateAntiClockWise}>Rotate&nbsp;&#10226;</Button>
                            <Button variant="secondary" onClick={this.rotateClockWise}>Rotate&nbsp;&#10227;</Button>
                        </ButtonGroup>

                        <ButtonGroup size="md" className="button-group-child" aria-label="Advanced Operations">
                            <Button variant="dark" onClick={() => this.setState({ modalShowCode: true })}>Show/Copy Code</Button>
                            <ShowCopyCode show={this.state.modalShowCode} onHide={() => this.setState({ modalShowCode: false })} color1={this.state.color1} color2={this.state.color2} angle={this.state.angle} />

                            <Button variant="secondary" onClick={() => this.setState({ modalShowView: true })}>View (Briefly)</Button>
                            <ViewGradients show={this.state.modalShowView} onHide={() => this.setState({ modalShowView: false })} color1={this.state.color1} color2={this.state.color2} />

                            <Button variant="info">
                                <Link to={{ pathname: '/modify', state: { color1: this.state.color1, color2: this.state.color2} }} className="modify-link">
                                    Modify
                                </Link>
                            </Button>

                            <Button variant="secondary" onClick={() => this.setState({ modalShowDownload: true })}>Download<span className="download-button-icon">&#10143;</span></Button>
                            <DownloadFile show={this.state.modalShowDownload} onHide={() => this.setState({ modalShowDownload: false})} color1={this.state.color1} color2={this.state.color2} angle={this.state.angle} />
                            {/* <DropdownButton size="md" as={ButtonGroup} variant="success" title="Download" id="bg-nested-dropdown">
                                <Dropdown.Item size="md" eventKey="1">Link1</Dropdown.Item>
                                <Dropdown.Item size="md" eventKey="2">Link2</Dropdown.Item>
                            </DropdownButton> */}
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className="info-class" style={{ borderImageSource: `linear-gradient(135deg, ${this.state.color1}, ${this.state.color2})` }}>
                    <div><span>Color-1: {this.state.color1} <span className="color-box" style={{ background: this.state.color1 }}></span></span></div>
                    <div><span>Color-2: {this.state.color2} <span className="color-box" style={{ background: this.state.color2 }}></span></span></div>
                    <div><span>Angle: {this.state.angle} degrees</span></div>
                </div>
                {/* <div id="generator-root"></div> */}
            </div>
        );
    }
}

// order:-
// 1. constructor
// 2. Component will mount
// 3. Component did mount
// 4. component unmount