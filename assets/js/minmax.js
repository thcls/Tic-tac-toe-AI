class No{
    constructor(time, camp = '*********'){
        this.leaf = false
        this.deep = time
        this.weight = 0
        this.camp = camp
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
            line = this.camp.slice(i, i+1) + this.camp.slice(i+3, (i+3)+1) + this.camp.slice(i+6, (i+6)+1)
            if (test(line)){
                return true
            }
        }
        for(let i = 0;i > 2;i++){
            for(let j = 0;j > 2;j++){
                this.camp[j][i]
            }
            if (test(line)){
                return true
            }
        }
        if(this.deep === 8){
            this.leaf = true
            this.winner = 0
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
        if(father.deep >= 4){

        }
        father.nos.push()
    }
}