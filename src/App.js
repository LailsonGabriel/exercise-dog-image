import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: '',
      name: '',
      dogInfos: [],
    }
    
    this.apiDog = this.apiDog.bind(this);
    this.dogName = this.dogName.bind(this);
    this.submitDogInfos = this.submitDogInfos.bind(this);
  }

  apiDog() {
    const api = 'https://dog.ceo/api/breeds/image/random';
    fetch(api).then(data => data.json())
    .then((response) => {
      this.setState({
        data: response,
        name: '',
      })
      this.splitDogBreed(response.message)
    })
  }

  componentDidMount() {
    if(localStorage.getItem('dog') !== null) {
      const localStorageLength = JSON.parse(localStorage.getItem('dog'));
      this.setState({
        data: {message: localStorageLength[0]},
        name: localStorageLength[1],
      })
    }
    this.apiDog();
  }

  splitDogBreed(dogBreed) {
    const result = dogBreed.split('/');
    return alert(result[4]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.message.includes('terrier') === true) return false;
    return true;
  }

  dogName({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
  }

  submitDogInfos() {
    const arr = [];
    const { data, name } = this.state;
    this.setState({
      dogInfos: [data.message, name]
    })
    arr.push(data.message, name)
    localStorage.setItem('dog', JSON.stringify(arr));
  }

  localStorageLoading() {
    const picture = JSON.parse(localStorage.getItem('dog'))[0];
    const name = JSON.parse(localStorage.getItem('dog'))[1];
    return <div>
      <img src={ picture } alt={ picture }></img>
        <h3>{ name }</h3>
      </div>
  }

  render() {
    const { data } = this.state;
    const loading = <p>loading...</p>
    if(data === '') return loading
    return (
      <div>
        <img src={data.message} alt={data.message}></img>
         <h3>{this.state.name}</h3>
        {/* {this.nameDog !== undefined ? <h1>{this.state.name}</h1> : false} */}
        <div>
        <label>
        Adicione um nome para esse Dog: 
         <input name='name' type='text' onChange={ this.dogName }></input>
         <button type='button' onClick={ this.submitDogInfos }>Enviar</button>
        </label>
        </div>
        <button type='button' onClick={ this.apiDog }>new dog picture</button>
      </div>
    )
  }
}

export default App;
