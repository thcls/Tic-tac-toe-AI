export class No{
    constructor(time, camp = 'O**XO*X*O'){
        this.leaf = false
        this.deep = time
        this.weight = 0
        this.camp = camp
        this.father = null
        this.children = []
    }
    winTest(){
        let line = ''
        for(let i = 3;i<= 9 ;i += 3){
            line = this.camp.slice(i - 3, i)
            if (this.test(line)){
                return true
            }
        }
        for(let i = 0;i <= 2;i++){
            line = this.camp[i] + this.camp[i+3] + this.camp[i+6]
            if (this.test(line)){
                return true
            }
        }
        line = this.camp[0] + this.camp[4] + this.camp[8]
        if (this.test(line)){
            return true
        }
        line = this.camp[2] + this.camp[4] + this.camp[6]
        if (this.test(line)){
            return true
        }
        if(this.deep === 8){
            this.leaf = true
            this.weight = 1
            this.weightTell(1)
            return false
        }
    }
    test(line){
        let playerMarker = ''
       
        if((this.deep)%2===0){
            playerMarker = 'OOO'
        }else{
            playerMarker = 'XXX'
        }
        if((this.deep)%2===1){
        }
        if (line===playerMarker){
            this.leaf = true
            
            if (this.deep%2==0){
                this.weight = -1
            }else{
                this.weight = 0.5
            }
            this.weightTell(this.weight)
            return true
        }else{
            return false
        }
    }
    generateChild(leafs){
        let playerMarker = ''
        if((this.deep+1)%2===0){
            playerMarker = 'O'
        }else{
            playerMarker = 'X'
        }
        for(let index = 0;index <= 8;index++){
            if(this.camp.charAt(index) === '*'){
                let newCamp = this.camp.slice(0,index)+playerMarker+this.camp.slice(index+1)
                this.appendChild(newCamp, this,leafs)
            }
        }
    }
    appendChild(camp, father, leafs){
        let child = new No(father.deep+1, camp)
        child.father = father
        child.winTest()
        if(father.deep >= 3){
            
            
        }
        father.children.push(child)
        if(!child.leaf){
            leafs.push(child)
        }
    }
    weightTell(value){
        if(this.weight===0||this.father === null){
            return
        }
        let num = (value/this.father.children.length).toFixed(2)
        this.father.weight += parseFloat(num)
        this.father.weightTell(value)
    }
    nextNo(campString){
        for(let no in this.children){
            if(no.includes(campString)){
                return no
            }
        }
    }
}
