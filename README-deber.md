Formulario y Paginación

Desarrollo: Implementé un formulario en React para crear posts (método POST) que incluye validación de campos y mensajes de confirmación. Además, optimicé el listado integrando paginación mediante los parámetros _page y _limit.

Aprendizaje Clave: Comprendí la importancia de gestionar los estados de la petición (cargando, éxito, error) y de validar los datos en el cliente antes de enviarlos para mejorar la experiencia de usuario (UX).

Manejo de CORS: Entendí que CORS es una restricción de seguridad del navegador.

En clase: No hubo bloqueos porque JSON Server habilita CORS por defecto.

En producción: Se soluciona configurando los headers en el backend (Access-Control-Allow-Origin) o usando un proxy en el entorno de desarrollo.

Nota: El proyecto requiere json-server corriendo en el puerto 3000.