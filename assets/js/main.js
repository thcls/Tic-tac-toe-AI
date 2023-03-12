import {Camp} from "./camp.js"
let time = 0
let winner = null
const buttonlist = document.querySelectorAll('.camp')
const campo = []
let line = []
let winLine = []
for(let button in buttonlist){
    let square = new Camp(buttonlist[button])
    line.push(square)
    if((1+button)%3 === 0) {
        campo.push(line)
        line = []
    }
}
document.addEventListener('click', (event) =>{
    let element = event.target
    let clicked = clickField(element)
    if(campo[clicked[0]][clicked[1]].click(time%2===0)){
        time++
        if(winTest()){
            alert('win')
            win(winLine)
        }
    }
})
function clickField(element){
    let elementClassList = element.classList
    let elementClass = elementClassList[elementClassList.length-1]

    let clicked = [Number(elementClass[0]),Number(elementClass[1])]

    return clicked
}
function win(line){
    line.map((value)=>{
        let index = 0
        let t = value
        setInterval((t, index)=>{
            let color
            if(index%2){
                color = 'green'
            }else{
                color = 'white'
            }
            t.element.style.backgroundColor = color
            index++
        },200)
    })     
}
function winTest(){
    for(let i in campo){
        line = campo[i]
        if (test(line)){
            return true
        }
    }
    for(let i = 0;i <= 2;i++){
        line = []
        for(let j = 0;j <= 2;j++){
            line.push(campo[j][i]) 
        }
        if (test(line)){
            return true
        }
    }
    
    line = []
    for(let i = 0;i <= 2;i++){
        line.push(campo[i][i])
    }
    if (test(line)){
        return true
    }

    line = []
    for(let i = 2;i >= 0;i--){
        line.push(campo[i][i]) 
    }
    if (test(line)){
        return true
    }
    return false
}
function test(line){
    let lineString = line.reduce((acc, value) =>{
        return acc += value.content
    }, '')
    winLine = line
    return (lineString.includes('XXX') || lineString.includes('OOO'))
}