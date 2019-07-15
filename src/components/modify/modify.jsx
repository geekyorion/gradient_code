import React from 'react';
import './modify.css';
import { hexGenerator, rgbGenerator } from './../color-code-generator/code-generator';
import { Button, ButtonGroup, ButtonToolbar, FormControl, InputGroup } from 'react-bootstrap';
import { ShowCopyCode, ViewGradients, DownloadFile } from './../modals/modals.jsx';

export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HEX_1: "#75B8DA",
            HEX_2: "#E965AA",
            color1: "rgb(117, 184, 218)",
            color2: "rgb(233, 101, 170)",
            angle: 135,
            modalShowCode: false,
            modalShowView: false,
            modalShowDownload: false
        };
        this.initState = this.initState.bind(this);
        this.changeColor1 = this.changeColor1.bind(this);
        this.changeColor2 = this.changeColor2.bind(this);
        this.changeAngle = this.changeAngle.bind(this);
    }

    componentDidMount() {
        this.initState();
    }

    initState() {
        var passedState = this.props.location.state;
        if (passedState) {
            var color1_obj = hexGenerator(passedState.color1);
            var color2_obj = hexGenerator(passedState.color2);
            this.setState({
                HEX_1: `#${color1_obj.HEX}`,
                HEX_2: `#${color2_obj.HEX}`,
                color1: passedState.color1,
                color2: passedState.color2
            });
        }
    }

    changeColor1(e) {
        var value = e.target.value;
        this.setState({
            HEX_1: value,
            color1: rgbGenerator(value.substring(1))
        });
    }

    changeColor2(e) {
        var value = e.target.value;
        this.setState({
            HEX_2: value,
            color2: rgbGenerator(value.substring(1))
        });
    }

    changeAngle(e) {
        var value = e.target.value;
        this.setState({
            angle: value
        });
    }

    render() {
        return (
            <div className="modify-wrapper" style={{ background: `linear-gradient(${this.state.angle}deg, ${this.state.color1}, ${this.state.color2})` }}>
                <div className="button-group-root modify-controls">
                    <div className="input-controls">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Color-1</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="color"
                                defaultValue={this.state.HEX_1}
                                value={this.state.HEX_1}
                                onChange={(e) => {this.changeColor1(e)}}
                            />
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Color-2</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="color"
                                defaultValue={this.state.HEX_2}
                                value={this.state.HEX_2}
                                onChange={(e) => {this.changeColor2(e)}}
                            />
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Angle</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="range"
                                min="0"
                                max="360"
                                value={this.state.angle}
                                onChange={(e) => {this.changeAngle(e)}}
                            />
                        </InputGroup>
                    </div>

                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup size="md" className="button-group-child" aria-label="Advanced Operations">
                            <Button variant="dark" onClick={() => this.setState({ modalShowCode: true })}>Show/Copy Code</Button>
                            <ShowCopyCode show={this.state.modalShowCode} onHide={() => this.setState({ modalShowCode: false })} color1={this.state.color1} color2={this.state.color2} angle={this.state.angle} />

                            <Button variant="secondary" onClick={() => this.setState({ modalShowView: true })}>View (Briefly)</Button>
                            <ViewGradients show={this.state.modalShowView} onHide={() => this.setState({ modalShowView: false })} color1={this.state.color1} color2={this.state.color2} />

                            <Button variant="secondary" onClick={() => this.setState({ modalShowDownload: true })}>Download<span className="download-button-icon">&#10143;</span></Button>
                            <DownloadFile show={this.state.modalShowDownload} onHide={() => this.setState({ modalShowDownload: false })} color1={this.state.color1} color2={this.state.color2} angle={this.state.degrees} />
                            {/* <DropdownButton size="md" as={ButtonGroup} variant="success" title="Download" id="bg-nested-dropdown">
                                <Dropdown.Item size="md" eventKey="1">Link1</Dropdown.Item>
                                <Dropdown.Item size="md" eventKey="2">Link2</Dropdown.Item>
                            </DropdownButton> */}
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className="info-class text-center" style={{ borderImageSource: `linear-gradient(135deg, ${this.state.color1}, ${this.state.color2})` }}>
                    <div><span>Color-1: {this.state.color1} <span className="color-box" style={{ background: this.state.color1 }}></span></span></div>
                    <div><span>Color-2: {this.state.color2} <span className="color-box" style={{ background: this.state.color2 }}></span></span></div>
                    <div><span>Angle: {this.state.angle} degrees</span></div>
                </div>
            </div>
        );
    }
}