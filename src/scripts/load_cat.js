// import glide from '@glidejs/glide'
let motion = require('animejs')
let glide = require('@glidejs/glide')
let quotes = []
let cat
let quote

let likes = document.querySelectorAll(".likes")
const run = () => {
    fetch(' http://127.0.0.1:5000/main')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.quotes)
        for(let i in data.quotes) {
            quotes.push(data.quotes[i])
            likes[i].innerHTML = `${data.quotes[i].likes} likes`
        }

    })
}

run()
