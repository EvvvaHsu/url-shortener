
function sample(array) {
    let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}


function generateURL(){

const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const lowercaseArray = lowerCaseLetters.split('')
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const uppercaseArray = upperCaseLetters.split('')
const numbers = '1234567890'
const numbersArray = numbers.split('')
const collection = lowercaseArray.concat(uppercaseArray, numbersArray)
let urlRoute = "http://localhost:3000/"
for (let i = 0; i < 5; i++) {
    urlRoute += sample(collection)
}
return urlRoute
}

module.exports = generateURL

//console.log(generateURL())


