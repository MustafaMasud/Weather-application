console.log('Client side JS file loaded!')

fetch('http://puzzle.mead.io/puzzle').then(response => {

    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const mesgTwo = document.querySelector('#mesgTwo')
const mesgOne = document.querySelector('#mesgOne')



weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = searchInput.value

    mesgOne.textContent='Loading...'
    mesgTwo.textContent=''

    fetch ('http://localhost:3000/weather?address='+ encodeURIComponent(location)).then(response => {
    response.json().then((data) => {
        if (data.error){
            
            mesgOne.textContent=''
            mesgTwo.textContent = data.error
        }else{
            
            mesgOne.textContent=''
            mesgTwo.textContent=(data.location +' '+ data.forecast)
            
        }
    })
})
})