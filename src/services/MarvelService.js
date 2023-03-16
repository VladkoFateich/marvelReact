class MarvelService { // вспомогательный файл
    _apiBase = 'https://gateway.marvel.com:443/v1/public/' // выносим из ссылки что бы не дублировать этот больщой текст в коде
    _apiKey = 'apikey=c19ded73884d887f86ae134cceabe223'
    getResource = async (url) => {
        let res = await fetch(url) // через fetch делается запрос на url помещается в res
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: res ${res.status}`) // выкидывает ошибку если проблемы 
        }
        return await res.json()
    }

    getAllCharacters = async ()=> { // метод что бы получить всех персонажей
        const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id)=> { // метод получить персонажа по id и сохранить в res
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }
    _transformCharacter = (char) => {   //метод трансформаци данных
        return {
            id: char.id,
            name:char.name,
            description:char.description,
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url
        }
    }
}

export default MarvelService
