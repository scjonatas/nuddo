var db;

// Populate the database
function populateDb(tx) {
//	tx.executeSql('DROP TABLE IF EXISTS teste');
	tx.executeSql("CREATE TABLE IF NOT EXISTS `empresa` ("+
					"`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
					"`nome` varchar(255) DEFAULT NULL,"+
					"`logo` varchar(255) DEFAULT NULL,"+
					"`missao` text,"+
					"`visao` text,"+
					"`descricao` text,"+
					"`descricaoEquipe` text,"+
					"`horarioFuncionamento` text,"+
					"`email` varchar(255) DEFAULT NULL,"+
					"`criado` timestamp NULL DEFAULT NULL,"+
					"`modificado` timestamp NULL DEFAULT NULL"+
				  ")");
		  
	tx.executeSql("INSERT INTO `empresa` (`id`, `nome`, `logo`, `missao`, `visao`, `descricao`, `descricaoEquipe`, `horarioFuncionamento`, `email`, `criado`, `modificado`) VALUES "+
					"(1, 'Clínica NUDDO', 'logo_empresa/clinica-nuddo.png', 'Nossa missão é garantir um serviço de qualidade e seguro, com valor agregado, proporcionando o encantamento do cliente.', 'Proporcionar que a região de Feira de Santana tenha a NUDDO como uma clínica de referência em tratamentos de medicina estética e satisfação no serviço prestado.', 'Todos nós vivemos em busca, cada dia mais, de saúde e bem estar. A Clínica NUDDO entende a importância de suprir esta necessidade e trabalha constantemente para garantir a satisfação com eficácia e segurança. Para isto, conta com profissionais altamente qualificados, acompanhados pelo médico Dr. Lucas Fernandes, membro da Sociedade Brasileira de Laser em Medicina e Cirurgia, além de dispor de equipamentos e produtos diferenciados. Hoje com mais de 50 protocolos, o cliente NUDDO tem a disposição tratamentos personalizados que garantem uma melhor qualidade de vida, saúde, bem estar e beleza.\r\n\r\nNa Clínica NUDDO os protocolos de tratamento são compostos por uso de substâncias e tecnologias aprovadas pela ANVISA (Agência Nacional de Vigilância Sanitária) e pelo FDA (Food and Drugs Administration), pois na nossa visão a beleza deve estar sempre aliada à segurança clínica.', 'Com a recente popularização de tratamentos estéticos, houve também a disseminação de empresas e profissionais prestando o serviço com visão unicamente comercial, sem qualificação na área e sem domínio dos aspectos clínicos do tratamento. Basicamente, sem oferecer a segurança necessária a um procedimento tão sério. O resultado desta prática foi um boom de complicações graves por erros de técnica.\r\n\r\nNa Clínica NUDDO os procedimentos são realizados com os métodos mais seguros do mercado e com supervisão de Dr. Lucas Fernandes, médico membro da Sociedade Brasileira de Laser em Medicina e Cirurgia. De forma personalizada é feita a análise da necessidade do paciente, triagem de fatores de risco, recomendações e definição dos parâmetros dos tratamentos. Tudo para oferecer mais segurança para o paciente e eficácia nos tratamentos.', 'Seg. - 08h às 18h\r\nTer. a Sex. - 08h às 20h\r\nSáb. - 08h às 17h', 'contato@nuddo.com.br', '2013-09-26 14:42:49', '2013-09-26 14:48:54');")
}

// Query the database
function queryDb(tx) {
	tx.executeSql('SELECT * FROM `empresa`', [], onQuerySuccess, onError);
}

// Query the success callback
function onQuerySuccess(tx, results) {
	var len = results.rows.length;
//	alert("empresa table: " + len + " rows found.");
//	for (var i = 0; i < len; i++) {
//		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Nome =  " + results.rows.item(i).nome);
//	}
	
	$("#main_loading").css("display", "none");
	$("#main_wrapper").css("display", "block");
	$("#header_title_main").html(results.rows.item(0).nome);
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

	db = window.openDatabase("database", "1.0", "nuddo", 3000 * 1024);

	var dbCreated = window.localStorage.getItem("dbCreated");
//	alert("dbCreated = " + dbCreated);
	if (dbCreated) {
//		alert("Buscando dados!");
		db.transaction(queryDb, onError);
	}
	else {
//		alert("Inserindo dados no banco");
		window.localStorage.setItem("dbCreated", 1);
		db.transaction(populateDb, onError, dbCreated);
	}
}

var navigator, window;
 
function getDimensions() {
	// the iphone specific code is kind of kludgy, if you have a better way let me know
	var isIPhone = (/iphone/gi).test(navigator.appVersion),
		iPhoneHeight = (isIPhone ?  60 : 0),
		width = $(window).width(),
		height = $(window).height(),
		// if one of these doesn't exist, assign 0 rather a null or undefined
		hHeight = $('header').outerHeight() || 0,
		fHeight = $('footer').outerHeight() || 0;
	return {
		width: width - 1,
		height: height - hHeight - fHeight - 2 + iPhoneHeight
	};
}
 
function reSizeDiv() {
	var dims = getDimensions(),
		$flexDiv = $('#main_content_wrapper');
	$flexDiv.css({
		width: dims.width,
		height: dims.height
	});
}
 
// we are watching all three of these events, if any occur we re-determine the size
// and scroll the window back to the top
$(window).bind('resize orientationchange pageshow', function (event) {
	window.scrollTo(1, 0);
	reSizeDiv();
});

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);