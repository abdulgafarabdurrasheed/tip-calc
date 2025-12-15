const title = document.getElementById("title");
const inputSection = document.getElementById('inputs');
const paymentSection = document.getElementById("split-or-spin");
// const splitBill = document.getElementById("split-bill");
const split = document.getElementById("split-btn");
const spinWheel = document.getElementById("spin");
const result = document.getElementById("last-section")
result.style.display = "none"
document.getElementById("arrow").style.display = "none"

// splitBill.style.display = "none";
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
    button.disabled = 'true';
}));

let friendsNumber;
const friends = document.getElementById("num-of-friends");
friends.addEventListener('input', ()=>{
    friendsNumber = Math.abs(friends.value);
    console.log("friends number: " + friendsNumber);
})


split.addEventListener('click', ()=>{
    // console.log("split clicked")
    spinWheel.style.background = "none";
    spinWheel.addEventListener('click', ()=>{
        return
    })

    if (!billAmount && !friendsNumber) spinWheel.innerText = "Please, enter your bill amount and number of friend";
    else if (!friendsNumber) spinWheel.innerText = "Please, enter the number of friends";
    else if (!billAmount) spinWheel.innerText = "Please, enter your bill amount";
    else if (billAmount && friendsNumber){
        spinWheel.style.fontWeight = "bold";
        spinWheel.style.color = "brown"
        spinWheel.innerText = `Each friend is to pay N${Math.round((billAmount+tip)/friendsNumber)}`;
        result.style.display = "block";
        document.getElementById("tip-amount").innerText = `Tip: N${tip}`;
        document.getElementById("total-amount").innerText = `Total: N${billAmount+tip}`
    }
    
    
})

const spin = document.getElementById("spin-btn");
spin.addEventListener('click', ()=>{
    if (!billAmount && !friendsNumber) {
        spinWheel.innerText = "Please, enter your bill amount and number of friend";
        return;
    }
    else if (!friendsNumber||friendsNumber<2){
        spinWheel.innerText = `"spin" not available for less than 2 friends; `;
        return;
    }
    else if (!billAmount){
        spinWheel.innerText = "Please, enter your bill amount";
        return;
    }

    spinWheel.innerText = "";
    console.log("spin button clicked")
    
    const parts = [];
    for (let i =0; i<friendsNumber; i++){
        let color = `hsl(${(i*360)/friendsNumber}, 90%,60%)`;
        console.log(color);
        parts.push(`${color} ${((i*360)/friendsNumber)}deg ${((i+1)*360/friendsNumber)}deg`);
    };
    const gradient = `conic-gradient(${parts.join(",")})`;
    console.log(gradient);
    spinWheel.style.display = "flex";
    spinWheel.style.background = gradient;
    let rotation=0;
    spinWheel.addEventListener('click', ()=>{
        const random = Math.floor(2000+Math.random() * 3000);
        rotation+=random;
        spinWheel.style.transform = `rotate(${rotation}deg)`;
        document.getElementById("arrow").style.display = "block";
        spinWheel.innerText = ""
    })
    spinWheel.innerText = "Choose your colors and tap to rotate";
    result.style.display = "block";
        document.getElementById("tip-amount").innerText = `Tip: N${tip}`;
        document.getElementById("total-amount").innerText = `Total: N${billAmount+tip}`
})