import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Confirm_marker from './confirm_marker';

export default class AdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            buttonPopup: false
        };
    }

    componentDidMount() {
        const authorization = 'Bearer ' + window.localStorage.getItem('jsonwebtoken');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/v1/markers/findAllEqualsFalse',
            headers: {
                'Authorization': authorization
            }
        };

        axios.request(config)
            .then((response) => {
                this.setState({ markers: response.data });
                console.log(this.state.markers);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { markers } = this.state;

        return (
            <>
                <Link to="/settings">
                    <svg width="15" height="27" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
                    </svg>
                </Link >
                {markers.length > 0 ? (
                    markers.map(({ id, name, coordinates, tags }) => {
                        // Assuming you want to initialize destination within the map function
                        return (
                            <div key={id}>
                                <h1
                                    onClick={() => this.setState({
                                        buttonPopup: true,
                                        buttonPopup_id: id,
                                        buttonPopup_name: name,
                                        buttonPopup_coordinates_lat: coordinates.split(',')[0].trim(),
                                        buttonPopup_coordinates_lng: coordinates.split(',')[1].trim(),
                                        buttonPopup_tags: tags
                                    })}>{id} {name}</h1>
                                <br />
                                <br />
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <p>No markers found</p>
                    </div>
                )}
                <Confirm_marker
                    trigger={this.state.buttonPopup}
                    setTrigger={trigger => this.setState({ buttonPopup: trigger })}
                    markerInfo={{
                        id: this.state.buttonPopup_id,
                        name: this.state.buttonPopup_name,
                        coordinates: { lat: this.state.buttonPopup_coordinates_lat, lng: this.state.buttonPopup_coordinates_lng },
                        tags: this.state.buttonPopup_tags
                    }}
                />

            </>
        );
    }
}
