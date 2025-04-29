<?php

class widget_sige_class extends WP_Widget
{
	function __construct() {
		parent::__construct(
			'widget_sige_id',
			'Formulario SIGE',
			array( 'description' => 'Integra el formulario del SIGE en la web' )
		);
	}

	public function widget( $args, $instance ) {




		if(isset($_POST["cursos"]) && !empty($_POST["cursos"])){

			$cursosVenta = $_POST['cursos'];
			$isValid = validarCursosEscogidos($cursosVenta);
			if($isValid){
				$_SESSION["cursosVenta"]=$cursosVenta;
				header("Location: /formulario-usuario/");
				exit();
			}
			
			unset($cursosVenta);
			unset($isValid);

		} else {
			//LIMPIAR VARIABLES DE SESSION
			unset($_SESSION["error"]);
			$_SESSION["error"] = null;
			if(isset($_SESSION["escogerCursos"]) && $_SESSION["escogerCursos"]){
				$_SESSION["escogerCursos"] = "";
				unset($_SESSION["escogerCursos"]);

				$_SESSION["CSC"] = null;
				unset($_SESSION["CSC"]);
			} else {
				$_SESSION = array();
				unset($_SESSION["cursosVenta"]);
			}
		}



		?>


		<div class="accordion sige sige-data" id="accordionExample">
		  <div class="card">
		    <div class="card-header" id="headingOne">
		      <h2 class="mb-0">
		        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
		          <?php echo $instance['title']; ?>
		        </button>
		      </h2>
		    </div>

		    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
		      <div class="card-body">

		      	<div class="row">
							<div class="col-sm-12 col-lg-2">
								<select class="custom-select custom-select-md" aria-label=".custom-select-lg" id="selectSedes">
									<option selected value="">Elige sede</option>
								</select>
							</div>
							<div class="col-sm-12 col-lg-2">
								<select class="custom-select custom-select-md" aria-label=".custom-select-lg" id="selectPeriodos">
									<option selected value="">Elige periodo</option>
								</select>
							</div>
							<div class="col-sm-12 col-lg-2">
								<select class="custom-select custom-select-md" aria-label=".custom-select-lg" id="selectCursos">
									<option selected value="">Elige curso</option>
								</select>
							</div>
							<div class="col-sm-12 col-lg-4">
								<select class="custom-select custom-select-md" aria-label=".custom-select-lg" id="selectHorario">
									<option selected value="">Elige horario</option>
								</select>
							</div>
							<div class="col-sm-12 col-lg-2">
								<button type="button" class="w-100 btn btn-primary waves-effect waves-light" id="btnAgregar">
									Agregar curso
								</button>
							</div>
					</div>

					<div class="row">
						<div class="col-12">
							


							<div id="containerTableCursos" class="border-top mt-2">
								<h6 class="pb-2 mb-0 fw-bold" style="--bs-border-color: #652581;color: #652581;">Cursos seleccionados</h6>
								<table id="tableCursos" data-toggle="table" data-buttons-class="xs btn-light" class="table-borderless table table-hover" style="display: table;">
                                    <thead class="thead-light">
										<tr>
											<th>
												<div class="th-inner sortable both">Sede</div>
												<div class="fht-cell"></div>
											</th>
											<th>
												<div class="th-inner sortable both">Nombre</div>
												<div class="fht-cell"></div>
											</th>
											<th>
												<div class="th-inner sortable both">Información</div>
												<div class="fht-cell"></div>
											</th>
											<th>
												<div class="th-inner sortable both">Subtotal</div>
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
								<form method="post" action="/formulario-usuario/">
									<div class="text-right">
										<button class="btn btn-primary" id="btnPagar">Continuar con la inscripción</button>
									</div>
									<input type="text" name="cursos" id="cursosVal" hidden>
								</form>
							</div>

						</div>
					</div>

		      </div>
		    </div>
		  </div>
		</div>
		<script type="text/javascript">
			jQuery(function($)  {
				$(document).ready(function () {
	 				const HOST_EDUCACION = "https://sige.mali.pe";

	 				let headerParam = {
					  "Access-Control-Allow-Origin": "*",
					};

					let cursos = ""

					let cursosSeleccionados = []
					let cursosSeleccionados_pre = sessionStorage.getItem('cursosSeleccionados')
					console.log('cursosSeleccionados_pre',cursosSeleccionados_pre)

					if(cursosSeleccionados_pre !== null)
					{
						cursosSeleccionados = JSON.parse(cursosSeleccionados_pre)
						mostrarCursosSeleccionados()
					}
					else
					{
						$("#containerTableCursos").css("display", "none")
					}

					cargarPeriodos()
	 				cargarSedes()	 				


					function cargarPeriodos() {
					  $.ajax({
					    url: `${HOST_EDUCACION}/webEducacion/periodos`,
					    dataType: "json",
					    headers: headerParam,
					    contentType: "application/json; charset=utf-8",
					    method: "GET",
					    success: function (result) {
					      if (result.length > 0) {
					        $.each(result, function (key, value) {
					          $("#selectPeriodos").append(
					            '<option value="' + value.id + '">' + value.nombre + "</option>"
					          );
					        });
					      }
					    },
					  });
					}

					function cargarSedes() {
					  $.ajax({
					    url: `${HOST_EDUCACION}/webEducacion/sedes`,
					    dataType: "json",
					    headers: headerParam,
					    contentType: "application/json; charset=utf-8",
					    method: "GET",
					    success: function (result) {
					      if (result.length > 0) {
					        $.each(result, function (key, value) {
					          $("#selectSedes").append(
					            '<option value="' + value.id + '">' + value.nombre + "</option>"
					          );
					        });
					      }
					    },
					  });
					}


					$("#selectPeriodos").change(function () {
					    $("#selectCursos").empty();
					    $("#selectHorario").empty();
					    let periodo = $(this).val();
					    let sede = $("#selectSedes").val();
					    if (periodo && sede) {
					      cargarCursosPorSedePeriodo(sede, periodo);
					    } else {
					      $("#selectCursos").append('<option value="">Elige curso</option>');
					      $("#selectHorario").append('<option value="">Elige horario</option>');
					    }
					});

					$("#selectSedes").change(function () {
					    $("#selectCursos").empty();
					    $("#selectHorario").empty();
					    let periodo = $("#selectPeriodos").val();
					    let sede = $(this).val();
					    if (periodo && sede) {
					      cargarCursosPorSedePeriodo(sede, periodo);
					    } else {
					      $("#selectCursos").append('<option value="">Elige curso</option>');
					      $("#selectHorario").append('<option value="">Elige horario</option>');
					    }
					});

					$("#selectCursos").change(function () {
					    $("#selectHorario").empty();
					    if ($(this).val() && $("#selectSedes").val()) {
					      cargaProgramacionPorCursoSede(
					        $(this).val(),
					        $("#selectSedes").val(),
					        $("#selectPeriodos").val()
					      );
					    } else {
					      $("#selectHorario").append('<option value="">Elige horario</option>');
					    }
					});


					function cargarCursosPorSedePeriodo(sedeId, periodoId) {
					  $.ajax({
					    url:
					      `${HOST_EDUCACION}/webEducacion/cursos?sede=` +
					      sedeId +
					      "&periodo=" +
					      periodoId,
					    dataType: "json",
					    headers: headerParam,
					    contentType: "application/json; charset=utf-8",
					    method: "GET",
					    success: function (result) {
					      if (result.length > 0) {
					        $("#selectCursos").append('<option value="">Elige curso</option>');
					        $("#selectHorario").append('<option value="">Elige horario</option>');
					        $.each(result, function (key, value) {
					          $("#selectCursos").append(
					            '<option value="' + value.id + '">' + value.nombre + "</option>"
					          );
					        });
					      } else {
					        $("#selectCursos").append(
					          '<option value="">No hay cursos disponibles</option>'
					        );
					        $("#selectHorario").append(
					          '<option value="">No hay horarios disponibles</option>'
					        );
					      }
					    },
					  });
					}


					function cargaProgramacionPorCursoSede(cursoId, sedeId, periodoId) {
					  $.ajax({
					    url: `${HOST_EDUCACION}/webEducacion/programaciones?curso=${cursoId}&sede=${sedeId}&periodo=${periodoId}`,
					    dataType: "json",
					    headers: headerParam,
					    contentType: "application/json; charset=utf-8",
					    method: "GET",
					    success: function (result) {
					      if (result.length > 0) {
					        $("#selectHorario").append('<option value="">Elige horario</option>');
					        $.each(result, function (key, value) {
					          $("#selectHorario").append(
					            `<option value="${value.id}" data-prog="${value.nombre}" data-precio="${value?.precio}" data-docente="${value.docente}">${value.nombre} ${value.docente}</option>`
					          );
					        });
					      } else {
					        $("#selectHorario").append(
					          '<option value="">No hay horarios disponibles</option>'
					        );
					      }
					    },
					  });
					}



					$("#btnAgregar").click(function () {
				        let curso = $("#selectCursos").val()
				        let sede = $("#selectSedes").val()
				        let programacion = $("#selectHorario").val()
				        let periodo = $("#selectPeriodos").val()
				        if (curso && sede && programacion && periodo) {

				            //Validar se ha agregado ya un curso al carrito
				            let existeHorario = false
							let existeSede = false
				            for (let i = 0; i < cursosSeleccionados.length; i++) {
				                let cursoArr = cursosSeleccionados[i]
				                if (cursoArr.sedeId !== sede) {
				                    existeSede = true
				                    break
				                }
								if(cursoArr.programacionId == programacion){
									existeHorario = true
									break
								}
				            }

				            if (existeHorario) {
				            	alert('Ya se ha agregado un curso con el mismo horario');
				            	/*
								Swal.fire({
								title: 'Aviso',
								text: 'Ya se ha agregado un curso con el mismo horario',
								icon: 'info',
								confirmButtonText: 'Aceptar'
								});
				                */
				                return;
				            }
							if (existeSede) {
								alert('No se puede elegir cursos de distintas sedes en el mismo proceso de inscripción');
								/*
								Swal.fire({
								title: 'Aviso',
								text: 'No se puede elegir cursos de distintas sedes en el mismo proceso de inscripción',
								icon: 'info',
								confirmButtonText: 'Aceptar'
								});
				                */
				                return;
				            }

				            let body = {
				                nombreCurso: $("#selectCursos option:selected").text(),
				                nombreSede: $("#selectSedes option:selected").text(),
				                nombreHorario: $("#selectHorario option:selected").attr("data-prog"),
				                nombrePeriodo: $("#selectPeriodos option:selected").text(),
								nombreDocente: $("#selectHorario option:selected").attr("data-docente"),
				                sedeId: sede,
				                cursoId: curso,
				                programacionId: programacion,
				                precio: (Math.round($("#selectHorario option:selected").attr("data-precio") * 100) / 100).toFixed(2)
				            }
				            cursosSeleccionados.push(body)

				            sessionStorage.setItem("cursosSeleccionados", JSON.stringify(cursosSeleccionados))

				            mostrarCursosSeleccionados();
				            
				        } else {
							alert("Debe seleccionar todos los campos")
						}
				        $("#cursosVal").val(JSON.stringify(cursosSeleccionados));
				    })

				    function mostrarCursosSeleccionados()
				    {
				    	console.log(1)
				    	console.log(cursosSeleccionados.length)
				    	if (cursosSeleccionados.length > 0) {
				    		console.log(11)
				                $("#tableCursos").children("tbody").empty()
				                let total_price = 0;
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
				        	console.log(12)
				        	$("#containerTableCursos").css("display", "none")
				        }
				    }


				    window.eliminarCurso = function(index){
						cursosSeleccionados.splice(index, 1)
						sessionStorage.setItem("cursosSeleccionados", JSON.stringify(cursosSeleccionados))
						
				        if (cursosSeleccionados.length > 0) {
				            $("#tableCursos").children("tbody").empty()
				            let total_price = 0;
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
				        } else {
				            $("#containerTableCursos").css("display", "none")
				        }
						$("#cursosVal").val(JSON.stringify(cursosSeleccionados));
					}

					console.log(123)


	 			})
 			})


			
		</script>

		<?php
              // Aquí se aplica el código interesante de tu Widget.
	}

	public function form( $instance ) {
		// Comprobar si hemos colocado un título al Widget. Si no, se colocará el título por defecto.
		if ( isset( $instance[ 'title' ] ) ) {
			$title = $instance[ 'title' ];
		} else {
			$title = '¡Busca tu pasión e inscríbete aquí!';
		}
		
		// Aquí se crea el formulario que aparecerá para poder cambiar el título.
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<?php
	}

	public function update( $new_instance, $old_instance ) {
		// Aquí se registran las variables que se facilitan en el back end.
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['counter'] = '0';
		return $instance;
	}
}