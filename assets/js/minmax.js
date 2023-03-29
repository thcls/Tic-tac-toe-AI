export class No{
    constructor(time, camp = '*********'){
        this.leaf = false
        this.deep = time
        this.weight = undefined
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
            this.weight = 0
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
        if (line===playerMarker){
            this.leaf = true
            
            if (this.deep%2==0){
                this.weight = -10
            }else{
                this.weight = 10 - this.deep
            }
            return true
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
        father.children.push(child)
        if(!child.leaf){
            leafs.push(child)
        }
    }
    weightTell(){
        if(this.father === null){
            return
        }
        if(typeof this.father.weight === 'undefined'){
            this.father.weight = this.weight
        }else if(this.father.deep%2 === 0 && this.father.weight < this.weight){    
            this.father.weight = this.weight
        }else if(this.father.deep%2 !== 0 && this.father.weight > this.weight){
            this.father.weight = this.weight
        }
    }
    weightDefine(){
        for(let node of this.children){
            node.weightDefine()
                node.weightTell()
        }
        if(typeof this.weight !== 'undefined'){
            this.weightTell()
        }
    }
    nextNo(campString){
        for(let no in this.children){
            if(no.includes(campString)){
                return no
            }
        }
    }
    bestPlay(){
        this.children.sort((a,b) => {
            if(a.weight > b.weight){
                return -1 
            }else{
                return 1
            }
        })
        for(let i = this.children.length - 1; i > 0; i--){
            if(this.children[0].weight > this.children[i].weight){
                this.children.pop()
            }
        }
    }
}
