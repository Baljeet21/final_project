const height = process.argv[2] ||10;
const widestLayer = height - 1
const maxLeaves = createLeaves(widestLayer)

function createLeaves(layer){
    return layer * 2 - 1
}

function createAir(layer){
    return (maxLeaves - createLeaves(layer)) / 2
}


for(let i = 1; i<=widestLayer; i++){
    console.log(' '.repeat(createAir(i))+'#'.repeat(createLeaves(i)))
}
console.log(' '.repeat(createAir(1))+'#'.repeat(createLeaves(1)))



