
**Tabla Endpoints**
|Id|Method|Path|Description
|--|--|--|--|
|1|get|/|Carga vista index si está logeado. Si no carga login|
|2|get|/login|Llegada al site. Si no estás logeado carga vista index.hbs|
|3|post|/login|Envía form login y carga redirect /|
|4|get|/signup|Carga vista signup.hbs|
|5|post|/signup|Envía form signup y redirect vista /|
|6|get|/logout|Redirect vista /login|
|7| get|/user/profile|Carga vista profile.hbs|
|8|get|/user/edit|Carga vista user-edit.hbs|
|9|post|/user/edit|Envía info del form a la db y carga vista profile.hbs|
|10|get|/user/addfriend|Carga la vista add-friends.hbs|
|11|post|/user/addfriends|Envía info del form a la db y carga vista profile.hbs|
|12|get|/event/new|Carga vista new-event.hbs|
|13|post|/event/new|Envía info del form a la dB y carga /|
|14|get|/event/details/:id(del evento)|Carga vista event-detail.hbs|
|15|get|/event/edit/:id (del evento)|Carga vista event.edit.hbs (solo si eres owner o admin)|
|16|post|/event/edit/:id (del evento)|Envía form edit-event y redirect /|
|17|put|api/edit/:id (del evento)|Update event con user sum y user rest|
|18|get|/ranking
|19|get|/sarao/show|Carga vista saraos.hbs|
|20|get|/sarao/new|Carga vista new-sarao.hbs|
|21|pos|/sarao/new|Envía form carga vista saraos.hbs|
|22|get|/sarao/edit/:id (del sarao)|Carga vista edit-sarao.hbs|
|23|post|/sarao/edit/:id|Envía form a db y redirect a saraos.hbs|

**Proceso hasta ahora.**
 - Definición de modelos
 - Definición del user journey
 - Estructura de vistas y rutas del servidor
 - CRUD básico de Users, Sarao y Events
 ---
 - Populación y desarrollo de interdependencias en DB
 - Implementar header
 - Botones de navegación
 - Asignación de roles de usuario y condicionar la navegación (wip)
 - Desarrollo de las vistas de eventos main y profile

**Pendientes.**
 
 - Desarrollo de CSS y ajustes de HTML
 - Implementación de API en avatares de usuarios
 - Javascript de cierre de eventos y asignaciones de karma
 - Y añadir muchas pijaditas cuquis y frikis si nos da tiempo
