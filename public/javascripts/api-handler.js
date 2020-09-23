class CharacterApiHandler {

    constructor() {
        //El nombre de app podemos cambiarlo
        this.app = axios.create({
            baseURL: 'https://rickandmortyapi.com/api/character'
        })
    }


    getAllRickAlive = () => this.app.get(`/?name=rick&status=alive`)
    getAllRickDead = () => this.app.get(`/?name=rick&status=dead`)
    getAllRickUnknown = () => this.app.get(`/?name=rick&status=unknown`)

    getAllMortyAlive = () => this.app.get(`/?name=morty&status=alive`)
    getAllMortyDead = () => this.app.get(`/?name=morty&status=dead`)
    getAllMortyUnknown = () => this.app.get(`/?name=morty&status=unknown`)

    getAllGirlsFemale = () => this.app.get(`/?gender=female`)
    geAllUnknown = () => this.app.get(`/?gender=unknown`)
}