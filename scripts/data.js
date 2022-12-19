const data = {
    color: 'red',
    name: 'Jane Doe',
    type: 'Superhero',
    animalLongKeyName: 'Shark',
    number: 42,
    heroes: ['Wonder Woman:DC', 'Batman:DC', 'Thor:Marvel', 'Ant Man:Marvel'],
};

const biggestNum = [1, 5, 6, 8].reduce((x, n) =>{
    console.log(n, x)
    return n > x ? n: x

}, 0)

// console.log(biggestNum)

const heroObjs = data.heroes.reduce((acc, h) =>{
    const [hero, studio] = h.split(':')
    acc.push({
        hero, studio
    })
    return acc
}, [])
console.log(heroObjs)
// const originalHeroes = [...data.heroes]
// data.heroes.push('Superman:DC')
// console.log(originalHeroes)

//rest operator
function printHeroes(...heroes){ //everything that will get it, just put it to the array
    heroes.forEach(h => console.log(h))
}

//Destructuring
//Arrays
const [firstname, lastname] = ['Alica', 'holla']
console.log(firstname, lastname)


function printName({name}){
    console.log('Tha name is ', name)
}
//Objects
const {color, name, animalLongKeyName: animal} = data
console.log(color, name, animal)

printName(data)
printHeroes(...data.heroes, 'Spiderman: Marvel' )