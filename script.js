const title = document.getElementById("title");
const inputSection = document.getElementById('inputs');
const paymentSection = document.getElementById("split-or-spin");
const splitBill = document.getElementById("split-bill");
splitBill.style.display = "none";

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

const split = document.getElementById("split-btn")
split.addEventListener('click', ()=>{
    title.style.display = "none";
    inputSection.style.display = "none";
    paymentSection.style.display = "none";
    splitBill.style.display = "flex"
    document.getElementById("tip-amount").innerText = `Each friend is is to pay N${Math.round(tip/friendsNumber)}`;
    
})
// let colorList = ["yellow 0deg 60deg",
//     "blue 60deg 120deg",
//     "pink 120deg 180deg",
//     "brown 180deg 240deg",
//     "grey 240deg 300deg",
//     "white 300deg 360deg"]


// let rotation = 150
// console.log(window.scrollY)
// const spinWheel = document.getElementById("spin");
// const deg = 360/friendsNumber


// spinWheel.style.background = `conic-gradient(yellow 0deg 60deg,
//         blue 60deg 120deg,
//         pink 120deg 180deg,
//         brown 180deg 240deg,
//         grey 240deg 300deg,
//         white 300deg 360deg)`

spinWheel.addEventListener('click', ()=>{
    const random = Math.floor(2000+Math.random() * 3000);
    rotation+=random
    spinWheel.style.transform = `rotate(${rotation}deg)`
})
