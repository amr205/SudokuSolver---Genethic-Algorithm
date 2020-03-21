class DNA{
  
    constructor(){
      this.genes = new Array(81);
      this.fitness = 0;
      
    }

    initialize(initial_sudoku,disponible){  
      for (let i = 0; i < 9; i++) {
        for (let x = 0; x < 9; x++) {
            if(initial_sudoku[i*9+x]=="."){
                let random_num = Math.floor(Math.random() * disponible[i].length);
                let value = disponible[i][random_num];
                this.genes[i*9+x]=value;
                disponible[i].splice( random_num, 1 );
            }
            else{
                this.genes[i*9+x]=parseInt(initial_sudoku[i*9+x]);
            }
        }
      }
    }
    
    calcFitness(){
      let score = 162;
      let repeated_cols = 0;
      let repeated_square = 0;


      for (let i = 1; i < 10; i++) {
        for (let y = 0; y < 9; y++) {
          let count = 0;
          for (let x = 0; x < 9; x++) {
            if(this.genes[y+x*9]==i)
              count++;
          }
          if(count>1)
            repeated_cols++;
        }
        
      }
      for (let i = 1; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          for (let o = 0; o < 3; o++) {
            let count = 0;
            for (let y = 0; y < 3; y++) {
              for (let x = 0; x < 3; x++) {
                if(this.genes[j*27+o*3+y*9+x]==i)
                  count++;
              }
            }
            if(count>1)
              repeated_square++;
          }
        }
      }
      
      this.fitness = (score-repeated_cols-repeated_square)/162;
      //this.fitness = Math.pow(this.fitness,2);
      
      //console.log(this.genes);
      
     // console.log("cols: "+repeated_cols+" | square :"+repeated_square+" | fitness: "+this.fitness);
      
      
    }
  
    crossover(partner){
      var num = partner.genes.length;
      var child = new DNA();
  
      for (var i = 0; i < num; i++) {
        if(i<num/2){
          child.genes[i]=this.genes[i];
        }
        else{
          child.genes[i]=partner.genes[i];
        }
      }
  
      return child;
    }
  
    mutate(m, indexes){
      this.mutationType2(m,indexes);
        

    }
  
    getText(){
      var str = "";
      for (var i = 0; i < this.genes.length; i++) {
        str+=this.genes[i];
      }
      return str;
    }

    mutationType2(m, indexes){
      for (let index = 0; index < this.genes.length; index++) {
        let random = Math.random();
        if(random<m){
          let i = index%9;
          if(indexes[i].length>=2){
              let idx = indexes[i].slice();
              let random_num = Math.floor(Math.random() * idx.length);
              let idx1 = idx[random_num];
              //idx.splice( random_num, 1 );
              random_num = Math.floor(Math.random() * idx.length);
              let idx2 = idx[random_num];
              //idx.splice( random_num, 1 );

              let temp = this.genes[i*9+idx1];
              this.genes[i*9+idx1]=this.genes[i*9+idx2];
              this.genes[i*9+idx2]=temp;
          }
        }
        
      }
    }

    mutationType1(m, indexes){
      for (var i = 0; i < 9; i++) {
        var random = Math.random();
        if(random<m){
          var times =Math.ceil(Math.random(5));
          for (let o = 0; o < times; o++) {
            
            if(indexes[i].length>=2){
              let idx = indexes[i].slice();
              let random_num = Math.floor(Math.random() * idx.length);
              let idx1 = idx[random_num];
              //idx.splice( random_num, 1 );
              random_num = Math.floor(Math.random() * idx.length);
              let idx2 = idx[random_num];
              //idx.splice( random_num, 1 );

              let temp = this.genes[i*9+idx1];
              this.genes[i*9+idx1]=this.genes[i*9+idx2];
              this.genes[i*9+idx2]=temp;
            }
            
          }
        }
      }
    }
  }
  