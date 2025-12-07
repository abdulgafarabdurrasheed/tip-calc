const title = document.getElementById("title");
const inputSection = document.getElementById('inputs');
const paymentSection = document.getElementById("split-or-spin");
const splitBill = document.getElementById("split-bill");
const spinWheel = document.getElementById("spin")
splitBill.style.display = "none";
// spinWheel.style.display = "none"


let billAmount;
const bill = document.getElementById("billAmount");
bill.addEventListener('input', ()=>{
    billAmount = Math.abs(bill.value);
})

let tip = 0;
const percentButtons = document.querySelectorAll(".percent");
percentButtons.forEach(button => button.addEventListener('click', ()=>{
    // console.log(billAmount);
    if (button.textContent == "10%")tip = 0.1*billAmount;
    else if (button.textContent == "15%") tip = 0.15 * billAmount;
    else if (button.textContent == "20%") tip = 0.2*billAmount;
    button.disabled = 'true'
}));

let friendsNumber;
const friends = document.getElementById("num-of-friends");
friends.addEventListener('input', ()=>{
    friendsNumber = Math.abs(friends.value);
    console.log("friends number: " + friendsNumber);
})

const split = document.getElementById("split-btn");
split.addEventListener('click', ()=>{
    spinWheel.innerText = `Each friend is to pay N${Math.round(tip/friendsNumber)}`;
    
})

const spin = document.getElementById("spin-btn");
spin.addEventListener('click', ()=>{
    // clearMainPage();
    if (!friendsNumber || friendsNumber<2)return;
    const parts = [];
    for (let i =0; i<friendsNumber; i++){
        let color = `hsl(${(i*360)/friendsNumber}, 90%,60%)`;
        console.log(color)
        parts.push(`${color} ${((i*360)/friendsNumber)}deg ${((i+1)*360/friendsNumber)}deg`)
    };
    const gradient = `conic-gradient(${parts.join(",")})`;
    console.log(gradient)
    spinWheel.style.display = "flex"
    spinWheel.style.background = gradient;
    let rotation=0;
    spinWheel.addEventListener('click', ()=>{
        const random = Math.floor(2000+Math.random() * 3000);
        rotation+=random
        spinWheel.style.transform = `rotate(${random}deg)`
    })
    spinWheel.innerHTML = "<button>ROTATE</button>"
})

function clearMainPage(){
    title.style.display = "none";
    inputSection.style.display = "none";
    paymentSection.style.display = "none";
}