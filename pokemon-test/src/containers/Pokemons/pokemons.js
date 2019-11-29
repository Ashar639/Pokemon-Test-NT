import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Pokemon/pokemon';

class Pokemons extends Component {
  state = {
    pokemons: [],
    currentPage: 1,
    itemPerPage: 3,
    upperPageBound: 3,
    lowerPageBound: 0,
    isPrevBtnActive: 'disabled',
    isNextBtnActive: '',
    pageBound: 3
  };

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon').then(response => {
      console.log(response.data);
      const pokemons = response.data.results;
      const updatedPokemons = pokemons.map(pokemon => {
        return {
          ...pokemon
        };
      });
      this.setState({ pokemons: updatedPokemons });
    });
  }
  handleClick = event => {
    let listid = Number(event.target.id);
    this.setState({
      currentPage: listid
    });
    this.setPrevAndNextBtnClass(listid);
  };
  setPrevAndNextBtnClass = async listid => {
    let totalPage = await Math.ceil(
      this.state.pokemons && this.state.pokemons.length / this.state.itemPerPage
    );
    this.setState({ isNextBtnActive: 'disabled' });
    this.setState({ isPrevBtnActive: 'disabled' });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: '' });
    } else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
    } else if (totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
      this.setState({ isPrevBtnActive: '' });
    }
  };
  btnIncrementClick = () => {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  };
  btnDecrementClick = () => {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  };
  btnPrevClick = () => {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({
        upperPageBound: this.state.upperPageBound - this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound - this.state.pageBound
      });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  };
  btnNextClick = () => {
    if (this.state.currentPage + 1 > this.state.upperPageBound) {
      this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound
      });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  };

  render() {
    const {
      pokemons,
      currentPage,
      itemPerPage,
      isPrevBtnActive,
      isNextBtnActive
    } = this.state;
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentPokemonList = pokemons.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const pokemonsData = currentPokemonList.map((pokemon, index) => {
      return (
        <Post
          key={pokemon.name}
          title={pokemon.name}
          img={pokemon.url}
          id={index + 1}
        />
      );
    });

    let renderPrevBtn = null;
    if (isPrevBtnActive === 'disabled') {
      renderPrevBtn = (
        <li className={`pokemon-list-item ${isPrevBtnActive}`}>
          <span> Prev </span>
        </li>
      );
    } else {
      renderPrevBtn = (
        <li className={`pokemon-list-item ${isPrevBtnActive}`}>
          <a href="#" onClick={this.btnPrevClick}>
            {' '}
            Prev{' '}
          </a>
        </li>
      );
    }
    let renderNextBtn = null;
    if (isNextBtnActive === 'disabled') {
      renderNextBtn = (
        <li className={`pokemon-list-item ${isNextBtnActive}`}>
          <span> Next </span>
        </li>
      );
    } else {
      renderNextBtn = (
        <li className={`pokemon-list-item ${isNextBtnActive}`}>
          <a href="#" onClick={this.btnNextClick}>
            {' '}
            Next{' '}
          </a>
        </li>
      );
    }

    return (
      <div>
        <section className="pokemon-section">
          {pokemonsData}
          <ul className="pokemon-list">
            {renderPrevBtn}
            {renderNextBtn}
          </ul>
        </section>
      </div>
    );
  }
}

export default Pokemons;
