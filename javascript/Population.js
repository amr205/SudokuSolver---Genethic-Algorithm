class Population{
    constructor(num, m, p, e){
      this.population = [];
      this.best = "";
      this.minMutationRate = m;
      this.mutationRate = m;
      this.finished = false;
      this.generations = 0;
      this.perfectScore = 1;
      this.initial_sudoku = p;
      this.matingPool = [];
      this.maxFitness = 1;
      this.elitismQ = e;
      this.sumFitness=1;
      
      this.disponible = new Array(9);
      this.movable_indexes = new Array(9);
      this.bestEveryQ = 0;
      

      for (let i = 0; i < 9; i++) {
        this.disponible[i]=[1,2,3,4,5,6,7,8,9];
        this.movable_indexes[i]=new Array();
        for (let x = 0; x < 9; x++) {
            if(this.initial_sudoku[i*9+x]!="."){
              this.disponible[i].splice( this.disponible[i].indexOf(parseInt(this.initial_sudoku[i*9+x])), 1 );
            }else{
              this.movable_indexes[i].push(x);
            }
        }
      }
      
      for (var i = 0; i < num; i++) {
        var newDisp = this.disponible.map(function(arr) {
              return arr.slice();
        });
        this.population[i] = new DNA();
        this.population[i].initialize(this.initial_sudoku, newDisp);
      }
    }
  
    calcFitness(){
      for (var i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness();
        if(this.population[i].fitness == this.maxFitness){
          this.finished = true;
          console.log(this.generations)
        }
      }
    
    }
  
    naturalSelection(){
      this.sumFitness=0;
  
      for (let i = 0; i < this.population.length; i++) {
        this.sumFitness += this.population[i].fitness;
      }
    }

    getOneParent(){
      let n = Math.random * this.sumFitness;
      let i = 0;
      do{
        n-=this.population[i].fitness;
        i++;
      }while(n>0&&i<this.population.length-1);

      return this.population[i-1];
    }
  
    generate(){

      let newPopulation = [];
      this.population.sort((a,b) => (a.fitness < b.fitness) ? 1 : ((b.fitness < a.fitness) ? -1 : 0)); 
      //console.log("first: "+this.population[0].fitness+" | last: "+this.population[this.population.length-1].fitness);
      for (let i = 0; i < this.elitismQ; i++) {
        newPopulation[i]=new DNA();
        newPopulation[i].genes=this.population[i].genes.slice();
      }

      for (let i = 0; i < (this.population.length-this.elitismQ)/2; i++) {
  
        var parentA = this.getOneParent();
        var parentB = this.getOneParent();
  
        var childA = parentA.crossover(parentB);
        childA.mutate(this.mutationRate,this.movable_indexes);
        var childB = parentB.crossover(parentA);
        childB.mutate(this.mutationRate,this.movable_indexes);
  
        newPopulation[this.elitismQ+i] = childA;
        newPopulation[this.population.length-i-1]=childB;
      }
  
      this.generations++;
      this.population=newPopulation;
      
      if(this.generations%100==0){
        if(newPopulation[0].fitness<=this.bestEveryQ&&this.mutationRate<1){
          this.mutationRate+=0.001;
        }else{
          this.bestEveryQ=newPopulation[i].fitness;
          this.mutationRate=this.minMutationRate;
        }
      }
        
  
    }
  
  
    getBest(){
      var max = this.population[0].fitness;
      var best = this.population[0];
      for (var i = 0; i < this.population.length; i++) {
        if(this.population[i].fitness > max){
          max = this.population[i].fitness;
          best = this.population[i];
        }
      }
  
      return best;
    }
  
    getAverageFitness(){
      var avg = 0;
  
      for (var i = 0; i < this.population.length; i++) {
        avg += this.population[i].fitness;
      }
  
      return avg/this.population.length;
    }
  }