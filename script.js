var socket = io()
let side = 30

function setup() {
        createCanvas(30 * side, 30 * side)
        background("grey")







        
        const data = {
                labels: [
                        'Grass',
                        'GrassEater',
                        'Predator',
                        'Dog',
                        'Deminer',
                        'Tnt'
                ],
                datasets: [{
                        label: 'Chart of game',
                        data: [15, 15, 15, 15, 15, 15],
                        backgroundColor: [
                                'rgb(0, 128, 0)',
                                'rgb(255, 255, 0)',
                                'rgb(255, 0, 0)',
                                'rgb(0, 216, 255)',
                                'rgb(7, 96, 250)',
                                'rgb(255, 155, 0)',
                        ],
                        hoverOffset: 5
                }]
        };
        const config = {
                type: 'doughnut',
                data: data,
                options: {
                        plugins: {
                                legend: {
                                        display: true,
                                        labels: {
                                                color: '#fff'
                                        }
                                }
                        }
                }
        };
        myChart = new Chart(
                document.getElementById('myChart'),
                config

        );







}


socket.on("Winter", function (data) {
        weather = data;
})
socket.on("Summer", function (data) {
        weather = data;
})
socket.on("Spring", function (data) {
        weather = data;
})
socket.on("Autumn", function (data) {
        weather = data;
})
var weather = "spring"

function drawCreature(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.2
                        textSize(toBot);
                        if (matrix[y][x] == 1) {
                                if (weather == "spring") {
                                        fill("green");
                                        rect(x * side, y * side, side, side);
                                        text('🌿', x * side, y * side + toBot);
                                } else if (weather == "summer") {
                                        fill("darkgreen");
                                        rect(x * side, y * side, side, side);
                                        text('☘️', x * side, y * side + toBot);
                                } else if (weather == "autumn") {
                                        fill("yellow");
                                        rect(x * side, y * side, side, side);
                                        text('🍁', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("rgb(0, 123, 255)");
                                        rect(x * side, y * side, side, side);
                                        text('❄️', x * side, y * side + toBot);
                                }

                        } else if (matrix[y][x] == 2) {
                                if (weather == "spring" || weather == "autumn" || weather == "summer") {
                                        fill("brown")
                                        rect(x * side, y * side, side, side);
                                        text('🐂', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("#b1b4b5")
                                        rect(x * side, y * side, side, side);
                                        text('🐄', x * side, y * side + toBot);
                                }
                        } else if (matrix[y][x] == 3) {
                                fill("yellow")
                                rect(x * side, y * side, side, side);
                                text('🐕', x * side, y * side + toBot);
                        }
                        else if (matrix[y][x] == 4) {
                                if (weather == "spring" || weather == "autumn" || weather == "summer") {
                                        fill("black")
                                        rect(x * side, y * side, side, side);
                                        text('🐉', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("rgb(131, 175, 223)")
                                        rect(x * side, y * side, side, side);
                                        text('🐲', x * side, y * side + toBot);
                                }

                        }
                        else if (matrix[y][x] == 5) {
                                fill("white")
                                rect(x * side, y * side, side, side);
                                text('💣', x * side, y * side + toBot);
                        }
                        else if (matrix[y][x] == 6) {
                                fill("#abcbff")
                                rect(x * side, y * side, side, side);
                                text('👷‍♂️', x * side, y * side + toBot);
                        }

                        else {
                                if (weather == "spring") {
                                        fill("#86f777");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "summer") {
                                        fill("#ffffab");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "autumn") {
                                        fill("#c35800");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "winter") {
                                        fill("#56c9fc");
                                        rect(x * side, y * side, side, side);
                                }
                        }

                }
        }




}
socket.on("send matrix", drawCreature)

function AddGrass() {
        socket.emit("addGrass")
}
function AddDog() {
        socket.emit("addDog")
}
function AddGrassEater() {
        socket.emit("addGrassEater")
}
function AddPredator() {
        socket.emit("addPredator")
}
function AddBomb() {
        socket.emit("addBomb")
}
function AddDeminer() {
        socket.emit("addDeminer")
}
function KillAll() {
        socket.emit("killAll")
}
function Spring() {
        socket.emit("spring")
}
function Summer() {
        socket.emit("summer")
}
function Autumn() {
        socket.emit("autumn")
}
function Winter() {
        socket.emit("winter")
}
