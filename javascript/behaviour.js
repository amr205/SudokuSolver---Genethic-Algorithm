var sudoku_inicial=new Array(81);
var mutationRate = 0.01;
var totalPopulation =400;
var elitismQuantity = 80;
var population = null;

var difficulty=1;
var test_sudoku = "26584137934..7....7..3.....6372189...92457...5.4...7.2473.89..19.61.48.7...7...9."

$(document).ready(function() {
    var slider = document.getElementById("difficulty_s");
    difficulty = slider.value;
    document.getElementById("dif_label").innerHTML = slider.value;
    slider.oninput = function() {
        difficulty = slider.value;
        document.getElementById("dif_label").innerHTML = slider.value;
    }

    generateNewTable();
});

function setup(){
    noLoop();
}

function draw(){
    if(population==null){
        population = new Population(totalPopulation, mutationRate, sudoku_inicial, elitismQuantity);
    }else{
        population.calcFitness();

        let best= population.getBest();
        $("#bestFitnessText").html("Best Fitness: "+best.fitness)
        $("#averageFitnessText").html("Average Fitness: "+this.population.getAverageFitness())
        showSudoku(best.getText());

        population.naturalSelection();
        population.generate();
        

        if(population.finished){
            noLoop();
        }
    }
    
}

function showSudoku(data){
    var table = $("#sudoku-table li");
    table.each(function(idx, li) {
        var item = $(li);
        if(data[idx]=="."){
            item.html("<span>"+" "+"</span>");
        }else{
            item.html("<span>"+data[idx]+"</span>");
        }
    });
}

function generateNewTable(){
    noLoop();
    let sudoku_data;
    if(difficulty==1)
        sudoku_data=sudoku.generate("easy");
    else if(difficulty==2)
        sudoku_data=sudoku.generate("medium");
    else
        sudoku_data=sudoku.generate("hard");
    showSudoku(sudoku_data);
    for (let i = 0; i < sudoku_inicial.length; i++) {
        sudoku_inicial[i]=sudoku_data[i];
    }
    var table = $("#sudoku-table li");
    table.each(function(idx, li) {
        
        $(li).removeClass();
        if(sudoku_data[idx]!="."){
            $(li).addClass('fijo');
        }
    });
    
}

function solveSudoku(){
    population = new Population(totalPopulation, mutationRate, sudoku_inicial, elitismQuantity);
    loop();
}