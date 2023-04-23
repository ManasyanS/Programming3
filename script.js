var socket = io()

let side = 30

function setup() {
        createCanvas(30 * side, 30 * side)
        background("grey")
}


function drawCreature(matrix) {
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



                
                

}
socket.on("send matrix", drawCreature)