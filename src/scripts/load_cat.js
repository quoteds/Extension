let motion = require('animejs')
let quotes = []
let cat
let quote

const run = () => {
    fetch(' http://127.0.0.1:5000/main')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.quotes)
        for(let i in data.quotes) {
            quotes.push(data.quotes[i])
        }
        
    })
    
}

// let slideRight = () => {
//     motion({
//         targets: '.part-1 .part-2',
//         translateX: -250,
//         duration: 2000 
//     })
// }

document.querySelector('.fa-chevron-circle-right').addEventListener('click',slideRight)
run()