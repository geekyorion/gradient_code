import React from 'react';
import Prism from 'prismjs';
import './prism.css';

export default class RenderCodeHighlighter extends React.Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    render() {
        return (
            <pre><code className={`language-${this.props.lang}`}>{this.props.code}</code></pre>
        );
    }
}