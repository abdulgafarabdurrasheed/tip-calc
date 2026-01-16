const title = document.getElementById("title");
const inputSection = document.getElementById('inputs');
const paymentSection = document.getElementById("split-or-spin");
// const splitBill = document.getElementById("split-bill");
const split = document.getElementById("split-btn");
const spinWheel = document.getElementById("spin");
const result = document.getElementById("last-section")
const paymentStatus = document.getElementById("payment-status");
const paymentMessage = document.getElementById("payment-message");
const arrow = document.getElementById("arrow");

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
let selectedTipButton = null;
const percentButtons = document.querySelectorAll(".percent");
percentButtons.forEach(button => button.addEventListener('click', ()=>{
    if (!billAmount){
        spinWheel.style.color = "brown";
        spinWheel.style.fontWeight = "bold";
        spinWheel.innerText = "Please, first enter the bill amount, then re-click the percent button."
        return;
    }
    
    if (selectedTipButton) {
        selectedTipButton.classList.remove("active");
    }

    button.classList.add("active");
    selectedTipButton = button;
    
    if (button.textContent == "10%")tip = 0.1*billAmount;
    else if (button.textContent == "15%") tip = 0.15 * billAmount;
    else if (button.textContent == "20%") tip = 0.2*billAmount;
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
    spinWheel.style.display = "none";
    spinWheel.classList.remove("active");
    arrow.classList.remove("active");
    spinWheel.addEventListener('click', ()=>{
        return
    })

    if (!billAmount && !friendsNumber) {
        spinWheel.innerText = "Please, enter your bill amount and number of friend";
        paymentStatus.classList.remove("active");
    }
    else if (!friendsNumber) {
        spinWheel.innerText = "Please, enter the number of friends";
        paymentStatus.classList.remove("active");
    }
    else if (!billAmount) {
        spinWheel.innerText = "Please, enter your bill amount";
        paymentStatus.classList.remove("active");
    }
    else if (billAmount && friendsNumber){
        spinWheel.style.fontWeight = "bold";
        spinWheel.style.color = "brown"
        spinWheel.innerText = `Each friend is to pay N${Math.round((billAmount+tip)/friendsNumber)}`;
        
        paymentStatus.classList.add("active");
        paymentMessage.innerText = `Each friend is to pay N${Math.round((billAmount+tip)/friendsNumber)}`;
        
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
    // console.log("spin button clicked")
    
    paymentStatus.classList.remove("active");
    spinWheel.classList.add("active");
    arrow.classList.add("active");
    
    const colorNames = [];
    const parts = [];
    for (let i =0; i<friendsNumber; i++){
        let hue = (i*360)/friendsNumber;
        let color = `hsl(${hue}, 90%,60%)`;
        let colorName = getColorName(hue);
        colorNames.push(colorName);
        console.log(color);
        parts.push(`${color} ${hue}deg ${((i+1)*360/friendsNumber)}deg`);
    };
    const gradient = `conic-gradient(${parts.join(",")})`;
    console.log(gradient);
    spinWheel.style.display = "flex";
    spinWheel.style.background = gradient;
    
    let rotation=0;
    let isSpinning = false;
    
    spinWheel.addEventListener('click', performSpin);
    
    function performSpin() {
        if (isSpinning) return;
        isSpinning = true;
        
        const random = Math.floor(2000+Math.random() * 3000);
        rotation+=random;
        spinWheel.style.transform = `rotate(${rotation}deg)`;
        document.getElementById("arrow").style.display = "block";
        spinWheel.innerText = ""
        
        // to calculate which friend gets selected
        setTimeout(() => {
            const normalizedRotation = ((rotation % 360) + 360) % 360;
            const selectedFriend = Math.floor((360 - normalizedRotation) / (360 / friendsNumber)) + 1;
            const friendIndex = selectedFriend > friendsNumber ? selectedFriend - friendsNumber : selectedFriend;
            const selectedColor = colorNames[friendIndex - 1];
            
            paymentStatus.classList.add("active");
            paymentMessage.innerText = `Friend who picked ${selectedColor} is paying! \nTotal: N${billAmount + tip}`;
            
            isSpinning = false;
        }, 4000);
    }
    
    spinWheel.innerText = "Choose your colors and tap to rotate. The arrow to appear points the friend to pay";
    result.style.display = "block";
        document.getElementById("tip-amount").innerText = `Tip: N${tip}`;
        document.getElementById("total-amount").innerText = `Total: N${String(billAmount+tip)}`
})

function getColorName(hue) {
    hue = ((hue % 360) + 360) % 360;
    
    if (hue < 15 || hue >= 345) return "Red";
    if (hue < 45) return "Orange";
    if (hue < 75) return "Yellow";
    if (hue < 105) return "Lime";
    if (hue < 135) return "Green";
    if (hue < 165) return "Cyan";
    if (hue < 195) return "Sky Blue";
    if (hue < 225) return "Blue";
    if (hue < 255) return "Indigo";
    if (hue < 285) return "Purple";
    if (hue < 315) return "Magenta";
    if (hue < 345) return "Pink";
    
    return "Red";
}
