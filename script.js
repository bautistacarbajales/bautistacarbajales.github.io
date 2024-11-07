let tokenAccess = null; // Variable para almacenar el token de acceso
let menuData = [];

function establecerConexion() {
  const loginData = {
    email: "diegosebastianalbo@gmail.com",
    pass: "Mantenimiento2022",
    cod_cli: "14536",
  };

  fetch("https://api-mconn.maxisistemas.com.ar/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.resultCode === "SUCCESS") {
        console.log("Conexión establecida con éxito.");
        tokenAccess = data.content.tokenAccess; // Almacenar el token de acceso
      } else {
        console.log("Error en la autenticación");
        console.log(data.resultDescription);
      }
    })
    .catch((error) => {
      console.error("Error al conectarse con la API:", error);
    });
}

function obtenerDatosMenu() {
  if (!tokenAccess) {
    console.log("Primero debe establecer la conexión.");
    return;
  }

  fetch("https://api-mconn.maxisistemas.com.ar/menuweb/menuextendido", {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenAccess },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // Para inspeccionar la respuesta completa
      menuData = json.content; // Guardar los datos en la variable global
      renderizarTabla(menuData); // Renderizar la tabla inicialmente con todos los datos
    })
    .catch((err) => console.log(err));
}

function renderizarTabla(data) {
  let tableBody = document.getElementById("tabla-body");
  tableBody.innerHTML = ""; // Limpiar el contenido previo de la tabla

  data.forEach((rubro) => {
    if (rubro.subrubros && rubro.subrubros.length > 0) {
      rubro.subrubros.forEach((subrubro) => {
        if (subrubro.articulos && subrubro.articulos.length > 0) {
          subrubro.articulos.forEach((articulo) => {
            let row = document.createElement("tr");
            row.setAttribute("data-rubro", rubro.nombre); // Asignar el rubro como atributo de datos

            row.innerHTML = `
              <td>${articulo.id}</td>
              <td>${articulo.nombre}</td>
              <td>${articulo.precio}</td>
              <td id="venta-competencia-${articulo.id}">--</td>
              <td id="costo-${articulo.id}">---</td>
              <td id="porc-costo-${articulo.id}">--</td>
              <td id="porc-objetivo-${articulo.id}">--</td>
              <td id="porc-sugerido-${articulo.id}">--</td>
              <td><input type="number" placeholder="$ Manual" class="form-control"  id="precio-manual-${articulo.id}"></td>
              <td id="ventas-${articulo.id}">--</td>
              <td id="ganancia-${articulo.id}">--</td>
              <td id="lista-${articulo.id}">--</td>
              <td id="off-10-${articulo.id}">--</td>
              <td id="off-20-${articulo.id}">--</td>
              <td id="off-2x1-${articulo.id}">--</td>
            `;
            tableBody.appendChild(row);
          });
        }
      });
    }
  });
}


function obtenerDatosFacturacionPorFecha() {
  if (!tokenAccess) {
    console.log("Primero debe establecer la conexión.");
    return;
  }

  fetch("https://api-mconn.maxisistemas.com.ar/estadisticas/invoicebydate", {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenAccess },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // Para inspeccionar la respuesta completa
      const data = json.content; // Array de facturación por fecha
      let tableBody = document.getElementById("tabla-body");

      // Limpiar el contenido previo de la tabla
      tableBody.innerHTML = "";

      // Recorrer cada elemento de facturación
      data.forEach((factura) => {
        let row = document.createElement("tr");

        // Crear filas con los datos de facturación
        row.innerHTML = `
          <td>${factura.fecha}</td>
          <td>${factura.totalFacturado}</td>
          <td>${factura.numeroFacturas}</td>
          <td>${factura.promedioPorFactura}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => console.log(err));
}

function obtenerDatosPedidosMostrador() {
  if (!tokenAccess) {
    console.log("Primero debe establecer la conexión.");
    return;
  }

  fetch("https://api-mconn.maxisistemas.com.ar/mrestoutapi/pedidomostrador", {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenAccess },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // Para inspeccionar la respuesta completa
      const data = json.content; // Array de pedidos en mostrador
      let tableBody = document.getElementById("tabla-body");

      // Limpiar el contenido previo de la tabla
      tableBody.innerHTML = "";

      // Recorrer cada pedido
      data.forEach((pedido) => {
        let row = document.createElement("tr");

        // Crear filas con los datos de pedidos
        row.innerHTML = `
          <td>${pedido.idPedido}</td>
          <td>${pedido.nombreCliente}</td>
          <td>${pedido.totalPedido}</td>
          <td>${pedido.estado}</td>
          <td>${pedido.fechaPedido}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((err) => console.log(err));
}

function filtrarPorRubro(rubro) {
  if (rubro === "todos") {
    // Si el filtro es "todos", renderizar todos los datos
    renderizarTabla(menuData);
    return;
  }

  const filteredData = menuData.filter((r) => {
    if (r.nombre.includes(rubro)) return true;
    return r.subrubros.some((subrubro) => subrubro.nombre.includes(rubro));
  });

  renderizarTabla(filteredData);
}

//Only testing.

document.querySelector('.form-control[data-search]').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredData = menuData.filter(articulo => 
    articulo.nombre.toLowerCase().includes(searchTerm) ||
    articulo.id.toString().includes(searchTerm)
  );
  renderizarTabla(filteredData);
});