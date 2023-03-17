import {Camp} from "./camp.js"
import { No } from "./minmax.js"

let time = 0
const buttonList = document.querySelectorAll('.camp')
const campo = []
let winLine = []
let line = []
let no = ''
let root = ''
let leafs = []
let timer = []
let gameOver = false

for(let button in buttonList){
    let square = new Camp(buttonList[button])
    line.push(square)
    if((1+button)%3 === 0) {
        campo.push(line)
        line = []
    }
}

document.addEventListener('click', (event) =>{
    let element = event.target
    if('Restart' === event.target.innerText){
        restart()
        return
    }else if(time%2!==0 || gameOver){
        return
    }
    
    let clicked = clickField(element)
    if(campo[clicked[0]][clicked[1]].click(time%2===0)){
        time++
        if(winTest()){
            win(winLine)
        }
        setTimeout(()=>{
            if(time===1){
                root = new No(0, campStringify())
                no = root
                leafs.push(root)
                while(leafs.length > 0){
                    let i = leafs.shift()
                    i.generateChild(leafs)
                }
                aiPlays()
            }else{
                getNo()
                aiPlays()
                if(winTest()){
                    win(winLine)
                }
            }
            time++
        },500)
    }
})
function restart(){
    timer.map((value)=>{clearInterval(value)})
    no = ''
    root = ''
    leafs = []
    time = 0
    gameOver = false
    for(let buttonLine of campo){
        buttonLine.map((value)=>{value.clear()})
    }
}
function getNo(){
    let campString = campStringify()
    for(let camp of no.children){
        if(camp.camp===campString){
            no = camp
            return
        }
    }
}
function aiPlays(){
    let campString = campStringify()
    let best = no.children[0]
    let secondBest = 0
    for(let camp of no.children){
        if(camp.leaf){
            best = camp
            break
        }else if(camp.weight >= best.weight){
            secondBest = best
            best = camp
        }
    }

    for(let camp of best.children){
        if(camp.leaf && camp.deep !== 8){
            best = secondBest
            break
        }
    }
    no = best
    let position = getCoordinate(campString, no)
    campo[position[0]][position[1]].click(time%2===0)
}
function clickField(element){
    let elementClassList = element.classList
    let elementClass = elementClassList[elementClassList.length-1]

    let clicked = [Number(elementClass[0]),Number(elementClass[1])]

    return clicked
}
function win(line){
    time--
    let i = 0
    for (let button of line){
        setTimeout(()=>{
            timer.push(setInterval(()=>{
                button.win()
            },500))
        },140*i)
        i++
    }
    gameOver = true
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
    let j = 0
    for(let i = 2;i >= 0;i--){
        line.push(campo[j][i])
        j++
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
function campStringify(){
    let camp = ''
    for (let line of campo){
        for(let i of line){
            camp += i.content
        }
    }
    return camp
}
function getCoordinate(camp, no) {
    let line = 0
    let colum = 0
    for(let i = 0; i<=8;i++){
        if(no.camp.charAt(i)!==camp.charAt(i)){
            return [colum, line]
        }else if(line === 2){
            line = 0
            colum++
            continue
        }
        line++   
    }
}