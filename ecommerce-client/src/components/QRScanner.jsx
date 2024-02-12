import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

class QRScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: '',
        };
    }

    handleError = (err) => {
        console.error(err);
    };

    handleScan = (data) => {
        if (data) {
            this.setState({
                result: data,
            });
        }
    };

    render() {
        const previewStyle = {
            width: '100%',
        };

        return (
            <div className="flex justify-center">
                <div className='w-48 h-48'>
                    <QrReader
                        delay={this.state.delay}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                    <p>{this.state.result.text}</p>
                </div>
            </div>
        );
    }
}

export default QRScanner;
