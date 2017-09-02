import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import {LocalizerInfobox} from './LocalizerInfobox.jsx';


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

    // -------> function for checking if server res is ok
    handleErrors = (res) => {
        if(!res.ok) {
            throw Error(res.statusText);
        }
        return res;
    }

    // -------> function for checking current lat & lng of ISS
    getCurrPosition = () => {

        const issUrl = "https://api.wheretheiss.at/v1/satellites/25544";
        // res rate limit 1 per second
        let locationBank = [];

        fetch(issUrl)
            .then(this.handleErrors)
            .then(res => res.json()
            .then(res => {
                // console.log(res);
                // console.log(res.timestamp)
                console.log(res.latitude.toFixed(6));
                console.log(res.longitude.toFixed(6));

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
    getLocationName = () => {

        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&language=pl&location_type=APPROXIMATE&key=AIzaSyCDxq86RWVhcaXwLkviwZb61OFFC1-2aBY`;
        // 2,500 free requests per day

        fetch(geoUrl)
            .then(this.handleErrors)
            .then(res => res.json()
            .then(res => {
                // console.log(res);
                console.log(res.results);
                console.log(res.status);
                const status = res.status;
                // const defaultMessage = "wielka wodą, Google nie ma adresu dla tego położenia. Spróbuj za chwilę :)";
                //"ZERO_RESULTS" indicates that the reverse geocoding was successful but returned no results. This may occur if the geocoder was passed a latlng in a remote location.

                // if google reverse geo fails to get location name, try locationiq api
                if (status == "ZERO_RESULTS") {
                    const backupGeoUrl = `https://locationiq.org/v1/reverse.php?format=json&key=9a50598f558cdc&lat=${this.state.lat}&lon=${this.state.lng}`;
                    // 10 000 free requests per day

                    fetch(backupGeoUrl)
                        .then(this.handleErrors)
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

        // automatically update position after 60s without reloading the page
        // this.intervalId = setInterval(() => {
        //     this.getCurrPosition();
        // }, 60000);
    }

    // componentWillUnmount() {
    //     clearInterval(this.intervalId);
    // }

    render() {
        // console.log("Halo Kosmos");
        // console.log(this.state.currentTime);
        // console.log(this.state.location);

        // -------> loading message
        if(this.state.loading && !this.state.error) {
            // console.log("loading");
            return (
                <LocalizerInfobox name='spinner' message="Sprawdzam..." />
            )
        }

        // -------> success message
        if(this.state.dataReady && !this.state.loading) {
            console.log(this.state.currentTime);
            console.log(this.state.location);
            return (
                <LocalizerInfobox name='rocket' message={["O godzinie ", <span key={"time"}>{this.state.currentTime}</span>, " Stacja Kosmiczna ISS właśnie przeleciała sobie nad ", <span key={"location"}>{this.state.location}</span>]} />
                );
        }

        // -------> default message
        if(this.state.error && !this.state.dataReady) {
            console.log(this.state.currentTime);
            console.log("default message");
            return (
                <LocalizerInfobox name='globe' message={["Ups! Jest ", <span key={"time"}>{this.state.currentTime}</span>, " Stacja leci teraz nad wielką wodą i nie chce z nami gadać! Spróbuj za chwilę. Na pocieszenie ", <span key={"link"}><a href="http://iss.astroviewer.net/" target="_blank" title="astroviewer">kliknij tu</a></span>, " i zobacz co widzą teraz astronauci ;)"]} />
            );
        }
    }
}
