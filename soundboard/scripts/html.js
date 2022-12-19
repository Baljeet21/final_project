export function createAudioElement({filename}){
    const audio = document.createElement('audio')
    audio.setAttribute('src', filename)
    return audio

}

export function createButtonElement({name}){
    const button = document.createElement('button')
    button.textContent = name
    return button
}

export function bindEvents({button, audio}){
    button.addEventListener('click', () => {
        audio.play()
        button.classList.add('playing')
    })
    audio.addEventListener('ended', () =>{
        button.classList.remove('playing')
    })
}