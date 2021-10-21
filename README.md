<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames
 <p align='center'>Proyecto Individual creado para henry, en su desarrollo se utilizó javascript y las tecnologias NodeJs, React, Redux, Express, Sequelize, Postgres, CSS, sql, entre otras.</p><br>

![Landing-Page](https://user-images.githubusercontent.com/4484038/138369340-9efa99a2-1b89-4cc4-a961-3ef79836996b.png)
<p align='center'>☝<b>Landing Page</b></p></br>

![Home](https://user-images.githubusercontent.com/4484038/138369715-d2c9ba26-f13f-4432-b4d9-9ce04ba64fe7.png)
<p align='center'>☝<b>Home</b></p></br>

![Filtros](https://user-images.githubusercontent.com/4484038/138369755-030e03f4-6b61-40cf-843a-da46f306e6ad.png)
<p align='center'>☝<b>Filtros</b></p></br>

![Detalle](https://user-images.githubusercontent.com/4484038/138369919-ffd3ef4c-b7ba-4de0-94b2-f9c9d8963823.png)
<p align='center'>☝<b>Detalle</b></p></br>

![Create](https://user-images.githubusercontent.com/4484038/138369942-a8cf3f72-7f6b-453d-b05c-117e51da62eb.png)
<p align='center'>☝<b>Create</b></p></br>

## Objetivos del Proyecto

- App construida utlizando React, Redux, Node y Sequelize, esta se sirve de una api externa y muestra una galeria de juegos con sus respectivos detalles, se puede ingresar a cada uno y ver mas informacion, se pueden crear juegos propios(su informacion) y eliminar los mismos, se pueden filtrar por genero, por orden alfabetico, rating, juegos propios y de la api, tambien se puede buscar juegos a traves de la search bar. 
 
- Practicar el workflow de GIT.


#### Tecnologías Utilizadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Aplicación de React/Redux que contiene las siguientes pantallas/rutas.

__Pagina inicial__: contiene:
- [ ] Imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene:
- [ ] Input de búsqueda para encontrar videojuegos por nombre
- [ ] Área donde se ve el listado de videojuegos con:
  - Imagen
  - Nombre
  - Géneros
- [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.


__Ruta de detalle de videojuego__: 
- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

__Ruta de creación de videojuegos__: 
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuego

#### Base de datos

El modelo de la base de datos contiene las entidades (Aquellas propiedades marcadas con asterísco son obligatorias):

- [ ] Videojuego con las siguientes propiedades:
  - ID: * No puede ser un ID de un videojuego ya existente en la API rawg
  - Nombre *
  - Descripción *
  - Fecha de lanzamiento
  - Rating
  - Plataformas *
- [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos.


#### Backend

Servidor en Node/Express con las siguientes rutas:

__IMPORTANTE__: No se utilizan los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades son implementadas en el codigo.

- [ ] __GET /videogames__:
  - Obtiene un listado de los videojuegos
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego muestra un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Trae solo los datos pedidos en la ruta de detalle de videojuego
  - Incluye los géneros asociados
- [ ] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia trae desde rawg y los guarda en la base de datos y luego los utiliza desde allí
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos


