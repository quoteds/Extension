
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

run()