function matrixGenerator(matrixSize, grass,grassEater, dog, predator,tnt, deminer) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատրիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
         //GrassEater 2

         for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //dog

        for (let i = 0; i < dog; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        //predator

        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }

        //tnt

        for (let i = 0; i < tnt; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }

        //deminer

        for (let i = 0; i < deminer; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }
       
        return matrix
}

let matrix = matrixGenerator(30, 17, 40, 30, 20, 1, 5)
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var dogArr = []
var predatorArr = []
var tntArr = []
var deminerArr = []

function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)
                                grassArr.push(grass)
                        }else if(matrix[y][x] == 2){
                                let grEat = new GrassEater(x,y)
                                grassEaterArr.push(grEat)
                        }
                        else if(matrix[y][x] == 3){
                                let dog = new Dog(x,y)
                                dogArr.push(dog)
                        }
                        else if(matrix[y][x] == 4){
                                let pred = new Predator(x,y)
                                predatorArr.push(pred)
                        }
                        else if(matrix[y][x] == 5){
                                let t = new Tnt(x,y)
                                tntArr.push(t)
                        }
                        else if (matrix[y][x] == 6){
                                let dem = new Deminer(x,y)
                                deminerArr.push(dem)
                        }


                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.2
                        textSize(toBot);
                        if (matrix[y][x] == 1) {
                                fill("green");
                                rect(x * side, y * side, side, side);
                                text('🌿', x * side, y * side + toBot);
                        } else if(matrix[y][x] == 2){
                                fill ("brown")
                                rect(x * side, y * side, side, side);
                                text('🐂', x * side, y * side + toBot);
                        }else if(matrix[y][x] == 3){
                                fill("yellow")
                                rect(x * side, y * side, side, side);
                                text('🐕', x * side, y * side + toBot);
                        }
                        else if(matrix[y][x] == 4){
                                fill("black")
                                rect(x * side, y * side, side, side);
                                text('🐉', x * side, y * side + toBot);
                        }
                        else if(matrix[y][x] == 5){
                                fill("white")
                                rect(x * side, y * side, side, side);
                                text('💣', x * side, y * side + toBot);
                        }
                        else if(matrix[y][x] == 6){
                                fill("#abcbff")
                                rect(x * side, y * side, side, side);
                                text('👷‍♂️', x * side, y * side + toBot);
                        }

                        else {
                                fill("#86f777")
                                rect(x * side, y * side, side, side)
                        }

                }
        }



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

 
                for(let i in dogArr){
                        dogArr[i].eat()
                }

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }

                for(let i in deminerArr){
                        deminerArr[i].demine()
                }
                

}
