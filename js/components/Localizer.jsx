import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import { LocalizerInfobox } from './LocalizerInfobox.jsx';


export class Localizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataReady: false,
            lat: "",
            lng: "",
            currentTime: "",
            location: "",
            error: false
        }
    }

    // -------> function for checking current lat & lng of ISS
    getCurrPosition() {
        const issUrl = "https://api.wheretheiss.at/v1/satellites/25544";
        // res rate limit 1 per second
        let locationBank = [];

        fetch(issUrl)
            .then(res => res.json()
            .then(res => {
                const lat = res.latitude.toFixed(6);
                const lng = res.longitude.toFixed(6);
                const timestamp = res.timestamp;

                // Display current time in 00:00:00 format
                const date = new Date(timestamp * 1000);
                const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                const minutes = "0" + date.getMinutes();
                const seconds = "0" + date.getSeconds();
                const currentTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                // console.log(hours, minutes, seconds, currentTime);

                this.setState ({
                    dataReady: true,
                    lat: lat,
                    lng: lng,
                    currentTime: currentTime
                });

                // translate lat & lng to actual location name
                this.getLocationName();

            })
            .catch((err) => {
                this.setState ({
                    error: true
                });
            })
        )
    }


    // -------> function for getting location name based on the current geo position
    getLocationName() {
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&language=en&location_type=APPROXIMATE&key=AIzaSyCDxq86RWVhcaXwLkviwZb61OFFC1-2aBY`;
        // 2,500 free requests per day
        fetch(geoUrl)
            .then(res => res.json()
            .then(res => {
                const status = res.status;
                //"ZERO_RESULTS" indicates that the reverse geocoding was successful but returned no results. This may occur if the geocoder was passed a latlng in a remote location.

                // if google reverse geo fails to get location name, try locationiq api
                if (status == "ZERO_RESULTS") {
                    const backupGeoUrl = `https://locationiq.org/v1/reverse.php?format=json&key=9a50598f558cdc&lat=${this.state.lat}&lon=${this.state.lng}`;
                    // 10 000 free requests per day

                    fetch(backupGeoUrl)
                        .then(res => res.json()
                        .then(res => {
                            console.log(res);
                            // console.log(res.display_name);
                            // console.log(res.error);

                            if(!res.error) {
                                this.setState ({
                                    location: res.display_name,
                                    dataReady: true,
                                    loading: false
                                });
                            }
                            else {
                                this.setState ({
                                    // location: defaultMessage,
                                    dataReady: false,
                                    loading: false
                                });
                            }
                        })
                        .catch((err) => {
                            this.setState ({
                                loading: false,
                                error: true
                            });
                        })
                    )
                }

                // if the current position of ISS has a Google address return current location
                // console.log(res.results[0].formatted_address);
                if(res.results.length > 0) {
                    const currLocationName = res.results[0].formatted_address;
                    this.setState ({
                        location: currLocationName,
                        dataReady: true,
                        loading: false
                    });
                }
            })
            .catch((err) => {
                this.setState ({
                    error: true,
                    loading: false
                });
            })
        )
    }

    componentDidMount() {
        this.getCurrPosition();

        // asynchronously update position after 60s without reloading the page
        // this.intervalId = setInterval(() => {
        //     this.getCurrPosition();
        // }, 60000);
    }

    // componentWillUnmount() {
    //     clearInterval(this.intervalId);
    // }

    render() {
        const { loading, error, dataReady, currentTime, location } = this.state;

        // -------> loading message
        if(loading && !error) {
            return (
                <LocalizerInfobox name='spinner' message="Checking..." />
            )
        }

        // -------> success message
        if(dataReady && !loading) {
            return (
                <LocalizerInfobox name='rocket' message={["At ", <span key={"time"}>{currentTime}</span>, " the International Space Station is located above  ", <span key={"location"}>{location}</span>]} />
                );
        }

        // -------> default message
        if(error && !dataReady) {
            return (
                <LocalizerInfobox name='globe' message={["Oops! At ", <span key={"time"}>{currentTime}</span>, " the International Space Station is located above the ocean and we have no place names available! Please try again in a couple of minutes. If you'd like to see what the astronauts see right now ", <span key={"link"}><a href="http://iss.astroviewer.net/" target="_blank" title="astroviewer">click here</a></span>]} />
            );
        }
    }
}
