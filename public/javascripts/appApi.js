const characterApi = new CharacterApiHandler()

// mostrarPersonajes()


//
// Creación nuevo personaje
const picButton = document.querySelector('#fetch-all')
picButton.onclick = e => {
    e.preventDefault()
    picButton.style.display='none'
    

    let profilepicture = []

    const characterDiv = document.querySelector('.character-picker')

    function getRickPics() {

        return characterApi.getAllRick()
            .then(character => profilepicture.push(getRandomPic(character)))
            .catch(err => console.log('eeeee', err))

    }

    function getMortyPics() {

        return characterApi.getAllMorty()
            .then(character => profilepicture.push(getRandomPic(character)))
            .catch(err => console.log('eeeee', err))

    }

    function getFemalePics() {

       return characterApi.getAllFemale()
            .then(character => profilepicture.push(getRandomPic(character)))
            .catch(err => console.log('eeeee', err))

    }

    function getMalePics() {

       return characterApi
            .getAllMale()
            .then(character => profilepicture.push(getRandomPic(character)))
            .catch(err => console.log('eeeee', err))

    }

    function getUnknownPics() {

       return characterApi.getAllUnknown()
            .then(character => profilepicture.push(getRandomPic(character)))
            .catch(err => console.log('eeeee', err))
    }

    function getRandomPic(character) {

        const imageArr = character.data.results.map(elm => {
            return elm.image
        })
        let numRandom = Math.floor(Math.random() * imageArr.length)
       
         return imageArr[numRandom]
    }
    
    Promise.all([getRickPics(), getMortyPics(), getFemalePics(), getFemalePics(), getMalePics(), getUnknownPics()])
        .then(elm => {
        for (let i = 0; i < profilepicture.length; i++){
            
            let newImage = new Image()
            newImage.setAttribute('src', `${profilepicture[i]}`)
            newImage.setAttribute('alt', 'profile picture')
            
            let imageDiv = document.createElement('div')
            imageDiv.classList.add('picframe')
            characterDiv.appendChild(imageDiv)
            
            imageDiv.appendChild(newImage)

            characterDiv.classList.remove('hidden')

            
        }
           
            const profileImages = characterDiv.querySelectorAll('.picframe img')
            console.log(profileImages)
                profileImages.forEach(elm =>{
                    elm.onclick = e => { 
                const urlPic =  e.currentTarget.src
                console.log(urlPic)
                document.getElementById('image-input').value = urlPic
                characterDiv.classList.add('hidden')
                

            }

            })     
    
    })        
        .catch( err => console.log('eeeee', err))
   
 }   






    //inputs[0].innerHTML = `<img src='${profilepicture[0]}'>, <img src='${profilepicture[1]}'>, <img src='${profilepicture[2]}'>`








