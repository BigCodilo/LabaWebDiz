function addButton(){

	$(".added").remove();

	var Knife = new Object();
	Knife.ID = ""
	Knife.Name = $(".name").val();
	Knife.Firm = $(".firm").val();
	Knife.Long = $(".long").val();
	Knife.Price = $(".price").val();
	Knife.Steel = $(".select").val();
	Knife.Description = $(".description").val();
	type = $("input[name=knifeType]:checked", ".myForm").val();
	if(type == 1){
		Knife.Type = "Монолит";
	} else{
		Knife.Type = "Раскладной";
	}

	var errorString = "";

	isName = true;
	isFirm = true;
	isLong = true;
	isPrice = true;
	isUniq = true;

	for (var i = 0; i < arrayKnife.length; i++) {
		if(arrayKnife[i].Name == Knife.Name){
			isUniq = false;
			break
		}
	}

	if(Knife.Description.length == 0){
		Knife.Description = "Description of this knife wasn't write, so now you see default descrition :)"
	}

	if(Knife.Name.length < 4 || !isUniq){
		$(".name").css("border", "2px solid red");
		errorString += "Короткое название ножа или нож с таким названием уже существует.  ";
		isName = false;
	} else {
		$(".name").css("border", "2px solid #48D1CC");
		isName = true;
	}

	if(Knife.Firm.length < 6){
		$(".firm").css("border", "2px solid red");
		errorString += "Короткое название фирмы.  ";
		isFirm = false;
	} else {
		$(".firm").css("border", "2px solid #48D1CC");
		isFirm = true;
	}

	

	if((type == 1 && Knife.Long < 8 || Knife.Long > 20) || (type == 2 && Knife.Long < 4 || Knife.Long > 12)){
		$(".long").css("border", "2px solid red");
		errorString += "Длинна ножа должна быть от 4 до 20.  ";
		isLong = false;
	} else {
		$(".long").css("border", "2px solid #48D1CC");
		isLong = true;
	}

	if(Knife.Price <= 0){
		$(".price").css("border", "2px solid red");
		errorString += "Цена должна быть положительная.  ";
		isPrice = false;
	} else {
		$(".price").css("border", "2px solid #48D1CC");
		isPrice = true;
	}

	if(isName && isPrice && isFirm && isLong){
		var knifeObject = JSON.stringify(Knife);
		$.ajax({
			//url: "http://localhost:1111/add",
			url: "http://178.165.101.58:1111/add",
			method: "POST",
			data : { sendedData: knifeObject},
				success : function(data) {
					console.log(data)
					Knife.ID = data;
					PrintKnifes(Knife);
				},
		});
	} else{
		PrintKnifes("0");
		errorHandler(errorString);
	}
	return false
}

function PrintKnifes(Knife){
	if(Knife != "0"){
		arrayKnife.push(Knife);
	}
	for(var i = 0; i < arrayKnife.length; i++){
		$(".isCorrect").text("Добавлено!!!");
		$(".isCorrect").css("font-size", "2em");
		$(".isCorrect").css("color", "green");
		$(".knifeList").append("<div class=\"eachKnife added\">" 
			+ "<div><a href=\"knife/" + arrayKnife[i].ID + "\">" + arrayKnife[i].Name + "</a></div>"
			+ "<div>" + arrayKnife[i].Firm  + "</div>"
			+ "<div>" + arrayKnife[i].Long  + "</div>"
			+ "<div>" + arrayKnife[i].Price  + "</div>"
			+ "<div>" + arrayKnife[i].Type  + "</div>"
			+ "<div  class=\"righttop\">" + arrayKnife[i].Steel + "</div>"
		+  "</div>")
	}
}

var newWin

function newWindow(){
	newWin = window.open("about:blank", "hello", "width=500,height=500");
	for(var i = 0 ; i < arrayKnife.length; i++){
		newWin.document.write("Name: " + arrayKnife[i].Name+ "<br/>Firm: " + arrayKnife[i].Firm + "<br/>Length: " + arrayKnife[i].Long 
			+ "<br/>Price: " + arrayKnife[i].Price + "<br/>Type: " + arrayKnife[i].Type + "<br/>Steel: " + arrayKnife[i].Steel + "<br/><br/>");
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