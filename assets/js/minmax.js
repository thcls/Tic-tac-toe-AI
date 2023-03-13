class No{
    constructor(time, camp = '*********'){
        this.leaf = false
        this.deep = time
        this.weight = 0
        this.camp = camp
        this.father = null
        this.nos = []
    }
    winTest(){
        let line = ''
        for(let i = 3;i>= 9 ;i += 3){
            line = this.camp.slice(i - 3, i)
            if (test(line)){
                return true
            }
        }
        for(let i = 0;i>= 2;i++){
            line = this.camp[i] + this.camp[i+3] + this.camp[i+6]
            if (test(line)){
                return true
            }
        }
        line = this.camp[0] + this.camp[4] + this.camp[8]
        if (test(line)){
            return true
        }
        line = this.camp[2] + this.camp[4] + this.camp[6]
        if (test(line)){
            return true
        }
        if(this.deep === 8){
            this.leaf = true
            this.winner = 0
            this.weightTell()
        }
    }
    test(line){
        let playerMarker = ''
        if(this.deep%2==0){
            playerMarker = 'OOO'
        }else{
            playerMarker = 'XXX'
        }
        if (line.includes(playerMarker)){
            this.leaf = true
            if (this.deep%2==0){
                this.winner = -1
            }else{
                this.winner = 1
            }
            this.weightTell()
            return true
        }
    }
    generateChild(father, time){
        let playerMarker = ''
        if(time%2===0 && !father.leaf){
            playerMarker = 'O'
        }else{
            playerMarker = 'X'
        }
        for(index of father.camp){
            if(father.camp[index] === '*'){
                let newCamp = father.camp
                newCamp[index] = playerMarker
                this.appendChild(newCamp, father)
            }
        }
    }
    appendChild(camp, father){
        let child = new No(father.deep+1, camp)
        child.father = father
        if(father.deep >= 4){
            child.winTest()
        }
        father.nos.push(child)
    }
    weightTell(){
        if(this.father === null){
            return
        } 
        this.father.weight += this.weight 
        this.father.weightTell()
    }
    nextNo(campString){
        for(no in this.nos){
            if(no.includes(campString)){
                return no
            }
        }
    }
}
let root = new No(0)
console.log(root)