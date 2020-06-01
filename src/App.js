import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm'
import Rank from './Components/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const particlesOptions = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
}

const clApp = new Clarifai.App(
  {apiKey: '7e934085ec81455188c658e1eb54b8ff'}
)

class App extends Component {

  constructor()
  {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) =>
  {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => 
  {
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>
  {
    this.setState({input: event.target.value});
  }

  onSubmit = () =>
  {
    this.setState({imageUrl: this.state.input});
    clApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {this.displayFaceBox(this.calculateFaceLocation(response));})
        .catch(err => console.log(err));
  }

  onRouteChange = (route) =>
  {
    if (route === 'signout')
    {
      this.setState({isSignedIn: false})
    }
    else
    {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route})
  }
  

  render()
  {
    return (
      <div className="App">
        <Particles className="particles"
                  params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
            : ( this.state.route === 'signin'
                  ? <SignIn onRouteChange={this.onRouteChange} />
                  : <Register onRouteChange={this.onRouteChange} />
              
            )
        }
      </div>
    );
  }
}

export default App;
