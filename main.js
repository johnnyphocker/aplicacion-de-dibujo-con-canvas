var canvas = document.getElementById("canvas");
	var bandera = false;
	if(canvas && canvas.getContext){
		/**********************
		Variables
		***********************/
		var ctx = canvas.getContext("2d");
		var pos = {};
		var colorSelect = document.getElementById("color");
		var lineaSelect = document.getElementById("linea");
		var borrar = document.getElementById("borrar");
		if(ctx){
			/**********************
			Funciones
			***********************/
			function ajusta(xx, yy){
				var posCanvas = canvas.getBoundingClientRect();
				var x = xx - posCanvas.left;
				var y = yy - posCanvas.top;
				return {x: x, y: y}
			}
			function dibuja(inicio, fin){
				ctx.beginPath();
				ctx.moveTo(inicio.x, inicio.y);
				ctx.lineTo(fin.x, fin.y);
				ctx.stroke();
			}
			/**********************
			Eventos de contralores
			***********************/
			borrar.onclick = function(e){
				ctx.clearRect(0,0,canvas.width, canvas.height);
			}
			colorSelect.onchange = function(e){
				ctx.strokeStyle = colorSelect.value;
			}
			lineaSelect.onchange = function(e){
				ctx.lineWidth = lineaSelect.value;
			}
			/**********************
			Eventos del CANVAS
			***********************/
			canvas.onmousedown = function(e){
				pos = ajusta(e.clientX, e.clientY);
				bandera = true;
			}
			canvas.onmouseup = function(e){
				bandera = false;
			}
			canvas.onmousemove = function(e){
				if(bandera){
					var fin = ajusta(e.clientX, e.clientY);
					dibuja(pos, fin);
					pos = fin;
				}
			}
			/**********************
			Valores iniciales
			***********************/
			ctx.strokeStyle = colorSelect.value;
			ctx.lineWidth = lineaSelect.value;
		} else {
			alert("Error al crear el contexto");
		}
	}