# FILMS

Ejemplo de API de películas, géneros, reviews y usuarios (profile)

Practicamos con diferentes tablas relacionales

## Tablas relacionales

películas <-- n:n --> géneros

[películas <-- n:n --> usuarios]
películas -- 1:n --> reviews

usuarios -- 1:n --> reviews

usuarios -- 1:1 -- profile

## EndPoints

[GET]/api/películas
[GET]/api/películas/:id
[POST]/api/películas [Admin,Editor]
<!-- Solo lo podrá hacer el administrador/s de la API (no es muy lógico que el usuario pueda crearlas, modificarlas o borrarlas)-->
[PATCH]/api/películas/:id [Admin,Editor]
[DELETE]/api/películas/:id [Admin,Editor]


[POST]/api/auth/registro <!-- Creación que hace el propio usuario de su usuario --> 
<!-- Es importante entender que la diferencia entre el GET y el POST es que el POST tiene BODY.
Un POST no deja de ser un GET pero los datos (algunos sensibles) al estar contenidos en el cuerpo no estarán a la vista de todos en una query que por ejemplo hagamos en la propia url --> 
[POST]/api/user/login
[GET]/api/user/:id
[PATCH]/api/user/:id
[DELETE]/api/user/login[Owner,Admin]

[GET]/api/reviews [User]
[GET]/api/reviews/:id [User]
[POST]/api/reviews/:id [User]
[PATCH]/api/reviews/:id [Owner,Admin]
[DELETE]/api/reviews/:id [Owner,Admin]

