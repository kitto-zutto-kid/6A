const hate = [
	"ピーマン",
	"トマト",
	"ナス",
	"ゴーヤ",
	"アスパラガス",
	"コーヒー",
	"にんじん",
	"梅干し",
	"セロリ",
	"しいたけ",
	"グリーンピース",
];

const question = [
	[`${hate[Math.floor(Math.random() * hate.length)]}が嫌いですか？`, -5, 5],
	[`遅刻は多い方だ`, -10, 5],
	[`よく子供っぽいと言われる`, -10, 5],
	[`ゲームは好きですか？`, -10, 0],
	[`電車が好きですか？`, -10000000000000, 10]
];
let sum = 0;
let now = 0;
document.getElementById("question").innerHTML = question[now][0];
function next(){
	if (now + 1 == question.length){
		document.getElementById("result").innerHTML = `${sum}歳`;
		return;
	}
	now++;
	document.getElementById("question").innerHTML = question[now][0];
}

function yes(){
	sum += question[now][1]
	next();
}
function no(){
	sum += question[now][2]
	next();
}