<?php
/**
 * Template Name: Formulario venta
 *
 */
get_header();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL); 

require_once( 'template-form-util.php');




$_SESSION["CSC"] = null;
unset($_SESSION["CSC"]);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['inputNombresUsuario'])) {

	$datosCompletos = true;

	$promocion_valor = isset($_POST["promocion_valor"]) && $_POST["promocion_valor"] != null ? test_input($_POST["promocion_valor"]) : null;
	$promocion_id = isset($_POST["promocion_id"]) && $_POST["promocion_id"] != null ? test_input($_POST["promocion_id"]) : null;

    // DATOS ALUMNO
    $tipoDocAlum = test_input($_POST['selectTipoDocumentoAlumno']);
	$numDocAlum = test_input($_POST['inputDocumentoIdentidadAlumno']);
	$emailAlum = test_input($_POST['inputEmailAlumno']);
	$nombresAlum = test_input($_POST['inputNombresAlumno']);
	$apeAlum = test_input($_POST['inputApellidosAlumno']);
	$fecNacAlum = test_input($_POST['inputFechaNacimientoAlumno']);
	$distritoAlum = test_input($_POST['selectDistritoAlumno']);
	$direcAlum = test_input($_POST['inputDireccionAlumno']);
	$telefAlum = test_input($_POST['inputTelefonoMovilAlumno']);
	//$fijoAlum = test_input($_POST['inputTelefonoFijoAlumno']);
	$generoAlum = test_input($_POST['selectGenero']);
	$discapacidadAlum = isset($_POST['switchDiscapacidad']) ? 1 : 0;
	$observacionesAlum = isset($_POST['txtObservaciones']) ? test_input($_POST['txtObservaciones']) : "";

    // DATOS CLIENTE
    $tipoDocUsu = test_input($_POST['selectTipoDocumentoUsuario']);
	$numDocUsu = test_input($_POST['inputDocumentoIdentidadUsuario']);
	$emailUsu = test_input($_POST['inputEmailUsuario']);
	$nombresUsu = test_input($_POST['inputNombresUsuario']);
	$apeUsu = isset($_POST['inputApellidosUsuario']) ? test_input($_POST['inputApellidosUsuario']) : "";
	$direccionUsu = $tipoDocUsu == "RUC" ? test_input($_POST['inputDireccionUsuario']) : "";

	$cursos = $_POST["cursosVenta"];

	$cursos = str_replace("\\\"", "\"", $cursos );

	$cursosVenta = json_decode($cursos, false);

	$alumno = array(
		"tipoDocumento" => $tipoDocAlum,
		"documentoIdentidad" => $numDocAlum,
		"fechaNacimiento" => empty($fecNacAlum) ? "" : $fecNacAlum." 00:00:00",
		"distrito_id" => (int)$distritoAlum,
		"direccion" => $direcAlum,
		"estado" => true,
		"pais_id" => 1,
		"departamento_id" => 1,
		"provincia_id" => 1,
		"nombreCompleto" => $nombresAlum." ".$apeAlum,
		"discapacidad" => $discapacidadAlum,
		"observaciones" => $observacionesAlum,
		"genero" => $generoAlum,
		"usuario_by_usuario_id" => array(
			"nombre" => $nombresAlum,
			"apellidos" => $apeAlum,
			"nombreCompleto" => $nombresAlum." ".$apeAlum,
			"correo" => $emailAlum,
			"telefonoMovil" => empty($telefAlum) ? "" : $telefAlum,
			"telefonoFijo" => '4656422',
			"estado" => true,
			"tieneUsuarioDF" => false,
			"rol" => "Alumno",
			"proveedor" => "DF",
			"pais_id" => 1
		)
	);

	$cliente = array(
		"tipoDocumento" => $tipoDocUsu,
		"documentoIdentidad" => $numDocUsu,
		"fechaNacimiento" => empty($fecNacAlum) ? "" : $fecNacAlum." 00:00:00",
		"distrito_id" => (int)$distritoAlum,
		"direccion" => $tipoDocUsu == "RUC" ? $direccionUsu : $direcAlum,
		"estado" => true,
		"nombreRazonSocial" => $tipoDocAlum == "DNI" ? $nombresUsu." ".$apeUsu : $nombresUsu,
		"telefonoMovil" => empty($telefAlum) ? "" : $telefAlum,
		"telefonoFijo" => '4656422',
		"email" => $emailUsu
	);
	//LLAMAR A REGISTRO DE ALUMNO Y USUARIO
	$dataRegUsuarios = array(
		"alumno" => $alumno,
		"cliente" => $cliente,
		"programaciones" => $cursosVenta,
		"cliente_ip" => get_client_ip(),
	);

	//print_r(json_encode($dataRegUsuarios));

	$responseRegUsuarios = postRequest(
		$dataRegUsuarios, 
		'/webEducacion/wepaso1', 
		array(
			"Content-Type:application/json",
		)
	);

	//print_r($responseRegUsuarios);

	$decodeRes = json_decode($responseRegUsuarios, true);

	if($decodeRes["success"] === true){
		$session_key = $decodeRes["tokenSession"]["sessionKey"];	
		$expirationTime = $decodeRes["tokenSession"]["expirationTime"];
		$comercio_id = $decodeRes["tokenSession"]["comercio_id"];
		$tokenAcceso = $decodeRes["tokenAcceso"];	
		$totalVenta = $decodeRes["total"];
		$matriculaweb_id = $decodeRes["matriculawebId"];
		
		//VARIABLES PARA GUARDAR EN SESION
		$alumnoSesion = array(
			"nombreCompleto" => $nombresAlum." ".$apeAlum." - ".$tipoDocAlum." ".$numDocAlum,
			"correo" => $emailAlum,
		);
		$clienteSesion = array(
			"nombreRazonSocial" => $tipoDocAlum == "DNI" ? $nombresUsu." ".$apeUsu : $nombresUsu,
			"tipoDocumento" => $tipoDocUsu,
		);

		$_SESSION["tokenAcceso"] = $tokenAcceso;
		$_SESSION["total"] = $totalVenta;
		$_SESSION["alumno"] = json_encode($alumnoSesion);
		$_SESSION["cliente"] = json_encode($clienteSesion);
		$_SESSION["alumno_id"] = $decodeRes["alumno"]["data"]["id"];
		$_SESSION["cliente_id"] = $decodeRes["cliente"]["data"]["id"];
		$_SESSION["sede_id"] = $decodeRes["sede_id"];
		$_SESSION["cursos"] = json_encode($decodeRes["cuposDeta"]["conCupo"]);
		$_SESSION["matriculaweb_id"] = $matriculaweb_id;
		$_SESSION["promocion_id"] = $promocion_id;
		$_SESSION["escogerCursos"] = false;
	} else {

		//echo $decodeRes["errorCode"];

		if($decodeRes["errorCode"] == 1000){
			$_SESSION["error"] = 1;
			header("Location: /formulario-usuario/");
			exit();
		} else if( $decodeRes["errorCode"] === 1005){
			$_SESSION["error"] = 5;
			header("Location: /formulario-usuario/");
			exit();
		} else if($decodeRes["errorCode"] === 1006){
			$_SESSION["error"] = 2;
			$_SESSION["CEM"] = json_encode($decodeRes["estarMatriculado"]["cursosYaMatriculado"]);
			header("Location: /formulario-usuario/");
			exit();
		} else if($decodeRes["errorCode"] === 1007){
			$_SESSION["error"] = 3;
			$_SESSION["CSC"] = json_encode($decodeRes["cuposDeta"]["sinCupo"]);
			header("Location: /formulario-usuario/");
			exit();
		} else if($decodeRes["errorCode"] === 3000 || $decodeRes["errorCode"] === 3001){
			$_SESSION["error"] = 4;
			header("Location: /formulario-usuario/");
			exit();
		} else if($decodeRes["errorCode"] === 1001 || $decodeRes["errorCode"] === 1003){
			$_SESSION["error"] = 6;
			header("Location: /formulario-usuario/");
			exit();
		} else {
			$_SESSION["error"] = 7;
			header("Location: /formulario-usuario/");
			exit();
		}
	}
} else {
	header("Location: index.php");
	exit();
}



?>
<div class="col-md-12">
	<div class="left-content" >


		<div class="container" style="max-width: 980px; margin: 1rem auto;">
<form action=<?php echo '"./formulario-venta-resultado/"'; ?> method="POST" id="callbackForm">
<input type="hidden" id="callbackFormTransactionToken" name="transactionToken">
 <input type="hidden" id="callbackFormBin" name="bin">
<input type="hidden" id="callbackFormChannel" name="channel">
</form>
	<div id="containerDetalleCursos">
		<h4 class="border-bottom pb-2 mb-0 fw-bold">Detalle del pago</h4>
		<table id="tableCursos" data-toggle="table" data-buttons-class="xs btn-light" class="table table-sm table-hover">
					<thead class="thead-light">
						<tr>
							<th>
								<div class="th-inner sortable both">Sede</div>
								<div class="fht-cell"></div>
							</th>
							<th>
								<div class="th-inner sortable both asc">Nombre</div>
								<div class="fht-cell"></div>
							</th>
							<th>
								<div class="th-inner sortable both">Información</div>
								<div class="fht-cell"></div>
							</th>
							<th>
								<div class="th-inner sortable both text-center">Subtotal</div>
								<div class="fht-cell"></div>
							</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
					<tfoot>
										<tr> 
											<td></td> 
											<td></td> 
											<td>
												
											</td> 
											<td>
												<span style="font-weight:bold">Total</span>
												<br>
												<span id="total-price" class="price"></span>
											</td> 
										</tr>				
									</tfoot>
				</table>
		</table>
	</div>

	<div class="mt-3" id="pay-block">
		<h4 class="border-bottom pb-2 mb-0 fw-bold">Ingresa tus datos de pago</h4>
		<!-- <form> -->
			<div class="mt-3">
                <div class="form-group">
					<div id="txtNumeroTarjeta" class="payment-input form-control"></div>
				</div>
				<div class="row mt-2">
					<div class="col-md-6">
						<div class="form-group">
							<div id="txtFechaVencimiento" class="payment-input form-control"></div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<div id="txtCvv" class="payment-input form-control"></div>
						</div>
					</div>
				</div>
				<div class="row mt-2">
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" class="payment-input form-control" id="inputNombresUsuario" placeholder="Nombres" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" class="payment-input form-control" id="inputApellidosUsuario" placeholder="Apellidos" required>
						</div>
					</div>
				</div>

				<div class="row mt-2">
					<div class="col-md-6">
						<div class="form-group">
							<input type="text" class="emailuser payment-input form-control" id="inputEmailUsuario" placeholder="Email"
							required>
						</div>
					</div>
				</div>
				<div class="mt-3">
					<button type="button" class="w-100 btn btn-lg" id="btnContinuar">Pagar S/ <?php echo number_format((float)$totalVenta, 2, '.', ''); ?></button>
				</div>	
        	</div>
	</div>	
	<div class="row" id="secure-pay">
		<div class="col-md-6 left">
			<img src="<?php echo get_site_url() . '/wp-content/plugins/sige/images/pci-security-standards-council-logo.png'; ?>" alt="" />
		</div>
		<div class="col-md-6 right">
			<p>Esta transacción está asegurada por</p>
			<img src="<?php echo get_site_url() . '/wp-content/plugins/sige/images/Niubiz-logo.png'; ?>" alt="" />
		</div>
	</div>
</div>




	</div>
</div>

<style>
	#pay-block #btnContinuar
	{
		background-color: #000;
		color: #fff;
		font-size: 18px;
		margin-bottom: 20px;
		border-radius: 22px;
	}

	#secure-pay .left img
	{
		width: 180px;
	}
	#secure-pay .right
	{
		text-align: right;
	}
	#secure-pay .right p
	{
		font-size: 12px;
		margin-bottom: 0;
	}
	#secure-pay .right img
	{
		width: 150px;
	}
</style>

<script src="https://static-content.vnforapps.com/elements/v1/payform.min.js"></script>

<script type="text/javascript">
	jQuery(function($)  {
		$(document).ready(function () {

			var configuration = {
			  callbackurl: "",
			  sessionkey: "<?php echo $session_key; ?>",
			  channel: <?php echo "'web'"; ?>,
			  merchantid: <?php echo $comercio_id; ?>,
			  purchasenumber: <?php echo (int)$matriculaweb_id; ?>,
			  amount: <?php echo $totalVenta; ?>,
			  language: 'es',
			  font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
			};

			payform.setConfiguration(configuration);

			var elementStyles = {
				base: {
				    color: '#666666',
				    fontWeight: 700,
				    fontFamily: "'Montserrat', sans-serif",
				    fontSize: '16px',
				    placeholder: {
				      color: '#999999'
				    },
				    autofill: {
				      color: '#e39f48',
					}
				},
				invalid: {
				    color: '#E25950',
				    '::placeholder': {
				      color: '#FFCCA5',
				    }
				}
			};


			var cardNumber = payform.createElement(
				    'card-number',
				    {
				      style: elementStyles,
					  placeholder:'Número de Tarjeta' 
					},
				    'txtNumeroTarjeta'
				);

			cardNumber.then(element => {
				element.on('bin', function (data) {
					/* Tú código aquí */
				});
			});


			var cardExpiry =
			  payform.createElement(
			    'card-expiry',
			    {
			      style:elementStyles,
			      placeholder:'MM/AAAA'
			    },
			    'txtFechaVencimiento'
			);

			var cardCvv =
			  payform.createElement(
			    'card-cvc',
			    {
			      style:elementStyles,
			      placeholder:'CVV'
				},
			    'txtCvv'
			);







			$("#btnContinuar").click(function(){
				$("#spinner").show();
				let nombre = $("#inputNombresUsuario").val();
				let apellido = $("#inputApellidosUsuario").val();
				let correo = $("#inputEmailUsuario").val();
				if(nombre == "" || apellido == "" || correo == ""){
					$("#spinner").hide();
					Swal.fire({
					title: 'Error!',
					text: 'Debe ingresar todos los datos solicitados.',
					icon: 'error',
					confirmButtonText: 'Aceptar'
					})
					return;
				}
				var data = {
					name: nombre.trim(),
					lastName: apellido.trim(),
					email: correo.trim(),
					alias: <?php echo $decodeRes["alumno"] ? $decodeRes["alumno"]["data"]["id"] : ""; ?>,
					amount: <?php echo number_format((float)$totalVenta, 2, '.', ''); ?>,
				}
				payform.createToken([cardNumber,cardExpiry,cardCvv], data)
				.then(function(data){
					var callbackFormRef = document.getElementById("callbackForm");
					document.getElementById('callbackFormTransactionToken').value = data.transactionToken;
					document.getElementById('callbackFormBin').value = data.bin;
					document.getElementById('callbackFormChannel').value = data.channel;
					callbackFormRef.submit();
			    }).catch(function(error){
					let errJSON = "";
					let redirect = false;
					try {
						errJSON = JSON.parse(error);
					} catch{
						errJSON = error;
					}
					let errorMessage = 'Su tiempo de sesión ha expirado y no se pudo realizar el pago, por favor inténtelo nuevamente.';
					errorMessage = errJSON?.errorCode === 400 ? errJSON?.errorMessage : error;
					if(errorMessage.includes("expirado") || errorMessage.includes("Unauthorized") || errorMessage.includes("sesión") || errorMessage.includes("session")){
						redirect = true;
					} 
					$("#spinner").hide();
					Swal.fire({
					title: 'Error!',
					text: errorMessage,
					icon: 'error',
					confirmButtonText: 'Aceptar'
					}).then((result) => {
						if(redirect){
							window.location.replace("./formulario-usuario/");
						}
					})
			    });
			})




			let total_price = 0
			let cursosSeleccionados = []
			let cursosSeleccionados_pre = '<?php echo $cursos; ?>'
			cursosSeleccionados = JSON.parse(cursosSeleccionados_pre)
			mostrarCursosSeleccionados()


			function mostrarCursosSeleccionados()
			{
				    	if (cursosSeleccionados.length > 0) {
				                $("#tableCursos").children("tbody").empty()

				                for (let i = 0; i < cursosSeleccionados.length; i++) {
				                    let curso = cursosSeleccionados[i]
				                    total_price = total_price + (curso.precio*1)
				                    $("#tableCursos").children("tbody").append(`
									<tr> 
										<td>
											<span class="text-muted">${curso.nombreSede}</span>
										</td> 
										<td class="text-muted">${curso.nombreCurso}</td> 
										<td>${curso.nombreHorario} (${curso.nombrePeriodo})<br>${curso.nombreDocente}</td> 
										<td>
											<span class="text-muted price">${curso.precio}</span>
										</td> 
										<td style="text-align: center; ">
											<div>
												<button class="btn btn-danger btn-sm deleteButton" data-index="${i}" onclick="eliminarCurso(${i})"><i class="far fa-trash-alt"></i></button>
											</div>
										</td> 
									</tr>
									`)
				                }
				                $('#total-price').html((Math.round(total_price * 100) / 100).toFixed(2))
				                $("#containerTableCursos").css("display", "block")
				        } else {
				        	$("#containerTableCursos").css("display", "none")
				        }
			}

		})
	})
</script>



<?php get_footer(); ?>
