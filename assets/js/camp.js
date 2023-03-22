export class Camp{
    constructor(element){
        this.x = "url('assets/img/close.png')"
        this.o = "url('assets/img/circle.png')"
        this.element = element
        this.content = '*'
    }
    click(time){
        if(this.content !== '*'){
            return false
        }else if(time){
            this.content = 'O'
            this.backgroundImg(this.o)
        }else{
            this.content = 'X'
            this.backgroundImg(this.x)
        } 
        return true
    }
    backgroundImg(img){
        this.element.style.backgroundImage = img
        this.element.style.backgroundRepeat = 'no-repeat'
        this.element.style.backgroundSize = '60%'
        this.element.style.backgroundPosition = 'center'
    }
    clear(){
        this.content = '*'
        this.element.style.backgroundImage = 'none'
        this.element.style.backgroundColor = '#ffffff'
        let tab = document.querySelector('.tab-section')
        tab.style.backgroundColor = '#ffffff'
    }
    win(){
        let color = '#55ff55'
        if(this.element.style.backgroundColor === 'rgb(85, 255, 85)'){
            color = '#ffffff'
        }
        this.element.style.backgroundColor = color
    }
    draw(){
        let tab = document.querySelector('.tab-section')
        tab.style.backgroundColor = '#ffff40'
    }
}
