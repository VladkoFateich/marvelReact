import { Component } from 'react';

import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import MarvelService from '../../services/MarvelService';
import Spinner from '../app/spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class RandomChar extends Component  {
    constructor(props){
        super(props)
        this.updateChar()
    }
    state = { //для оптимизации все свойства с null просто пустой объект
        char:{},
        loading: true,
        error: false
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    marvelService = new MarvelService()

    onCharLoaded=(char)=> { // отдельная сущность - действие загрузки персонажа
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000) //(max-min)+min 
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded) //для оптимизации приходит метод загрузки объекта
        .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null

    return (
        <div className="randomchar">

            {/* {loading ? <Spinner/> : <View char={char}/>}  логика вынесена выше*/}  
            {errorMessage}
            {spinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }

}

const View = ({char}) => { // скомплнента отрисовки
    const {name, description, thumbnail, homepage, wiki} = char
    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
             {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}
export default RandomChar;