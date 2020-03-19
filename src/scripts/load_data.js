let date = require('date-fns')
let motion = require('animejs')

let quotes = []
let cat
let quote
let ret = localStorage.getItem("category").toLowerCase()
// let ret = "anime"
let done = true;
let store = [];
if(localStorage.getItem("liked")) {
    store = JSON.parse(localStorage.getItem("liked"))
}
localStorage.setItem("liked",JSON.stringify(store))

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
        console.log(JSON.parse(localStorage.getItem("liked")))
        let arr = JSON.parse(localStorage.getItem("liked"))
        if(arr.includes(quote.quote))
            document.querySelector('.fa-heart').classList.add('heart_red')
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

let like = (e) => {
    console.log("hello")
    if(!document.querySelector('.fa-heart').classList.contains('heart_red')) {
        document.querySelector('.fa-heart').classList.add('animated','pulse', 'heart_red')
        let curr = document.querySelector('.counter').innerHTML
        console.log(curr)
        document.querySelector('.counter').innerHTML = parseInt(curr,10)+1
        let liked = document.querySelector('.title').innerHTML
        let user_likes = JSON.parse(localStorage.getItem("liked"))
        console.log(user_likes)
        user_likes.push(liked)
        localStorage.setItem("liked",JSON.stringify(user_likes))
        fetch(`http://127.0.0.1:5000/like`, {
            method: "PUT",
            body: JSON.stringify({
                cat: ret,
                quote: liked,
                like: parseInt(curr,10)+1
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        console.log(user_likes)
    }
    
}
document.querySelector('.button').addEventListener("click",showcats)

document.querySelectorAll('.choice').forEach((choice) => {
    choice.addEventListener("click",changecat)
})

document.querySelector('.like').addEventListener("click", like)

run()