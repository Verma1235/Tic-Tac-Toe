
var boxes = document.querySelectorAll(".box");
var msg = document.querySelector("#msg_cont");
var turn0 = true;
var flag = 0;
var winState = false;

// console.log(boxes);

var winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

// for (let i of boxes) {
//     console.log(i)
// }
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
            box.disabled = true;
            flag++;
        } else {
            box.innerText = "X";
            box.disabled = true;
            turn0 = true;
            flag++;
        }


        if (flag >= 4) {
            checkWinner();
            if (flag == 9 && winState == false) {
                win("");
              setTimeout(ResetGame, 3000);
            }
        }

    });
});
// match winner pattern to the innerhtml value
function checkWinner() {
    for (pattern of winpatterns) {

        var val0 = boxes[pattern[0]].innerHTML;
        var val1 = boxes[pattern[1]].innerHTML;
        var val2 = boxes[pattern[2]].innerHTML;

        if (val0 != "" && val1 != "" && val2 != "") {
            if (val0 == val1 && val1 == val2) {
                win(val0);
                setTimeout(ResetGame, 3000);
                winState = true;
            }
        }
    }

}

// reset game function 

function ResetGame() {
    for (box of boxes) {
        box.innerHTML = "";
        box.disabled = false;
        msg.innerHTML="";
        flag=0;
        turn0 = true;
       setTimeout(()=>{ winState=false;},500);
    }

}

function win(arg) {
    var player = "None";
    if (arg == "0") {
        player = "Player 1";
    } else if (arg == "X") {
        player = "Player 2";
    }

    if (winState) {
        msg.innerHTML = `Winner of the game is ${player} (${arg})`;
    } else if(winState!=true && flag==9){
        msg.innerHTML = `Game Over`;
    }


}

