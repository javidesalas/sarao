const characterApi = new CharacterApiHandler()

// mostrarPersonajes()


// document.querySelector('#fetch-all').onclick
// Creación nuevo personaje
window.onload = e => {
    e.preventDefault()
    console.log('olaaaaaaaa')

    let profilepicture = []

    const inputs = document.querySelectorAll('.name')




    function getRickPics() {

        characterApi
            .getAllRick()
            .then(character => getRandomPic(character))
            .catch(err => console.log('eeeee', err))

    }

    function getMortyPics() {

        characterApi
            .getAllMorty()
            .then(character => getRandomPic(character))
            .catch(err => console.log('eeeee', err))

    }

    function getFemalePics() {

        characterApi
            .getAllFemale()
            .then(character => getRandomPic(character))
            .catch(err => console.log('eeeee', err))

    }

    function getMalePics() {

        characterApi
            .getAllMale()
            .then(character => getRandomPic(character))
            .catch(err => console.log('eeeee', err))

    }

    function getUnknownPics() {

        characterApi
            .getAllUnknown()
            .then(character => getRandomPic(character))
            .catch(err => console.log('eeeee', err))

    }



    function getRandomPic(character) {

        const imageArr = character.data.results.map(elm => {
            return elm.image
        })
        let numRandom = Math.floor(Math.random() * imageArr.length)


        profilepicture.push(imageArr[numRandom])


    }

    console.log(profilepicture)

    Promise.all([getRickPics(), getMortyPics(), getFemalePics(), getFemalePics(), getMalePics(), getUnknownPics()])
        .then(() => { })
        .catch(err => console.log('eeeee', err))
    let newImage = new Image()

    newImage.setAttribute('src', `${profilepicture[0]}`)
    newImage.setAttribute('alt', 'Cerebro entrenando CSS')
    document.querySelector('.name').appendChild(newImage)






    //inputs[0].innerHTML = `<img src='${profilepicture[0]}'>, <img src='${profilepicture[1]}'>, <img src='${profilepicture[2]}'>`



}




