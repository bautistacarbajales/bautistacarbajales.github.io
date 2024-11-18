<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lazarillo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <link rel="shortcut icon" href="bin/LazarilloIconBlack.png"/>
    <!--For embed Google icon code-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=contrast" />
  </head>

  <body>

    <button id="theme-toggle" class="theme-toggle">
      <span class="material-symbols-outlined button-toggle-mode" alt="Toggle Theme" height="30px" width="30px">
        contrast
      </span>
    </button>

    <!--Titulo,Filtros y Buscador-->
    <section class="header">
      <div class="title-header">
        <a href="">
          <img id="theme-icon" src="bin/LazarilloIconWhite.png" class="rounded" alt="Lazarillo" height="100px" width="100px" />
        </a>
        <div class="title-divider">
          <h3>Soluciones</h3>
          <small>Conectamos con lo que no ves</small>
        </div>

        
      </div>
      

      
        

    
<br>
      <div>
        <div class="btn btn-info"><a href="index.html">Volver</a></div>
        <form action="" method="POST">

            <label for="">Ingresa el nombre de la agrupaciones</label>
            <input type="text" name="nombre">

            
            <button type="submit" name="enviar">Enviar</button>
        </form>
      </div>

  <?php
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $baseDeDatos = "lazarillo";
    $enlace = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);
    if(isset($_POST['enviar'])){
      $nombre = $_POST ['nombre'];
  
      $insertarDatos = "INSERT INTO listadoagrupaciones VALUES('', '$nombre')";
      $ejecutarInsertar = mysqli_query ($enlace, $insertarDatos);
    }
  ?>
    </section>
</body>
</html>