let billAmount;
const bill = document.getElementById("billAmount")
bill.addEventListener('input', ()=>{
    console.log(bill.value);
    billAmount = Math.abs(bill.value);
})

let tip;

const percentButtons = document.querySelectorAll(".percent");

percentButtons.forEach(button => button.addEventListener('click', ()=>{
    console.log(billAmount)
    if (button.textContent == "10%")tip = 0.1*billAmount;
    else if (button.textContent == "15%") tip = 0.15 * billAmount
    else if (button.textContent == "20%") tip = 0.2*billAmount
    console.log(tip)
}))

let friendsNumber;
const friends = document.getElementById("num-of-friends")
bill.addEventListener('input', ()=>{
    console.log(friends.value);
    friendsNumber = friends.value;
})
const split = document.getElementById("split")
split.addEventListener('click', ()=>{
    console.log(friendsNumber);
    console.log(tip/friendsNumber);
})
