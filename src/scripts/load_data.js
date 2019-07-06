let date = require('date-fns')
let motion = require('animejs')

let quotes = []
let cat
let quote
let ret = localStorage.getItem("category").toLowerCase()
let done = true;

let colors = ["#333C44","#70B17C","#AF3B33"]

document.querySelector('#current_tag').innerHTML = ''+ret[0].toUpperCase()+ret.substr(1)

const run = () => {
    fetch(`http://127.0.0.1:5000/${ret}`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.quotes)
        for(let i in data.quotes) {
            quotes.push(data.quotes[i])
        }
        num = Math.floor(Math.random() * data.quotes.length)
        col = Math.floor(Math.random() * colors.length)
        color = colors[col]
        quote = quotes[num]
        console.log(quote)
        document.querySelector('body').style.backgroundColor = color
        let title = document.querySelector('.title')
        title.innerHTML = quote.quote
        let author = document.querySelector('.auth')
        author.innerHTML = `- ${quote.author}`
        let ans = String(date.startOfToday())
        // let day = ans.substr(0,4)
        document.querySelector('.date').innerHTML = `${ans.substring(0,3)}  ${ans.substring(8,10)}`
        console.log(date.startOfYesterday())
    })
    let updateClock = () => {
        let d = new Date()
        document.querySelector('#time').innerHTML = `${d.getHours()} : ${d.getMinutes()}`
        console.log(`${d.getHours()} : ${d.getMinutes()}`)
        setTimeout(updateClock,1000)
    }
    updateClock()
}

let showcats = () => {
    console.log("hello")
    if(done) {
        document.querySelectorAll('li').forEach((li) => {
            li.classList.remove("hide")
            li.classList.add("show")
        })
        motion({
            targets: '.cats',
            height: '200px',
            easing: 'easeInOutQuad',
            loop:false
        })
        done = false
    }
    else {
        document.querySelectorAll('li').forEach((li) => {
            li.classList.remove("show")
            li.classList.add("hide")
        })
        motion({
            targets: '.cats',
            height: '0',
            easing: 'easeInOutQuad',
            loop:false
        })
        done = true
    }
    // document.querySelector('.cats').style.display = "block"
}


let changecat = (e) => {
    console.log(e)
    let val = e.target.innerHTML
    document.querySelector('#current_tag').innerHTML = val
    localStorage.setItem("category",val)
    run()
}  

document.querySelector('.button').addEventListener("click",showcats)
document.querySelectorAll('.choice').forEach((choice) => {
    choice.addEventListener("click",changecat)
})
run()