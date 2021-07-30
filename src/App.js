import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: '',
    }
    
    this.apiDog = this.apiDog.bind(this);
  }

  apiDog() {
    const api = 'https://dog.ceo/api/breeds/image/random';
    fetch(api).then(data => data.json())
    .then((response) => {
      this.setState({
        data: response,
      })
    })
    return <img src={this.state.picture} alt={this.state.picture}></img>
  }

  componentDidMount() {
    this.apiDog();
  }

  splitDogBreed(dogBreed) {
    const result = dogBreed.split('/');
    return alert(result[4]);
  }

  componentDidUpdate() {
    localStorage.setItem('photo', this.state.data.message);
    console.log(this.splitDogBreed(this.state.data.message))
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.message.includes('terrier') === true) return false;
    return true;
  }

  render() {
    const { data } = this.state;
    const loading = <p>loading...</p>
    if(data === '') return loading
    return (
      <div>
        <img src={data.message} alt={data.message}></img>
        <button type='button' onClick={ this.apiDog }>new dog picture</button>
      </div>
    )
  }
}

export default App;
