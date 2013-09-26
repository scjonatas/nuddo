// Query the database
function getServicos(tx) {
	tx.executeSql('SELECT * FROM teste', [], onGetServicosSuccess, onError);
}

function onGetServicosSuccess(tx, results) {
	$('#list li').remove();
	
	for (var i = 0; i < results.rows.length; i++) {
		$('#list').append('<li><a href="#contato">' + results.rows.item(i).data + '</a></li>');
		$('#list').listview('refresh');
	}
}

// Evento acionado após efeito de transição
$("#page2").bind("pageshow", function() {
	alert('A page with an id of "page2" was just created by jQuery Mobile!');
});

$("#page2").bind("pageinit", function() {
	db.transaction(getServicos, onError);
	
	$.get("http://www.chronospace.com.br/testeperfil/teste.php", {param: "Eu estou testando!!"}, function(data) {
		alert("Mensagem do servidor: " + data);
	});
});