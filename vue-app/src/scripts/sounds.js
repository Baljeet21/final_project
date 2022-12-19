import cuid from 'cuid'

const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom']
const soundObjs = sounds.reduce((acc, sound) =>{
    acc.push({
        filename : `sounds/${sound}.wav`,
        name: sound,
        id: cuid()
    })
    return acc
}, [])

export{
    soundObjs as sounds
}