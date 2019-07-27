import React from 'react';
import { Modal, Button, Container, Row, Col, Card, Carousel, Table, InputGroup, FormControl, Alert } from 'react-bootstrap';
import './modals.css';
import { hexGenerator, hslGenerator, hsvGenerator } from './../color-code-generator/code-generator';
import RenderCodeHighlighter from './../prismHighlighter/RenderCodeHighlighter.jsx';

class ShowCopyCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            copyText: "Copy Code",
            copyVariant: "primary"
        };
        this.copyCode = this.copyCode.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.code = "";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps, copyText: "Copy Code", copyVariant: "primary" });
    }

    generateCode() {
        // do not format the this function otherwise it will cause leading spaces problem while showing the code
        return (
            `body {
    background: -webkit-linear-gradient(${this.state.angle}deg, ${this.state.color1}, ${this.state.color2});
    background: -o-linear-gradient(${this.state.angle}deg, ${this.state.color1}, ${this.state.color2});
    background: linear-gradient(${this.state.angle}deg, ${this.state.color1}, ${this.state.color2});
    /* min-height: 100vh; to provide the gradient to the whole screen */
    min-height: 100vh;
    /* margin: 0; is added so that page won't show scrollbar when the content is less */
    margin: 0;
}`
        );
    }

    copyCode() {
        document.getElementById("code-textarea").select();
        document.execCommand("copy");
        this.setState({ copyVariant: "success", copyText: "Code Copied" });
    }

    render() {
        this.code = this.generateCode();

        return (
            <Modal {...this.props} size="lg"
                aria-labelledby="code-generator-modal-centered" centered>
                <Modal.Header closeButton style={{ background: `linear-gradient(90deg, ${this.state.color1}, ${this.state.color2})` }}>
                    <Modal.Title id="code-generator-modal-centered" className="color-card-title">
                        Current Gradient Code CSS Code
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RenderCodeHighlighter code={this.code} lang="css" />
                    <textarea id="code-textarea" defaultValue={this.code}></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="pl-3 pr-3" variant={this.state.copyVariant} onClick={this.copyCode}>{this.state.copyText}</Button>
                    <Button variant="danger" onClick={this.props.onHide}>Close this window</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class DownloadFile extends React.Component {
    constructor(props) {
        super(props);
        this.deviceWidth = window.screen.width;
        this.deviceHeight = window.screen.height;
        this.generateImage = this.generateImage.bind(this);
        this.state = {
            userSpecificHeight: this.deviceHeight,
            userSpecificWidth: this.deviceWidth
        }
    }

    generateImage(width, height, e = null) {
        if (isNaN(width) || isNaN(height)) {
            return
        } else {
            var angle = this.props.angle;
            var canvas = document.createElement("canvas");
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);

            var context = canvas.getContext("2d");
            var fillGradient = null;
            switch (angle) {
                case 45: fillGradient = context.createLinearGradient(0, height, width, 0); break;
                case 90: fillGradient = context.createLinearGradient(0, 0, width, 0); break;
                case 135: fillGradient = context.createLinearGradient(0, 0, width, height); break;
                case 180: fillGradient = context.createLinearGradient(0, 0, 0, height); break;
                case 225: fillGradient = context.createLinearGradient(width, 0, 0, height); break;
                case 270: fillGradient = context.createLinearGradient(width, 0, 0, 0); break;
                case 315: fillGradient = context.createLinearGradient(width, height, 0, 0); break;
                default: fillGradient = context.createLinearGradient(0, height, 0, 0); break;
            }

            fillGradient.addColorStop(0, this.props.color1);
            fillGradient.addColorStop(1, this.props.color2);
            context.fillStyle = fillGradient;
            context.fillRect(0, 0, width, height);

            // change the canvas into data URL
            e.target.download += new Date().getTime() + ".png";
            e.target.href = canvas.toDataURL('image/png');
        }
    }

    render() {
        return (
            <Modal {...this.props} size="lg"
                aria-labelledby="gradient-images-download-options" centered scrollable>
                <Modal.Header closeButton style={{ background: `linear-gradient(90deg, ${this.props.color1}, ${this.props.color2})` }}>
                    <Modal.Title id="gradient-images-download-options" className="color-card-title">
                        Download Gradient Images at Different Resolutions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover responsive size="sm" className="text-center table-vertical-center">
                        <thead>
                            <tr>
                                <th>Resolutions</th>
                                <th>Download Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1366x768</td>
                                <td><a href="#first" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(1366, 768, e) }}>Download</a></td>
                            </tr>
                            <tr>
                                <td>1920x1080</td>
                                <td><a href="#second" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(1920, 1080, e) }}>Download</a></td>
                            </tr>
                            <tr>
                                <td>1200x800</td>
                                <td><a href="#third" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(1200, 800, e) }}>Download</a></td>
                            </tr>
                            <tr>
                                <td>2000x2000</td>
                                <td><a href="#square" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(2000, 2000, e) }}>Download</a></td>
                            </tr>
                            <tr>
                                <td>Device Resoltion ({this.deviceWidth}x{this.deviceHeight})</td>
                                <td><a href="#device" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(this.deviceWidth, this.deviceHeight, e) }}>Download</a></td>
                            </tr>
                            <tr>
                                <td>
                                    User Specific <br />
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Width x Height</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type="number" id="user-specific-width" onChange={(e) => { this.setState({ userSpecificWidth: parseInt(e.target.value) }) }} />
                                        <FormControl type="number" id="user-specific-height" onChange={(e) => { this.setState({ userSpecificHeight: parseInt(e.target.value) }) }} />
                                    </InputGroup>
                                </td>
                                <td><a href="#user" className="table-download-links" download="Gradient_image" onClick={(e) => { this.generateImage(this.state.userSpecificWidth, this.state.userSpecificHeight, e) }}>Download</a></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <Alert variant="info" className="text-center" style={{ margin: 0 }}>
                            User specific width and height are set to device resolution by default.
                            <strong> Higher Resolutions may not work properly.</strong>
                        </Alert>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close this window</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class ViewGradients extends React.Component {
    constructor(props) {
        super(props);
        this.HEX_1 = null;
        this.HEX_2 = null;
        this.color1_array = null;
        this.color2_array = null;
        this.HSV_1 = null;
        this.HSV_2 = null;
        this.HSL_1 = null;
        this.HSL_2 = null;
        this.generateHex = this.generateHex.bind(this);
        this.generateHSV = this.generateHSV.bind(this);
        this.generateHSL = this.generateHSL.bind(this);
    }

    generateHex() {
        var obj1 = hexGenerator(this.props.color1);
        this.HEX_1 = `#${obj1.HEX}`;
        this.color1_array = obj1.color_array;

        var obj2 = hexGenerator(this.props.color2);
        this.HEX_2 = `#${obj2.HEX}`;
        this.color2_array = obj2.color_array;
    }

    generateHSV() {
        this.HSV_1 = hsvGenerator(this.color1_array);
        this.HSV_2 = hsvGenerator(this.color2_array);
    }

    generateHSL() {
        this.HSL_1 = hslGenerator(this.color1_array);
        this.HSL_2 = hslGenerator(this.color2_array);
    }

    render() {
        if (this.props.show === true) {
            this.generateHex();
            this.generateHSV();
            this.generateHSL();
        }
        return (
            <Modal {...this.props} size="lg" aria-labelledby="gradient-color-information" centered scrollable>
                <Modal.Header closeButton style={{ background: `linear-gradient(90deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                    <Modal.Title id="gradient-color-information" className="color-card-title">
                        Current Color Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Row className="show-grid">
                            <Col sm={12} md={6} className="grid-columns">
                                <Card className="card-root color-grid-info" style={{ border: `2px solid ${this.props.color1}` }}>
                                    <Card.Body>
                                        <Card.Title>Color-1 Details</Card.Title>
                                        <div className="card-color-box" style={{ background: this.props.color1 }}></div>
                                        <Card.Text>
                                            <Table striped responsive bordered hover size="sm" className="text-center table-vertical-center">
                                                <tbody>
                                                    <tr>
                                                        <th>RGB code:</th>
                                                        <td>{this.props.color1}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HEX code:</th>
                                                        <td>{this.HEX_1}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HSL code:</th>
                                                        <td>{this.HSL_1}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HSV code:</th>
                                                        <td>{this.HSV_1}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            {/* <span className="card-color-spans"><strong>RGB code:</strong> {this.props.color1}</span>
                                            <span className="card-color-spans"><strong>HEX code:</strong> {this.HEX_1}</span>
                                            <span className="card-color-spans"><strong>HSL code:</strong> {this.HSL_1}</span>
                                            <span className="card-color-spans"><strong>HSV code:</strong> {this.HSV_1}</span> */}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={12} md={6} className="grid-columns">
                                <Card className="card-root color-grid-info" style={{ border: `2px solid ${this.props.color2}` }}>
                                    <Card.Body>
                                        <Card.Title>Color-2 Details</Card.Title>
                                        <div className="card-color-box" style={{ background: this.props.color2 }}></div>
                                        <Card.Text>
                                            <Table striped responsive bordered hover size="sm" className="text-center table-vertical-center">
                                                <tbody>
                                                    <tr>
                                                        <th>RGB code:</th>
                                                        <td>{this.props.color2}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HEX code:</th>
                                                        <td>{this.HEX_2}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HSL code:</th>
                                                        <td>{this.HSL_2}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>HSV code:</th>
                                                        <td>{this.HSV_2}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            {/* <span className="card-color-spans"><strong>RGB code:</strong> {this.props.color2}</span>
                                            <span className="card-color-spans"><strong>HEX code:</strong> {this.HEX_2}</span>
                                            <span className="card-color-spans"><strong>HSL code:</strong> {this.HSL_2}</span>
                                            <span className="card-color-spans"><strong>HSV code:</strong> {this.HSV_2}</span> */}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={12} className="grid-columns">
                                <Card style={{ border: "2px solid black", borderImageSlice: "1", borderImageSource: `linear-gradient(135deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                    <Card.Body>
                                        <Card.Title>Linear Gradients of current colors</Card.Title>
                                        <Carousel fade={true}>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(0deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 0 degree"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 0/360 degree(s)</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(45deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 45 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 45 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(90deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 90 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 90 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(135deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 135 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 135 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(182deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 180 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 180 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(225deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 225 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 225 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(275deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 270 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 270 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            <Carousel.Item className="carousel-gradient" style={{ background: `linear-gradient(315deg, ${this.HEX_1}, ${this.HEX_2})` }}>
                                                <img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
                                                    height="300" width="100%" alt="Gradient Code at 315 degrees"
                                                />
                                                <Carousel.Caption>
                                                    <h3>Angle: 315 degrees</h3>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        </Carousel>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={12} md={6} className="grid-columns">
                                <Card className="card-root color-grid-info" style={{ border: `2px solid ${this.HEX_1}` }}>
                                    <Card.Body>
                                        <Card.Title>Radial Gradient-1</Card.Title>
                                        <div className="card-color-radial" style={{ background: `radial-gradient(${this.HEX_1}, ${this.HEX_2})`, borderColor: this.HEX_1 }}></div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={12} md={6} className="grid-columns">
                                <Card className="card-root color-grid-info" style={{ border: `2px solid ${this.HEX_2}` }}>
                                    <Card.Body>
                                        <Card.Title>Radial Gradient-2</Card.Title>
                                        <div className="card-color-radial" style={{ background: `radial-gradient(${this.HEX_2}, ${this.HEX_1})`, borderColor: this.HEX_2 }}></div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close this window</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export {
    ShowCopyCode,
    DownloadFile,
    ViewGradients
}