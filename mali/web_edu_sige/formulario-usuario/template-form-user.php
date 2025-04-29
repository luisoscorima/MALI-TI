<?php
/**
 * Template Name: Formulario usuario
 *
 */
get_header();



?>
<div class="col-md-12">
	<div class="left-content form-user sige-data" >

		<div class="header">
			<h1>Matrícula</h1>
		</div>
		


		<div class="container my-4">
			<div id="containerDetalleCursos">
				<h4 class="title pb-2 mb-0 fw-bold">Cursos seleccionados<span class="line-middle"></span></h4>
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
				<?php
					if(isset($error) && $error != null){
				?>
					<div class="d-flex justify-content-between">
						<span class='text-danger'><?php echo $errorMessage; ?></span>
						<button type="submit" class="btn btn-primary btn-sm align-self-end" onclick="VolverElegirCursos()">Volver a elegir cursos</button>
					</div>
				<?php
					} else {
				?>
					<div class="d-flex justify-content-end">
						<button type="submit" class="btn btn-primary btn-sm align-self-end" onclick="VolverElegirCursos()">Volver a elegir cursos</button>
					</div>
				<?php
					}
				?>
			</div>

			<form class="mt-3" method="post" action="<?php echo home_url(); ?>/formulario-venta">
				<?php 
					if(isset($promocion) && ($promocion != null)){
				?>
				<input name="promocion_id" value="<?php echo $promocion["id"] ?>" hidden>
				<input name="promocion_valor" value="<?php echo $promocion["valor"] ?>" hidden>
				<?php
					}
				?>
				<div>
					<h4 class="title pb-2 mb-0 fw-bold">Información del Alumno<span class="line-middle"></span></h4>
					<p class="text-color-primary" id="infoAlumnoMessage">Revisa tu información y si no es la correcta actualízala</p>

					<input type="hidden" name="cursosVenta" id="cursosVenta" value ="" />

						<div class="row mt-3">
							<div class="col-md-3">
								<div class="form-group">
									<label for="selectTipoDocumentoAlumno" class="control-label">Tipo Documento <span class="red">*</span></label>
									<select class="form-control" name="selectTipoDocumentoAlumno" id="selectTipoDocumentoAlumno" required>
										<option value="DNI">DNI</option>
										<option value="CE">Carné de extranjería</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="inputDocumentoIdentidadAlumno" class="control-label">Número Documento <span class="red">*</span></label>
									<input type="text" class="form-control" pattern="[0-9]{8,12}" name="inputDocumentoIdentidadAlumno"
									 id="inputDocumentoIdentidadAlumno" placeholder="" required>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="inputEmailAlumno" class="control-label">Email <span class="red">*</span></label>
									<input type="email" class="form-control emailuser" name="inputEmailAlumno" id="inputEmailAlumno" 
									placeholder="" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" required>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label for="inputNombresAlumno" class="control-label">Nombres <span class="red">*</span></label>
									<input type="text" class="form-control" name="inputNombresAlumno" id="inputNombresAlumno" placeholder="" required>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="inputApellidosAlumno" class="control-label">Apellidos <span class="red">*</span></label>
									<input type="text" class="form-control" name="inputApellidosAlumno" id="inputApellidosAlumno" placeholder="" required>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="selectGenero" class="control-label">Género <span class="red">*</span></label>
									<select class="form-control" id="selectGenero" name="selectGenero" required>
										<option value="">Seleccione</option>
										<option value="M">Masculino</option>
										<option value="F">Femenino</option>
										<option value="NP">No Precisa</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="inputFechaNacimientoAlumno" class="control-label">Fecha Nacimiento <span class="red">*</span></label>
									<input type="date" name="inputFechaNacimientoAlumno" id="inputFechaNacimientoAlumno" class="form-control fecnac" name="date"
									onkeydown="return false" required>
								</div>
							</div>
						</div>
						<div class="row mt-3">
							<div class="col-md-6">
								<div class="form-group">
									<label for="inputDireccionAlumno" class="control-label">Dirección <span class="red">*</span></label>
									<input type="text" class="form-control" name="inputDireccionAlumno" id="inputDireccionAlumno" placeholder="" required>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="selectDistritoAlumno" class="control-label">Distrito <span class="red">*</span></label>
									<select class="form-control" id="selectDistritoAlumno" name="selectDistritoAlumno" required>
										<option value="">Seleccione</option>
										<option value="1">Surquillo</option>
										<option value="2">Lima</option>
										<option value="3">Ancon</option>
										<option value="4">Ate</option>
										<option value="5">Barranco</option>
										<option value="6">Breña</option>
										<option value="44">Callao</option>
										<option value="7">Carabayllo</option>
										<option value="8">Chaclacayo</option>
										<option value="9">Chorrillos</option>
										<option value="10">Cieneguilla</option>
										<option value="11">Comas</option>
										<option value="12">El Agustino</option>
										<option value="13">Independencia</option>
										<option value="14">Jesus Maria</option>
										<option value="15">La Molina</option>
										<option value="16">La Victoria</option>
										<option value="17">Lince</option>
										<option value="18">Los Olivos</option>
										<option value="19">Lurigancho</option>
										<option value="20">Lurin</option>
										<option value="21">Magdalena del Mar</option>
										<option value="22">Pueblo Libre</option>
										<option value="23">Miraflores</option>
										<option value="24">Pachacamac</option>
										<option value="25">Pucusana</option>
										<option value="26">Puente Piedra</option>
										<option value="27">Punta Hermosa</option>
										<option value="28">Punta Negra</option>
										<option value="29">Rimac</option>
										<option value="30">San Bartolo</option>
										<option value="31">San Borja</option>
										<option value="32">San Isidro</option>
										<option value="33">San Juan de Lurigancho</option>
										<option value="34">San Juan de Miraflores</option>
										<option value="35">San Luis</option>
										<option value="36">San Martin de Porres</option>
										<option value="37">San Miguel</option>
										<option value="38">Santa Anita</option>
										<option value="39">Santa Maria del Mar</option>
										<option value="40">Santa Rosa</option>
										<option value="41">Santiago de Surco</option>
										<option value="42">Villa El Salvador</option>
										<option value="43">Villa Maria del Triunfo</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label for="inputTelefonoMovilAlumno" class="control-label">Telefono Móvil <span class="red">*</span></label>
									<input type="tel" class="form-control" pattern="[0-9]{9}" title="9 dígitos" name="inputTelefonoMovilAlumno" id="inputTelefonoMovilAlumno"
									placeholder="" maxlength="9" required>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<div class="row">
										<div class="col-md-8">
											<label for="txtObservaciones" class="control-label">¿Requiere algún tipo de asistencia o necesidad especial a tomar en cuenta durante el curso?</label>
										</div>
										<div class="col-md-4">
											<div class="custom-control custom-switch">
												<input class="custom-control-input" type="checkbox" id="switchDiscapacidad" name="switchDiscapacidad"> 
												<label for="switchDiscapacidad" class="custom-control-label"></label>
											</div>
										</div>
									</div>



									<textarea  maxlength="255" class="form-control" rows="1" name="txtObservaciones" id="txtObservaciones" placeholder="Explica aquí el tipo de apoyo o necesidad especial requerida"></textarea>
								</div>
							</div>
						</div>
				</div>
				<div class="mt-3">
					<h4 class="title pb-2 mb-0 fw-bold">Información de Facturación<span class="line-middle"></span></h4>
					<a class="text-color-primary" style="font-size: 0.9rem;cursor:pointer;" id="btnCopiarDatos">Si los datos de facturación son los mismos del alumno haga clic aquí</a>
					<p class="text-color-primary">Si eres empresa, elige RUC en "tipo documento"</p>
					<div class="row mt-3">
		                <div class="col-md-3">
		                    <div class="form-group">
		                        <label for="selectTipoDocumentoUsuario" class="control-label">Tipo Documento <span class="red">*</span></label>
		                        <select class="form-control" name="selectTipoDocumentoUsuario" id="selectTipoDocumentoUsuario" required>
		                            <option value="DNI">DNI</option>
		                            <option value="RUC">RUC</option>
		                            <option value="RUS">RUS</option>
		                            <option value="CE">Carné de extranjería</option>
		                        </select>
		                    </div>
		                </div>
		                <div class="col-md-3">
		                    <div class="form-group">
		                        <label for="inputDocumentoIdentidadUsuario" class="control-label">Documento Identidad <span class="red">*</span></label>
		                        <input type="text" class="form-control" pattern="[0-9]{8,12}" name="inputDocumentoIdentidadUsuario" 
								id="inputDocumentoIdentidadUsuario" placeholder="" minlength="8" maxlength="12" required>
		                    </div>
		                </div>
						<div class="col-md-6">
		                    <div class="form-group">
		                        <label for="inputEmailUsuario" class="control-label">Email <span class="red">*</span></label>
		                        <input type="email" class="form-control" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" id="inputEmailUsuario" name="inputEmailUsuario" placeholder=""
		                        required>
		                    </div>
		                </div>
		            </div>
					<div class="row" id="inputsFacturacion">
		                <div class="col-md-6">
		                    <div class="form-group">
		                        <label for="inputNombresUsuario" class="control-label">Nombres <span class="red">*</span></label>
		                        <input type="text" class="form-control" id="inputNombresUsuario" name="inputNombresUsuario" placeholder="" required>
		                    </div>
		                </div>
		                <div class="col-md-6">
		                    <div class="form-group">
		                        <label for="inputApellidosUsuario" class="control-label">Apellidos <span class="red">*</span></label>
		                        <input type="text" class="form-control" id="inputApellidosUsuario" name="inputApellidosUsuario" placeholder="" required>
		                    </div>
		                </div>
		            </div>
					<div class="form-group mt-3">
		                <div class="col-xs-12" style="overflow:hidden;">
		                    <input type="checkbox" name="inputterminos" class="inputterminos"> He leído y acepto los <a href="../../textos/Terminos y Condiciones del Uso de Datos Personales.pdf" target="blank">Términos y condiciones.</a>
		                </div>
		            </div>
					<div class="mt-3">
						<button class="btn btn-primary" id="btnContinuar" disabled data-toggle="modal" data-target="#exampleModal">Continuar con el pago</button>
					</div>	
				</div>
			</form>
		</div>


		<script type="text/javascript">
			jQuery(function($)  {
				$(document).ready(function () {

					let total_price = 0;

					let cursosSeleccionados = []
					let cursosSeleccionados_pre = sessionStorage.getItem('cursosSeleccionados')
					console.log(cursosSeleccionados_pre)

					if(cursosSeleccionados_pre !== null)
					{
						$('#cursosVenta').val(cursosSeleccionados_pre)
						cursosSeleccionados = JSON.parse(cursosSeleccionados_pre)
						mostrarCursosSeleccionados()
					}

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


				    let headerParam = {
					  "Access-Control-Allow-Origin": "*",
					};
					const HOST_EDUCACION = "https://sige.mali.pe";
					//const HOST_EDUCACION = "http://localhost:4000";
					// const HOST_EDUCACION = "http://192.168.0.105:4000";


				    function validarAlumno(docIdentidad) {
					  $.ajax({
					    url: `${HOST_EDUCACION}/webEducacion/obtenerUsuario?docIdentidad=${docIdentidad}`,
					    dataType: "json",
					    headers: headerParam,
					    contentType: "application/json; charset=utf-8",
					    method: "GET",
					    success: function (result) {
					      if (result && result.correo) {
					        $("#infoAlumnoMessage").show();

					        $("#inputEmailAlumno").val(result.correo);
					        $("#inputNombresAlumno").val(result.nombre);
					        $("#inputApellidosAlumno").val(result.apellidos);
					        result.fechaNacimiento
					          ? $("#inputFechaNacimientoAlumno").val(
					              result.fechaNacimiento.substring(0, 10)
					            )
					          : $("#inputFechaNacimientoAlumno").val("");
					        $("#selectDistritoAlumno").val(result.distrito_id).trigger("change");
					        $("#inputDireccionAlumno").val(result.direccion);
					        $("#inputTelefonoMovilAlumno").val(result.telefonoMovil);
					        $("#inputTelefonoFijoAlumno").val(result.telefonoFijo);
					        $("#selectGenero").val(result.genero);
					        $("#txtObservaciones").val(result.observaciones);
					        if (
					          $("#switchDiscapacidad").is(":checked") !== result.discapacidad &&
					          result.discapacidad !== null
					        ) {
					          $("#switchDiscapacidad").trigger("click");
					        }
					      } else {
					        $("#infoAlumnoMessage").hide();

					        $("#inputEmailAlumno").val("");
					        $("#inputNombresAlumno").val("");
					        $("#inputApellidosAlumno").val("");
					        $("#inputFechaNacimientoAlumno").val("");
					        $("#selectDistritoAlumno").val("").trigger("change");
					        $("#inputDireccionAlumno").val("");
					        $("#inputTelefonoMovilAlumno").val("");
					        $("#inputTelefonoFijoAlumno").val("");
					      }
					    },
					  });
					}


					function renderForEmpresa(tipoDoc) {
					  if (tipoDoc === "RUC") {
					    $("#inputsFacturacion").html(`
					        <div class="col-md-6">
					            <div class="form-group">
					                <label for="inputNombresUsuario" class="control-label" style="font-size: 0.9rem">Nombre Empresa *</label>
					                <input type="text" class="form-control" id="inputNombresUsuario" name="inputNombresUsuario" placeholder="" required>
					            </div>
					        </div>
					        <div class="col-md-6">
					            <div class="form-group">
					                <label for="inputDireccionUsuario" class="control-label" style="font-size: 0.9rem">DirecciÃ³n *</label>
					                <input type="text" class="form-control" id="inputDireccionUsuario" name="inputDireccionUsuario" placeholder="" required>
					            </div>
					        </div>
					        `);
					  } else {
					    $("#inputsFacturacion").html(`
					        <div class="col-md-6">
					            <div class="form-group">
					                <label for="inputNombresUsuario" class="control-label" style="font-size: 0.9rem">Nombres *</label>
					                <input type="text" class="form-control" name="inputNombresUsuario" id="inputNombresUsuario" placeholder="" required>
					            </div>
					        </div>
					        <div class="col-md-6">
					            <div class="form-group">
					                <label for="inputApellidosUsuario" class="control-label" style="font-size: 0.9rem">Apellidos *</label>
					                <input type="text" class="form-control" name="inputApellidosUsuario" id="inputApellidosUsuario" placeholder="" required>
					            </div>
					        </div>
					        `);
					  }
					}


				    function cargarValidacionesInputDocumento(selecId, inputId) {
					  const tipo = $(selecId).val();
					  const inputNumeroDocumento = $(inputId);
					  if (tipo === "DNI") {
					    inputNumeroDocumento.attr("pattern", "[0-9]{8}");
					    inputNumeroDocumento.attr("minlength", "8");
					    inputNumeroDocumento.attr("maxlength", "8");
					  } else if (tipo === "CE") {
					    inputNumeroDocumento.attr("pattern", "[0-9]{9,12}");
					    inputNumeroDocumento.attr("minlength", "9");
					    inputNumeroDocumento.attr("maxlength", "12");
					  } else if (tipo === "RUC" || tipo === "RUS") {
					    inputNumeroDocumento.attr("pattern", "[0-9]{11}");
					    inputNumeroDocumento.attr("minlength", "1");
					    inputNumeroDocumento.attr("maxlength", "11");
					  }
					}


					$("#txtObservaciones").attr("disabled", "disabled");
					
					cargarValidacionesInputDocumento(
					    "#selectTipoDocumentoAlumno",
					    "#inputDocumentoIdentidadAlumno"
					);

					cargarValidacionesInputDocumento(
					    "#selectTipoDocumentoUsuario",
					    "#inputDocumentoIdentidadUsuario"
					);
					  
					$('input[name="inputterminos"]').click(function () {
					    if ($(this).is(":checked")) {
					      $("#btnContinuar").removeAttr("disabled");
					    } else {
					      $("#btnContinuar").attr("disabled", "disabled");
					    }
					});

					$("#infoAlumnoMessage").hide();
					  
					$("#containerTableCursos").css("display", "none");

					$("#inputDocumentoIdentidadAlumno").change(function () {
					    /*
					    if (!$(this).value()) {
					      $("#infoAlumnoMessage").hide();
					    }
					    */
					});



				    $("#selectTipoDocumentoUsuario").change(function () {
					    cargarValidacionesInputDocumento(
					      "#selectTipoDocumentoUsuario",
					      "#inputDocumentoIdentidadUsuario"
					    );
					    if ($("#selectTipoDocumentoUsuario").val() === "DNI") {
					      $("#inputDocumentoIdentidadUsuarioMessage").text("8 dígitos numéricos");
					    }
					    if ($("#selectTipoDocumentoUsuario").val() === "RUC") {
					      $("#inputDocumentoIdentidadUsuarioMessage").text("11 dígitos numéricos");
					    }
					    if ($("#selectTipoDocumentoUsuario").val() === "RUS") {
					      $("#inputDocumentoIdentidadUsuarioMessage").text("11 dígitos numéricos");
					    }
					    if ($("#selectTipoDocumentoUsuario").val() === "CE") {
					      $("#inputDocumentoIdentidadUsuarioMessage").text(
					        "Hasta 12 dígitos numéricos"
					      );
					    }
					    $("#inputDocumentoIdentidadUsuario").val("");
					    renderForEmpresa($(this).val());
					  });

					  $("#switchDiscapacidad").change(function () {
					    console.log("cheecked", $("#switchDiscapacidad").is(":checked"));
					    if ($("#switchDiscapacidad").is(":checked")) {
					      $("#txtObservaciones").removeAttr("disabled");
					    } else {
					      $("#txtObservaciones").attr("disabled", "disabled");
					    }
					});


					$("#selectTipoDocumentoAlumno").change(function () {
					    cargarValidacionesInputDocumento(
					      "#selectTipoDocumentoAlumno",
					      "#inputDocumentoIdentidadAlumno"
					    );
					    if ($("#selectTipoDocumentoAlumno").val() === "DNI") {
					      $("#inputDocumentoIdentidadMessage").text("8 dígitos numéricos");
					    }
					    if ($("#selectTipoDocumentoAlumno").val() === "CE") {
					      $("#inputDocumentoIdentidadMessage").text("Hasta 12 dígitos numéricos");
					    }
					    $("#inputDocumentoIdentidadAlumno").val("");
					});


					$("#inputDocumentoIdentidadAlumno").blur(function () {
					    let tipoDocumento = $("#selectTipoDocumentoAlumno").val();
					    let documento = $("#inputDocumentoIdentidadAlumno").val();
					    let isValid = false;
					    if (tipoDocumento == "DNI" && documento.length === 8) {
					      isValid = true;
					    } else if (tipoDocumento === "CE" && documento.length === 12) {
					      isValid = true;
					    } else {
					      isValid = false;
					    }
					    if (documento) {
					      validarAlumno(documento);
					    }
					});



					$("#btnCopiarDatos").click(function () {
					    $("#selectTipoDocumentoUsuario")
					      .val($("#selectTipoDocumentoAlumno").val())
					      .trigger("change");
					    $("#inputDocumentoIdentidadUsuario").val(
					      $("#inputDocumentoIdentidadAlumno").val()
					    );
					    $("#inputEmailUsuario").val($("#inputEmailAlumno").val());
					    $("#inputNombresUsuario").val($("#inputNombresAlumno").val());
					    $("#inputApellidosUsuario").val($("#inputApellidosAlumno").val());
					})





					
				})
			})
		</script>

	</div>
</div>
<?php get_footer(); ?>
