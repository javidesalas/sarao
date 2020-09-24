
function graphicSelector (form, picker, list) {
    if (!list) {list = []}
    //Take the items from the hidden list and set the corresponding images as activated
    picker.forEach( pic => {
        const picId = pic.title
        list.forEach( li => {
            li.innerText === picId? pic.classList.toggle('select'): null
        })
    })
    //Mark those ids in the hidden form
    picker.forEach( pic => {
        if (pic.classList.contains('select')) {
            const picId = pic.title
            form.forEach(elm => {
                console.log(elm.value, picId)
                elm.value === picId ? elm.setAttribute('selected','selected') : null
            })
        }
    })
    //Launch the event so the user can select and deselect clicking the images and it reflects on the form for submission
    picker.forEach(elm =>{
        elm.onclick = e => { 
            e.currentTarget.classList.toggle('select')
            const picId = e.currentTarget.title
            console.log(picId)
            form.forEach(elm => {             
                (elm.value === picId) ? elm.setAttribute('selected','selected') : null        
            })                    
        }   
    })
}
