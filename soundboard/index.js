import {createAudioElement, createButtonElement, bindEvents} from "./scripts/html.js";


const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom']
const soundObjs = sounds.reduce((acc, sound) =>{
    acc.push({
        filename : `sounds/${sound}.wav`,
        name: sound,
        id: cuid
    })
    return acc
}, [])

soundObjs.forEach(sound => {
    const audio = createAudioElement(sound)
    const button = createButtonElement(sound)

    document.getElementById('audios').append(audio)
    document.getElementById('buttons').append(button)

    bindEvents({button, audio})
})
