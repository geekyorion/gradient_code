import React from 'react';
import './modify.css';

export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.initState = this.initState.bind(this);
    }

    componentDidMount() {
        this.initState();
    }

    initState() {
        var passedState = this.props.location.state;
        if(passedState) {
            this.setState({ ...passedState });
        } else {
            this.setState({ color1: "#75B8DA", color2: "#E965AA" });
        }
    }

    render() {
        return(
            <div className="modify-wrapper">
                {console.log(this.state.color1, this.state.color2)}
            </div>
        );
    }
}