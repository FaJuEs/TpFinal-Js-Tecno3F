document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
  
    // Función para renderizar "Quiénes Somos"
    const renderQuienesSomos = () => {
      app.innerHTML = `
        <section id="quienes-somos" class="quienes-somos">
          <h1>¿Quiénes Somos?</h1>
          <p>
            En <strong>Seguros del Hogar 🏡</strong>, somos tu aliado confiable para proteger lo que más valoras: tu hogar.
          </p>
          <p>
            Nuestro objetivo es facilitar la toma de decisiones, brindándote herramientas precisas y accesibles para estimar costos.
          </p>
          <div class="center separador">
            <button id="irCotizador">Ir al Cotizador</button>
          </div>
        </section>
      `;
  
      document.getElementById("irCotizador").addEventListener("click", renderCotizador);
    };
  
    // Función para renderizar el Cotizador
    const renderCotizador = () => {
      app.innerHTML = `
        <h1 class="center separador">Asegurá tu Hogar 🏡</h1>
        <div class="cotizador">
          <h2 class="center separador">Completa los datos solicitados</h2>
          <label for="propiedad">Selecciona el tipo de propiedad:</label>
          <select id="propiedad"></select>
          <br><br>
          <label for="ubicacion">Selecciona la ubicación:</label>
          <select id="ubicacion"></select>
          <br><br>
          <label for="metros2">Ingresa los Metros cuadrados:</label>
          <input type="number" id="metros2" min="20" max="500" value="20">
          <div class="center separador">
            <button id="cotizar">Cotizar</button>
          </div>
          <div class="center separador">
            <p class="importe">Precio estimado: $<span id="valorPoliza">0</span></p>
          </div>
          <div class="center separador">
            <button id="guardarHistorial">Guardar Cotización 💾</button>
            <button id="verHistorial">Ver Historial 📋</button>
            <button id="verContacto">Contacto 📝</button>
          </div>
          <div class="center separador">
            <button id="volverHome">Volver a Inicio</button>
          </div>
        </div>
      `;
  
      cargarDatos("propiedades", "propiedad");
      cargarDatos("ubicaciones", "ubicacion");
  
      document.getElementById("cotizar").addEventListener("click", cotizar);
      document.getElementById("guardarHistorial").addEventListener("click", guardarHistorialCotizacion);
      document.getElementById("verHistorial").addEventListener("click", renderHistorial);
      document.getElementById("verContacto").addEventListener("click", renderContacto);
      document.getElementById("volverHome").addEventListener("click", renderQuienesSomos);
    };
  
    // Función para cargar opciones de propiedades y ubicaciones desde una API
    const cargarDatos = (endpoint, elementoId) => {
      fetch(`https://653831aaa543859d1bb14d53.mockapi.io/${endpoint}`)
        .then(res => res.json())
        .then(data => {
          const select = document.getElementById(elementoId);
          data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.tipo;
            select.appendChild(option);
          });
        })
        .catch(err => alert("Error al cargar datos"));
    };
  
    // Función para cotizar el precio estimado
    const cotizar = () => {
      const propiedad = document.getElementById("propiedad").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const metros2 = document.getElementById("metros2").value;
  
      if (propiedad && ubicacion && metros2 >= 20 && metros2 <= 500) {
        const costoM2 = 35.9;
        const cotizacion = (costoM2 * metros2).toFixed(2);
        document.getElementById("valorPoliza").textContent = cotizacion;
      } else {
        alert("Por favor, completa todos los campos correctamente.");
      }
    };
  
    // Función para guardar el historial de cotizaciones
    const guardarHistorialCotizacion = () => {
      const propiedad = document.getElementById("propiedad").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const metros2 = document.getElementById("metros2").value;
      const poliza = document.getElementById("valorPoliza").textContent;
  
      if (propiedad && ubicacion && metros2 >= 20 && metros2 <= 500) {
        const cotizacion = { propiedad, ubicacion, metros2, poliza, fechaCotizacion: new Date().toLocaleString() };
        const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
        historial.push(cotizacion);
        localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
        alert("Cotización guardada en el historial.");
      } else {
        alert("Por favor, completa todos los campos correctamente.");
      }
    };
  
    // Función para renderizar el historial de cotizaciones
    const renderHistorial = () => {
      app.innerHTML = `
        <h1 class="center separador">Historial de Cotizaciones</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          <tbody id="tablaHistorial"></tbody>
        </table>
        <div class="center separador">
          <button id="limpiarHistorial">Limpiar Historial</button>
          <button id="volverCotizador">Volver al Cotizador</button>
        </div>
      `;
  
      const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
      const tabla = document.getElementById("tablaHistorial");
  
      historial.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.fechaCotizacion}</td>
          <td>${item.propiedad}</td>
          <td>${item.ubicacion}</td>
          <td>${item.metros2}</td>
          <td>${item.poliza}</td>
        `;
        tabla.appendChild(row);
      });
  
      // Limpiar historial
      document.getElementById("limpiarHistorial").addEventListener("click", () => {
        localStorage.removeItem("historialCotizaciones");
        alert("Historial limpiado correctamente.");
        renderHistorial(); // Refrescar la vista después de limpiar
      });
  
      document.getElementById("volverCotizador").addEventListener("click", renderCotizador);
    };
  
    // Función para renderizar el formulario de contacto con validación
    const renderContacto = () => {
      app.innerHTML = `
        <h1>Formulario de Contacto</h1>
        <form id="contactForm">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" required>
          <br><br>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" required>
          <br><br>
          <label for="telefono">Número de teléfono:</label>
          <input type="tel" id="telefono" pattern="\\+?[0-9]{1,4}?[-.\\s]?[0-9]+[-.\\s]?[0-9]+[-.\\s]?[0-9]+" required>
          <br><br>
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" required></textarea>
          <br><br>
          <div class="center separador">
            <button type="submit">Enviar</button>
          </div>
        </form>
        <div class="center separador">
          <button id="volverCotizador">Volver al Cotizador</button>
        </div>
      `;
  
      // Validar el formulario de contacto
      document.getElementById("contactForm").addEventListener("submit", (event) => {
        event.preventDefault();
  
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const mensaje = document.getElementById("mensaje").value;
  
        let valid = true;
  
        // Validar Nombre
        if (nombre.trim() === "") {
          alert("El nombre es obligatorio.");
          valid = false;
        }
  
        // Validar Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          alert("Por favor, ingresa un correo electrónico válido.");
          valid = false;
        }
  
        // Validar Teléfono
        const telefonoRegex = /^\+?[0-9]{1,4}?[-.\\s]?[0-9]+[-.\\s]?[0-9]+[-.\\s]?[0-9]+$/;
        if (!telefonoRegex.test(telefono)) {
          alert("Por favor, ingresa un número de teléfono válido.");
          valid = false;
        }
  
        // Validar Mensaje
        if (mensaje.trim() === "") {
          alert("El mensaje no puede estar vacío.");
          valid = false;
        }
  
        if (valid) {
          alert("Formulario enviado correctamente.");
          // Aquí podrías agregar el código para enviar el formulario con fetch o cualquier otra acción.
        }
      });
  
      document.getElementById("volverCotizador").addEventListener("click", renderCotizador);
    };
  
    // Iniciar con la pantalla de "Quiénes Somos"
    renderQuienesSomos();
  });
  