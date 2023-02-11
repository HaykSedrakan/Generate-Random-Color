const cols = document.querySelectorAll('.col')

// function generateRandomColor(){
//     const hexCodes = '0123456789ABCDEF' 

//     let color = ''
//     for(let i = 0; i < 6;i++)
//     {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }

//     return '#' + color
// }

document.addEventListener('click', event => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ?
            event.target :
            event.target.children[0]


        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

function setRandomColors(isInitial) {
    const colors = isInitial
    ? getColorsFromHash()
    : []
    cols.forEach((col,index) => {

        const text = col.querySelector('h1')
        const button = col.querySelector('button')
        const isLocked = col.querySelector('i').classList.contains('fa-lock')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
         ? colors[index] 
            ? colors[index] 
            : chroma.random()
         : chroma.random()

        if(!isInitial)
        {
            colors.push(color)
        }


        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(button, color)

    })

    updateColorsHash(colors)
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()

    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
       return document.location.hash
             .substring(1)
             .split('-')
             .map(color => '#' + color)
    }

    return []
}

setRandomColors(true)