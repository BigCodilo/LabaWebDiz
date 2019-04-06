function addButton(){

	$(".added").remove();

	var Knife = new Object();
	Knife.name = $(".name").val();
	Knife.firm = $(".firm").val();
	Knife.long = $(".long").val();
	Knife.price = $(".price").val();
	Knife.steel = $(".select").val();
	type = $("input[name=knifeType]:checked", ".myForm").val();
	if(type == 1){
		Knife.type = "Монолит";
	} else{
		Knife.type = "Раскладной";
	}

	var errorString = "";

	isName = true;
	isFirm = true;
	isLong = true;
	isPrice = true;
	isUniq = true;

	//for (var i = 0; i < arrayKnife.length; i++) {
	//	if(arrayKnife[i].name == Knife.name){
	//		isUniq = false;
	//		break
	//	}
	//}

	if(Knife.name.length < 4 || !isUniq){
		$(".name").css("border", "2px solid red");
		errorString += "Короткое название ножа или нож с таким названием уже существует.  ";
		isName = false;
	} else {
		$(".name").css("border", "2px solid #48D1CC");
		isName = true;
	}

	if(Knife.firm.length < 6){
		$(".firm").css("border", "2px solid red");
		errorString += "Короткое название фирмы.  ";
		isFirm = false;
	} else {
		$(".firm").css("border", "2px solid #48D1CC");
		isFirm = true;
	}

	

	if((type == 1 && Knife.long < 8 || Knife.long > 20) || (type == 2 && Knife.long < 4 || Knife.long > 12)){
		$(".long").css("border", "2px solid red");
		errorString += "Длинна ножа должна быть от 4 до 20.  ";
		isLong = false;
	} else {
		$(".long").css("border", "2px solid #48D1CC");
		isLong = true;
	}

	if(Knife.price <= 0){
		$(".price").css("border", "2px solid red");
		errorString += "Цена должна быть положительная.  ";
		isPrice = false;
	} else {
		$(".price").css("border", "2px solid #48D1CC");
		isPrice = true;
	}

	if(isName && isPrice && isFirm && isLong){
		arrayKnife.push(Knife);
		for(var i = 0; i < arrayKnife.length; i++){
			$(".isCorrect").text("Добавлено!!!");
			$(".isCorrect").css("font-size", "2em");
			$(".isCorrect").css("color", "green");
			$(".knifeList").append("<div class=\"eachKnife added\">" 
				+ "<div>" + arrayKnife[i].name + "</div>"
				+ "<div>" + arrayKnife[i].firm  + "</div>"
				+ "<div>" + arrayKnife[i].long  + "</div>"
				+ "<div>" + arrayKnife[i].price  + "</div>"
				+ "<div>" + arrayKnife[i].type  + "</div>"
				+ "<div  class=\"righttop\">" + arrayKnife[i].steel + "</div>"
			+  "</div>")
		}
	} else{
		errorHandler(errorString)
	}

	return false
}

var newWin

function newWindow(){
	newWin = window.open("about:blank", "hello", "width=500,height=500");
	for(var i = 0 ; i < arrayKnife.length; i++){
		newWin.document.write("Name: " + arrayKnife[i].name+ "<br/>Firm: " + arrayKnife[i].firm + "<br/>Length: " + arrayKnife[i].long 
			+ "<br/>Price: " + arrayKnife[i].price + "<br/>Type: " + arrayKnife[i].type + "<br/>Steel: " + arrayKnife[i].steel + "<br/><br/>");
	}
	newWin.document.write("<script>setTimeout(function(){window.close()}, 5000);</script>");
}

$(".long").keypress(function(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
    }
});

$(".price").keypress(function(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
    }
});

var arrayKnife = [];

function errorHandler(text){
	$(".isCorrect").text(text);
	$(".isCorrect").css("font-size", "1em");
	$(".isCorrect").css("color", "red");
}