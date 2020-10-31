console.log('Client side JS sctipt is loaded.')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-one')
const messageTwo = document.querySelector('.message-two')
const loadingMessage = document.querySelector('.loading')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()

    const address = search.value
    loadingMessage.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(address)).then(response => 
    response.json().then(data => {
        if (data.error) {
            loadingMessage.textContent = ''
            messageOne.textContent = data.error 
        } else {
            loadingMessage.textContent = ''
            messageOne.textContent = `Location: ${data.location}`
            messageTwo.textContent = `Current temperature is ${data.currentTemp}, but it feels like ${data.feelslikeTemp}`
        }
    })
    )
}
)