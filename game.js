window.addEventListener("load", load());

const tabRessources = document.getElementById("resourcesTab");
let paused = false;
let auto = false;
let monHandler = {
	set(target, key, value) {
		if (key == 'money') {
			document.getElementById('argent').innerHTML = value;
		}
		target[key] = value;
	},
	get(target, key, value) {
		return target[key];
	}
}

let monHandler2 = {
	set(target, key, value) {
		if (key == 'amount') {
			target.amountDisplay.innerHTML = value;
		} else if (key == 'cost') {
			target.costDisplay.innerHTML = value;
		}
		
		target[key] = value;
	}
}

let player = new Proxy({
	money: 0,
	totalMoneyEarned: 0,
	prestige: 0,
	buyQuantity: 1,
	ressources: {
		T1: {
			name: "Lance-Toile",
			amount: 0,
			baseCost: 100,
			factor: 1.17,
			cost: 100,
			valuePerSec: 10,
			actualValuePerSec: 10
		},
		T2: {
			name: "Toile Electrique",
			amount: 0,
			baseCost: 215,
			factor: 1.18,
			cost: 215,
			valuePerSec: 25,
			actualValuePerSec: 25
		},
		T3: {
			name: "Bombe Toile",
			amount: 0,
			baseCost: 500,
			factor: 1.20,
			cost: 500,
			valuePerSec: 75,
			actualValuePerSec: 75
		},
		T4: {
			name: "Piège Toile",
			amount: 0,
			baseCost: 2000,
			factor: 1.22,
			cost: 2000,
			dispCost: null,
			dispAmount: null,
			dispBuy: null,
			valuePerSec: 200,
			actualValuePerSec: 200
		},
		T5: {
			name: "Spider-Bot",
			amount: 0,
			baseCost: 30000,
			factor: 1.25,
			cost: 30000,
			dispCost: null,
			dispAmount: null,
			dispBuy: null,
			valuePerSec: 1500,
			actualValuePerSec: 1500
		},
		T6: {
			name: "Spider-Drone",
			amount: 0,
			baseCost: 100000,
			factor: 1.30,
			cost: 100000,
			dispCost: null,
			dispAmount: null,
			dispBuy: null,
			valuePerSec: 6000,
			actualValuePerSec: 6000
		},
		T7: {
			name: "Delta-Toiles",
			amount: 0,
			baseCost: 180000,
			factor: 1.36,
			cost: 180000,
			dispCost: null,
			dispAmount: null,
			dispBuy: null,
			valuePerSec: 12000,
			actualValuePerSec: 12000
		}
	}
}, monHandler)

player = new Proxy(load(), monHandler);

function majCosts(monT) {
	let value = calculateCost(player.ressources[monT]);
	player.ressources[monT].cost = value;
}

function calculateCost(item) {
	let calcAmount = item.amount;
	let calcCost = item.baseCost + Math.ceil(item.baseCost * calcAmount * item.factor);
	if (player.buyQuantity >= 1) {
		let i = 1;
		while (i < player.buyQuantity) {
			calcAmount++;
			calcCost += item.baseCost + Math.ceil(item.baseCost * calcAmount * item.factor);
			i++;
		}
	}
	else {
		let outOfMoney = false;
		while (!outOfMoney) {
			calcAmount++;
			if (item.baseCost + Math.ceil(item.baseCost * calcAmount * item.factor) + calcCost <= player.money) {
				calcCost += item.baseCost + Math.ceil(item.baseCost * calcAmount * item.factor);
			}
			else {
				outOfMoney = true;
			}
		}
		item.actualBuyAmount = calcAmount - item.amount;
	}
	return calcCost;
}

function acheter(item) {
	if (item.cost <= player.money) {
		player.money -= item.cost;
		item.amount += 1;
	}

}

function save() {
	window.localStorage.setItem("idlePlayer", JSON.stringify(player));
}

function load() {
	return window.localStorage.getItem("idlePlayer") ? JSON.parse(window.localStorage.getItem("idlePlayer")) : null;
}
var newplayer
function reset() {
	player = newplayer = new Proxy({
		money: 0,
		totalMoneyEarned: 0,
		prestige: 0,
		buyQuantity: 1,
		ressources: {
			T1: {
				name: "Lance-Toile",
				amount: 0,
				baseCost: 100,
				factor: 1.17,
				cost: 100,
				valuePerSec: 10,
				actualValuePerSec: 10
			},
			T2: {
				name: "Toile Electrique",
				amount: 0,
				baseCost: 215,
				factor: 1.18,
				cost: 215,
				valuePerSec: 25,
				actualValuePerSec: 25
			},
			T3: {
				name: "Bombe Toile",
				amount: 0,
				baseCost: 500,
				factor: 1.20,
				cost: 500,
				valuePerSec: 75,
				actualValuePerSec: 75
			},
			T4: {
				name: "Piège Toile",
				amount: 0,
				baseCost: 2000,
				factor: 1.22,
				cost: 2000,
				dispCost: null,
				dispAmount: null,
				dispBuy: null,
				valuePerSec: 200,
				actualValuePerSec: 200
			},
			T5: {
				name: "Spider-Bot",
				amount: 0,
				baseCost: 30000,
				factor: 1.25,
				cost: 30000,
				dispCost: null,
				dispAmount: null,
				dispBuy: null,
				valuePerSec: 1500,
				actualValuePerSec: 1500
			},
			T6: {
				name: "Spider-Drone",
				amount: 0,
				baseCost: 100000,
				factor: 1.30,
				cost: 100000,
				dispCost: null,
				dispAmount: null,
				dispBuy: null,
				valuePerSec: 6000,
				actualValuePerSec: 6000
			},
			T7: {
				name: "Delta-Toiles",
				amount: 0,
				baseCost: 180000,
				factor: 1.36,
				cost: 180000,
				dispCost: null,
				dispAmount: null,
				dispBuy: null,
				valuePerSec: 12000,
				actualValuePerSec: 12000
			}
		}
	}, monHandler);
	window.localStorage.setItem("idlePlayer", JSON.stringify(player));
	location.reload();
}

function prestige() {

}

function dev(ev) {
	player.money += 100;
	createFloatingText(ev, "+100");
}

function createFloatingText(ev, txt) {
	let elem = document.createElement("H1");
	elem.innerHTML = txt;
	elem.style.left = ev.clientX + 'px';
	elem.style.top = ev.clientY + 'px';
	ev.target.parentNode.appendChild(elem);
	setTimeout(function () {
		elem.parentNode.removeChild(elem);
	}, 2000);
}

//init script
document.getElementById("buyAmount").value = 1;
player.buyQuantity = 1;
var compteur = 1;

for (const [key, value] of Object.entries(player.ressources)) {
	player.ressources[key] = new Proxy(value,monHandler2); 
	let monTR = document.createElement("TR");
	tabRessources.appendChild(monTR);
	tr = tabRessources.getElementsByTagName("TR")[compteur];
	let TDNom = document.createElement("TD");
	let TDCost = document.createElement("TD");
	let TDApport = document.createElement("TD");
	let TDAmount = document.createElement("TD");
	let TDButton = document.createElement("TD");
	TDNom.innerHTML = value["name"];
	TDCost.innerHTML = value["cost"];
	TDApport.innerHTML = value["valuePerSec"];
	TDAmount.innerHTML = value["amount"];
	value['amountDisplay'] = TDAmount;
	value['costDisplay'] = TDCost;
	tr.appendChild(TDNom);
	tr.appendChild(TDCost);
	tr.appendChild(TDApport);
	tr.appendChild(TDAmount);
	let monBtn = document.createElement("BUTTON");
	value['boutonDisplay'] = monBtn;
	tr.appendChild(TDButton);
	monBtn.innerHTML= "Acheter";
	monBtn.addEventListener('click', (e) => {
		acheter(player.ressources[key]);
		majCosts(key);
	})
	monBtn.setAttribute("id", "button-54");
	TDButton.appendChild(monBtn);
	compteur++;
}

function moneyPerS(){
	for (const [key, value] of Object.entries(player.ressources)) {
		if(player.ressources[key].amount > 0){
			
			player.money += player.ressources[key].actualValuePerSec * player.ressources[key].amount;
		}
		
	};
}

function rouge(){
	for (const [key, value] of Object.entries(player.ressources)) {
		if ( player.ressources[key].cost > player.money) {
			player.ressources[key].costDisplay.setAttribute("style", "color: red;");
		} else {
			player.ressources[key].costDisplay.setAttribute("style", "color: black;");
		}
}}
setInterval(save, 1000)
setInterval(rouge, 100)
setInterval(moneyPerS, 1000)