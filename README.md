# Where is ISS?
Single page app built with ReactJS v 15.4

## How the app works
App provides information about the current location of the International Space Station based on data from [wheretheiss.at REST API](https://wheretheiss.at/w/developer) and [Google Reverse Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding) or [LocationIq Reverse Geocoding API](https://locationiq.org/).

The app renders a simple welcome screen with a single call-to-action button.
Once you click the button API calls are being sent and the modal with the returned and formatted response is displayed.
App is fully responsive and was designed using the mobile first approach.

## Built with
* ReactJS
* ES6
* SCSS
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React FontAwesome](https://github.com/danawoodman/react-fontawesome)
* [Fetch](https://github.com/github/fetch)
* + some more npm dependencies ([check package.json file for a full list](package.json))

& Webpack to bundle together all of the above.

## API Reference
* [wheretheiss.at REST API](https://wheretheiss.at/w/developer)
* [Google Reverse Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding)
* [LocationIq Reverse Geocoding API](https://locationiq.org/)

### Installing
For local changes and edits clone or download this repo.

Then run:

```
npm install
```

and:

```
npm start
```

& have fun editing!

## Demo
[Click here](https://mongru.github.io/Where_is_ISS/)


* design & code Monika Grubizna
