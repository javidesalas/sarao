class CharacterApiHandler {

    constructor() {
        //El nombre de app podemos cambiarlo
        this.app = axios.create({
            baseURL: 'https://rickandmortyapi.com/api/character'
        })
    }


    getAllRick = () => this.app.get('/?name=rick')
    getAllMorty = () => this.app.get('/?name=morty')
    getAllFemale = () => this.app.get(`/?gender=female`)
    getAllUnknown = () => this.app.get(`/?gender=unknown`)
    getAllMale = () => this.app.get('/?gender=male')


} 