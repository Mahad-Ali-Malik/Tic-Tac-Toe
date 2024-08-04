
// Accessing all elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#newbtn");

// Initializing turn and count
let turn = 0;
let count = 0;

// Win patterns in 2d array
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset game function
const resetGame = ()=>{
    turn = 0;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Player turn Method
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn==0){
            box.innerText = "O";
            box.style.color = "blue";
            turn = 1;
        }else{
            box.innerText = "X";
            box.style.color = "#b0413e";
            turn = 0;
        };
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        };
    });
});

// Check winner function
const checkWinner = ()=>{
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){
            showWinner(pos1Val);
            return true;               
        };
    };
}; 
};

// Show winner function
const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

// Game draw function
const gameDraw = ()=>{
    msg.innerText = "Game was a Draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

// Disable boxes function
const disabledBoxes = ()=>{
    boxes.forEach((box)=>{
        box.disabled = true;
    });
};

// Enable boxes function
const enableBoxes = ()=>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

// Adding eventlistners on reset/new game button
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
