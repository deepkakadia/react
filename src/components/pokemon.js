import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = { pokemonData: undefined, next: null, previous: null, update: 0 };
    }

    componentDidMount() {
        this.getPokemonPage();
    }

    getPokemonPage = async () => {
        try {
            const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/?offset=${this.props.match.params.page * 20}&limit=20`);
            this.setState({ pokemonData: data.results });
            if (data.next !== undefined && data.next !== null) {
                this.setState({ next: (parseInt(this.props.match.params.page) + 1).toString() });
            }
            if (data.previous !== undefined && data.previous !== null) {
                this.setState({ previous: this.props.match.params.page - 1 });
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    refreshPage = () => {
        this.getPokemonPage()
    }
    render() {

        return (
            <div className='App-body'>
                <p>
                    {this.state.next !== null &&
                        <Link to={`/pokemon/page/${this.state.next}`} onClick={this.refreshPage}>NEXT</Link>
                    }
                </p>
                <ul>
                    {this.state.pokemonData &&
                        this.state.pokemonData.map((pokemon) => (
                            <li key={pokemon.id}>
                                <Link to={`/ pokemon / ${pokemon.url.substring(0, pokemon.url.length - 1).slice(34)}`}>{pokemon.name}</Link>
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
}


// const pokemon = () => {
//     const [pokemonData, setPokemonData] = useState(undefined);
//     const [next, setNext] = useState(undefined);
//     const [previous, setPrevious] = useState(undefined);

//     useEffect(() => {
//         async function getPokemonPage() {
//             try {
//                 const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/?offset=${this.props.match.params.page * 20}&limit=20`);
//                 setPokemonData(data)
//                 if (data.next !== undefined && data.next !== null) {
//                     setNext({ next: (parseInt(this.props.match.params.page) + 1).toString() });
//                 }
//                 if (data.previous !== undefined && data.previous !== null) {
//                     setPrevious({ previous: this.props.match.params.page - 1 });
//                 }
//             }
//             catch (e) {
//                 console.log(e);
//             }

//         };
//         getPokemonPage();
//     }, []);



//     return (
//         <div className='App-body'>
//             <p>
//                 {next !== null &&
//                     <Link to={`/pokemon/page/${next}`} onClick={this.getPokemonPage}>NEXT</Link>
//                 }
//             </p>
//             <ul>
//                 {pokemonData &&
//                     pokemonData.map((pokemon) => (
//                         <li key={pokemon.id}>
//                             <Link to={`/ pokemon / ${pokemon.url.substring(0, pokemon.url.length - 1).slice(34)}`}>{pokemon.name}</Link>
//                         </li>
//                     ))}
//             </ul>
//         </div>
//     )

// };

export default pokemon;