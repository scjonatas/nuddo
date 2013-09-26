// Populate the database
function populateDb(tx) {
//	tx.executeSql('DROP TABLE IF EXISTS teste');
	tx.executeSql('CREATE TABLE IF NOT EXISTS teste (id INTEGER PRIMARY KEY AUTOINCREMENT, data VARCHAR(50))');
	tx.executeSql('INSERT INTO teste (id, data) VALUES (NULL, "First row")');
	tx.executeSql('INSERT INTO teste (id, data) VALUES (NULL, "Second row")');
}

// Query the database
function queryDb(tx) {
	tx.executeSql('SELECT * FROM teste', [], onQuerySuccess, onError);
}

// Query the success callback
function onQuerySuccess(tx, results) {
	var len = results.rows.length;
	alert("teste table: " + len + " rows found.");
	for (var i = 0; i < len; i++) {
		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
	}
}

// Transaction error callback
function onError(err) {
	alert("Error processing SQL: " + err.code);
	alert(err.message);
}

// Transaction success callback
function onDbCreated() {
	db.transaction(queryDb, onError);
}

// device APIs are available
function onDeviceReady() {
	$.mobile.defaultPageTransition = "pop";

	db = window.openDatabase("database", "1.0", "Banco de Teste", 200000);

	var dbCreated = window.localStorage.getItem("dbCreated");
	alert("dbCreated = " + dbCreated);
	if (dbCreated) {
		alert("Buscando dados!");
		db.transaction(queryDb, onError);
	}
	else {
		alert("Inserindo dados no banco");
		window.localStorage.setItem("dbCreated", 1);
		db.transaction(populateDb, onError, dbCreated);
	}
}

var db;

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);