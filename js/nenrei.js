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
	[`サンタさんはいると思いますか？`, 10, -10000],
	[`3×3は9ですか？`, -10, 100000],
	[`蛍光色は好きですか？`, 0, -1000],
	[`「はい」を押してください`, 10, -1000000],
	[`料理できますか？`, 1000, 0],
	[`パズルは得意ですか？`, -100, 50],
	[`単純作業が好きですか？`, 0, -10],
	[`この診断は楽しかったですか？`, 20, -1000000000]
];
let sum = 0;
let now = 0;
document.getElementById("question").innerHTML = question[now][0];
function next(){
	if (now + 1 == question.length){
		document.getElementById("result").innerHTML = `あなたの精神年齢は${sum}歳です`;
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