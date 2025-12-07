let billAmount;
const bill = document.getElementById("billAmount");
bill.addEventListener('input', ()=>{
    billAmount = Math.abs(bill.value);
})

let tip;

const percentButtons = document.querySelectorAll(".percent");

percentButtons.forEach(button => button.addEventListener('click', ()=>{
    console.log(billAmount);
    if (button.textContent == "10%")tip = 0.1*billAmount;
    else if (button.textContent == "15%") tip = 0.15 * billAmount;
    else if (button.textContent == "20%") tip = 0.2*billAmount;
    console.log("tip " + tip);
}))

let friendsNumber;
const friends = document.getElementById("num-of-friends");
friends.addEventListener('input', ()=>{
    friendsNumber = Math.abs(friends.value);
    console.log("friends number: " + friendsNumber);
})
const split = document.getElementById("split")
split.addEventListener('click', ()=>{
    console.log(friendsNumber);
    console.log(tip/friendsNumber);
})

let rotation = 150
console.log(window.scrollY)
const spinWheel = document.getElementById("spin");
spinWheel.addEventListener('click', ()=>{
    const random = Math.floor(2000+Math.random() * 3000);
    rotation+=random
    spinWheel.style.transform = `rotate(${rotation}deg)`
})
