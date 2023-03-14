import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'}/> ссылка на папку public если там лежит картинка ошибки, но лучше так не делать. Лучше просто взять картинку и импортировать в компоненту



        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='error'/> // проще так 

    )
}

export default ErrorMessage