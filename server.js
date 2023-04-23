var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('Server is run!');
});

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
     //GrassEater 

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

matrix = matrixGenerator(30, 17, 40, 30, 20, 1, 5)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
dogArr = []
predatorArr = []
tntArr = []
deminerArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Dog = require("./dog")
Deminer = require("./deminer")
Predator = require("./predator")
Tnt = require("./tnt")


function createObject(){
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
        io.sockets.emit('send matrix', matrix)
}

function game(){
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

        io.sockets.emit('send matrix', matrix)
}

setInterval(game, 200)
setInterval(() => {
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.dog = dogArr.length
        statistics.deminer = deminerArr.length
        statistics.predator = predatorArr.length
        statistics.tnt = tntArr.length

        fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
                console.log("statistics");
        })
}, 200)

var statistics = {}

io.on('connection', function(){
    createObject()
})