  
/** VARIABLES **/
var $$ = Dom7;
var email="";
var contrasenia="";
var localstorage = window.localStorage;
var nombre="";
var apellido="";
var nick ="";
var descripcion="";
var foto_src="";
var db;
var usuariosRef;
var userdata="";
 var timestamp;
var persona = {
    "email": "" ,
    "contrasenia": "",
    };
var personaAGuardar;
var personaGuardada;
var tienePerfil;
var palabraClave="";
var tituloPublicacion ="";
var descripcionPublicacion="";
var tituloAMostrar="";
var tituloAux="";
var result = "";
var urlFotoPerfil="";
var fotodeperfil;
var idDePublicacion;
var separador= " ";
var reemplazo=/,/g;
var contenedorImg;
 var categoriaPublicacion= "";
 var descPublicacion= "";
 var correo= "";
 var nombreUser= "";
 var linkPagina= "";
 var tel= "";
 var fecha="";
 var foto1="";
 var foto2="";
 var estaGuardado=false;
 var encabezado="";
 var arrayFav="";
 var i;
 var idfav;
 var fav;
 var clave="";







var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
      swipe: true,
    },
    smartSelect: {
    openIn: 'popup',
    closeOnSelect: true,
  },

    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/ayuda/',
        url: 'ayuda.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
        {
        path: '/resultados/',
        url: 'resultados.html',
      },
      {
        path: '/publicacion/',
        url: 'publicacion.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');





// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");







/** BUSCA EN LOCAL STORAGE SI HAY DATOS PARA INICIO DE SESION AUTOMÁTICO 
personaGuardada = localstorage.getItem("persona");
personaGuardada = JSON.parse(personaGuardada);
 if (personaGuardada != null) {
  email = personaGuardada.email;
  contrasenia = personaGuardada.contrasenia;
  login(email,contrasenia);
 };**/





});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
    db = firebase.firestore();
    $$(".lupa").on('click', function (){

    palabraClave = $$(".buscar").val();
    palabraAux= palabraClave.toLowerCase();
    encabezado="Resultados";
    buscar('titulo','array-contains',palabraAux);



});
  $$(".favorito").on('click', function () {
    if (estaGuardado==false) {
      if (tienePerfil==true){
      guardarFavorito()
    }else{
      app.dialog.confirm('Completa tu perfil', 'Para poder acceder a esta función', function () {

  app.popup.open(".my-popup3");
  habilitarInputs();
  });
    }
    };
  })

  $$("#registrar").on('click', registro);




    


 
  

});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
     clave = email;
buscarEnBase();

$$("#maildeusuario").text(email);
$$("#guardardatosusuario").on('click', guardarDatosUsuario);

$$("#guardardatospublicacion").on('click', guardarDatosPublicacion);
$$("#editar").on('click', function(){
  $$(".item-title").removeClass('deshabilitado');
  $$("#abrirGaleria").show();
  habilitarInputs()
});
$$("#logout").on('click', cerrarSesion);
$$('#abrirGaleria').on('click', function(){
  contenedorImg= 'mifoto';
  selImage();

});

$$('.crearpublicacion').on('click', chequearPerfil);
$$('.my-popup3').on('popup:open', function (e) {
  $$(".input").attr('disabled', 'true');
});

$$(".icono").on('click', function(){
  encabezado="Resultados"
palabraClave=$$(this).text();
buscar('categoria','==', palabraClave);
});
$$('#abrirGaleria1').on('click', function(){
  contenedorImg= 'foto1';
  selImage();
});
$$('#abrirGaleria2').on('click', function(){
  contenedorImg= 'foto2';
  selImage();
});
$$("#verFavoritas").on('click', function() {
encabezado="Favoritas";
fav = true;
verFavYMis();
});
$$("#verMias").on('click', function() {
encabezado="Mis publicaciones";
fav = false;
verFavYMis();
})
$$("#mifoto").on('click', function (){
  var foto= $$("#mifoto").attr('src');
  var myPhotoBrowserDark = app.photoBrowser.create({
    popupCloseLinkText: 'X',

    photos : [
        foto,
    ],
    theme: 'dark'
});
  myPhotoBrowserDark.open();
});
$$("#perfil").on('click', function(){
  clave= email;
app.popup.open(".my-popup3");
});





});

$$(document).on('page:init','.page[data-name="resultados"]', function (e) {
    // Do something here when page loaded and initialized
    console.log('page init resultados');
$$('#resultados').on('click', '.verMas', function(){
   idDePublicacion=$$(this).attr('id');
   verPublicacion(idDePublicacion);
});
 $$("#resultit").text(encabezado);
 $$('#resultados').on('click', '.eliminar', function(){
   idDePublicacion=$$(this).val();
   if (encabezado=='Favoritas'){
  eliminarDeLista(idDePublicacion);
}else{
  eliminarDeBase(idDePublicacion);
}
});
 $$(".fotos").on('click', fotoBrowser);
 $$("#nombreuser").on('click', function(){
  clave = $$("#nombreuser").attr('href');
  buscarEnBase();
 app.popup.open(".my-popup3");
 });
 $$("#reportar").on('click',function(){
      if (tienePerfil==true){
      reportar()
    }else{
      app.dialog.confirm('Completa tu perfil', 'Para poder acceder a esta función', function () {

  app.popup.open(".my-popup3");
  habilitarInputs();
  });
    }
});





});








/** FUNCIONES PROPIAS **/


/** REGISTRO DE USUARIO **/
function registro () {
    email= $$("#emailregistro").val();
    contrasenia= $$("#contraseniaregistro").val();
    var huboError = 0;

    firebase.auth().createUserWithEmailAndPassword(email, contrasenia)          
      .catch(function(error) {       
        // Handle Errors here.
        huboError = 1;
        var errorCode;
        errorCode = error.code;
        var errorMessage = error.message; 
        if (errorCode=="auth/email-already-in-use"){
        app.dialog.create({
        title: 'Error',
        text: 'El email ya se encuentra registrado',
        buttons: [{
        text: 'Ok',
    }
    ],
  }).open();
        }else {
        app.dialog.create({
    title: 'Error',
    text: 'Usuario o contraseña no válidos, intente nuevamente',
    buttons: [{
    text: 'Ok',
    }
    ],
  }).open();
      };
      })

      .then(function(){
          if(huboError == 0){
            app.popup.close(".my-popup");
            app.popup.open(".popup-bienvenida");
            mainView.router.navigate("/about/");
            persona = {
            email: email ,
            contrasenia: contrasenia,
            };
            personaAGuardar = JSON.stringify(persona);
            localstorage.setItem("persona", personaAGuardar);
          }
      });
};



/** LOGIN DE USUARIO **/
/**function login (email, contrasenia) {
    var huboError = 0;

    firebase.auth().signInWithEmailAndPassword(email, contrasenia)
          .catch(function(error) {       
        // Handle Errors here.
        huboError = 1;
        var errorCode = error.code;
        var errorMessage = error.message; 
          app.dialog.create({
    title: 'Error',
    text: 'Usuario o contraseña no válidos',
    buttons: [{
    text: 'Ok',
    }
    ],
  }).open();
      })
      .then(function(){
          if(huboError == 0){
            persona = {
            email: email ,
            contrasenia: contrasenia,
            };
            personaAGuardar = JSON.stringify(persona);
            localstorage.setItem("persona", personaAGuardar);
            mainView.router.navigate("/about/");
          }
      });
};**/



/** GUARDAR DATOS DE PERFIL EN LA BASE DE DATOS **/
function guardarDatosUsuario() {

console.log('entra a a guardar');
nombre = $$("#nombreregistro").val();
apellido = $$("#apellidoregistro").val();
nick = $$("#nick").val();
descripcion = $$("#descripcionusuario").val();
if (urlFotoPerfil == "") {
  urlFotoPerfil = $$("#mifoto").attr('src');
};



var datos = {
  nombre: nombre,
  apellido: apellido,
  nick: nick,
  descripcion: descripcion,
  fotodeperfil: urlFotoPerfil,

}
db.collection("usuarios").doc(email).set(datos);
app.popup.close(".my-popup3");
tienePerfil= true;

};


/** BUSCAR EN LA BASE DE DATOS LOS DATOS DEL PERFIL **/
function buscarEnBase () {

usuariosRef = db.collection("usuarios").doc(clave);
usuariosRef.get().then(function(doc) {
    if (doc.exists) {
      $$(".item-title").addClass("deshabilitado");
        if (clave != email) {
          $$("#editar").hide();
          $$("#guardardatosusuario").hide();
        };
        nombre = doc.data().nombre;
        apellido = doc.data().apellido;
        nick = doc.data().nick;
        descripcion = doc.data().descripcion;
        fotodeperfil = doc.data().fotodeperfil;
 
        $$("#nombreregistro").val(nombre);
        $$("#apellidoregistro").val(apellido);
        $$("#nick").val(nick);
        $$("#descripcionusuario").val(descripcion);
        $$("#mifoto").attr('src', fotodeperfil);
        $$("#abrirGaleria").hide();
        tienePerfil=true;

       
    

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        tienePerfil= false;
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

};


/** HABILITAR INPUTS DEL FORM PARA EDITAR **/
function habilitarInputs () {
  $$(".input").removeAttr('disabled');
};


/** LOG OUT**/
function cerrarSesion () {
  localStorage.clear();
  app.panel.close(".panel-left");
  mainView.router.navigate("/index/");
 // $$("#emaillogin").val("");
//$$("#contrasenialogin").val("");
email="";
contrasenia="";
};

/** SELECIONAR IMAGEN DESDE LA GALERÍA **/
function selImage() {     
  navigator.camera.getPicture(onSuccess,onError,
  {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  });
};


function onSuccess(imageData) {
app.preloader.show();
idRandom();
 nombreImagen = result + '.jpg';
direccionImagen = 'images/' + nombreImagen;
 var storageRef = firebase.storage().ref();

  var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test.jpg'));
        });
    };


getFileObject(imageData, function(fileObject) {
var uploadTask = storageRef.child(direccionImagen).put(fileObject);
console.log('en getFileObject');
uploadTask.on('state_changed', function(snapshot) {
console.log('state_changed');
console.log(snapshot);
}, function(error) {
console.log(error);
}, function() {

     storageRef.child(direccionImagen).getDownloadURL().then(function(url) {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();

          // Or inserted into an <img> element:
          var img = document.getElementById(contenedorImg);
          img.src = url;
         app.preloader.hide();
          urlFotoPerfil = url;
        }).catch(function(error) {
          // Handle any errors
        });

            });
        });
};




 function onError() {
        console.log("error camara");
};















/** GUARDAR DATOS DE PUBLICACION EN LA BASE DE DATOS **/
function guardarDatosPublicacion () {
var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth(); 
var year = currentDate.getFullYear();
var dateString = date + "-" +(month + 1) + "-" + year;

 timestamp = Date.now();
 var id = timestamp.toString();
 var categoria = $$("#categoria").val();
 var titulo = $$("#titulo").val();
 var descripcionpublicacion = $$("#descripcionpublicacion").val();
 var tel = $$("#telefonocontacto").val();
 var mailcontacto = $$("#emailcontacto").val();
 var url = $$("#urlcontacto").val();
 separador=" ";
 var tituloAux=titulo.toLowerCase();
 var tituloArray= tituloAux.split(separador);
 var fotoprincipal= $$("#foto1").attr('src');
var fotosecundaria=$$("#foto2").attr('src');

 var datos = {
  categoria: categoria,
  titulo: tituloArray,
  descripcion: descripcionpublicacion,
  tel: tel,
  mail: mailcontacto,
  url: url,
  nick: nick,
  mailusuario: email,
  fecha: dateString,
  fotoprincipal: fotoprincipal,
  fotosecundaria: fotosecundaria,

  
};
db.collection("publicaciones").doc(id).set(datos);

app.toast.open();


app.popup.close(".my-popup2");
  $$("#categoria").val("");
  $$("#titulo").val("");
  $$("#descripcionpublicacion").val("");
  $$("#telefonocontacto").val("");
 $$("#emailcontacto").val("");
$$("#urlcontacto").val("");
$$("#foto1").attr('src', "");
$$("#foto2").attr('src', "");
guardarMiPublicación(id);
};


/** CHEQUEAR SI EL USUARIO TIENE COMPLETADO SU PERFIL **/
function chequearPerfil() {
if (tienePerfil == false) {
app.dialog.confirm('Completa tu perfil', 'Para poder acceder a esta función', function () {

  app.popup.open(".my-popup3");
  habilitarInputs();
  });
    
}else{
  app.popup.open(".my-popup2");
}
};


function buscar (condicion, operador, palabraClave) {


 mainView.router.navigate("/resultados/");
var publicacionesRef = db.collection("publicaciones");
publicacionesRef.where(condicion, operador , palabraClave).get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
 
var id= doc.id;
tituloPublicacion = doc.data().titulo.toString();
tituloAMostrar = tituloPublicacion.replace(reemplazo, separador);
tituloAux= tituloAMostrar[0].toUpperCase() + tituloAMostrar.slice(1);


descripcionPublicacion = doc.data().descripcion;
var foto = doc.data().fotoprincipal;
var row = '<div class="row resultado"><div class="col-45"><img class="thumbnail" src='+foto+'></div><div class="col-55"><div class="row"><h3 class="tituloresultado">'+tituloAux+'</h3></div><div class="row"><p class="desc">'+descripcionPublicacion+'</p></div><div class="row"></div></div><button class="verMas" id="'+id+'">Ver</button></div>';
$$("#resultados").append(row);


});
})
.catch(function(error) {
alert('error');
console.log("Error: " , error);

});
    //aca pasa a otra pagina donde se muestran los resultados de la busqueda
   


  


};

function idRandom(){
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var caracteresLength = caracteres.length;
  for(var i = 0; i < 25; i++){
    result += caracteres.charAt(Math.floor(Math.random() * caracteresLength ));

  }
  return result;
  };


function verPublicacion (idDePublicacion) {

publicacionesRef = db.collection("publicaciones").doc(idDePublicacion);
publicacionesRef.get().then(function(doc){
    if (doc.exists) {

tituloPublicacion = doc.data().titulo.toString();
tituloAMostrar = tituloPublicacion.replace(reemplazo, separador);
tituloAux= tituloAMostrar[0].toUpperCase() + tituloAMostrar.slice(1);
estaGuardado=false;


 var usuario = doc.data().mailusuario;
 categoriaPublicacion= doc.data().categoria;
 descPublicacion= doc.data().descripcion;
 correo= doc.data().mail;
  nombreUser= doc.data().nick;
  linkPagina= doc.data().url;
 tel= doc.data().tel;
  fecha=doc.data().fecha;
  foto1=doc.data().fotoprincipal;
  foto2=doc.data().fotosecundaria;
 $$("#nombrepublicacion").text(tituloAux);
 $$("#nombrecategoria").text(categoriaPublicacion);
 $$("#descpublicacion").text(descPublicacion);
 $$("#fechapublicacion").text(fecha);
 $$("#img1").attr('src', foto1);
 $$("#img2").attr('src', foto2);
 $$("#tel").text(tel);
$$("#tel").attr('href', 'tel: +54'+tel);
 $$("#correocontacto").text(correo);
 $$("#linkpagina").text(linkPagina);
 $$("#nombreuser").text(nombreUser);
 $$("#nombreuser").attr('href', usuario);
 $$("#estrella").attr('src', 'img/es_v.png');
 $$("#guardarfav").text('Guardar');

 db.collection("usuarios").doc(email).get().then(function(doc){
  if (doc.exists){
    var arrayFav = doc.data().favoritos;

    for (i=0; i<=arrayFav.length; i++) {
      if (idDePublicacion == arrayFav[i] ) {
        $$("#estrella").attr('src', 'img/es_l.png');
        $$("#guardarfav").text('Guardado');
        estaGuardado=true;
      };
    }
    
    } else {
        // doc.data() will be undefined in this case
        console.log("No esta en favoritos");
        
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
}
}).catch(function(error) {
    console.log("Error getting document:", error);
});

app.popup.open(".my-popup4");

};

function guardarFavorito() {
 
  $$("#estrella").attr('src', 'img/es_l.png');
 

  var favoritos= idDePublicacion;
  
   db.collection("usuarios").doc(email).get()
  .then(function(doc) {
    if (doc.exists) {
      db.collection("usuarios").doc(email).update({
      favoritos: firebase.firestore.FieldValue.arrayUnion(favoritos)
      });
      $$("#guardarfav").text('Guardado');
      console.log("Nuevo ingreso creado");

    } 
  }).catch(function(error) {
    console.log("Error:", error);
  });


 

};







function verFavYMis() {
  db.collection("usuarios").doc(email).get().then(function(doc){
  if (doc.exists){
    if (fav==true) {
    arrayFav = doc.data().favoritos;
    }else {
      arrayFav = doc.data().mispublicaciones;
    };
    if (arrayFav != "") {
for (i=0; i<arrayFav.length; i++) {
  console.log(arrayFav[i]);
 db.collection("publicaciones").doc(arrayFav[i]).get().then(function(doc){

var id= doc.id;
tituloPublicacion = doc.data().titulo.toString();
tituloAMostrar = tituloPublicacion.replace(reemplazo, separador);
tituloAux= tituloAMostrar[0].toUpperCase() + tituloAMostrar.slice(1);
descripcionPublicacion = doc.data().descripcion;
var foto = doc.data().fotoprincipal;
var row = '<div class="row row2"><button class="eliminar" value="'+id+'">Eliminar</button></div><div class="row resultado"><div class="col-45"><img class="thumbnail" src='+foto+'></div><div class="col-55"><div class="row"><h3 class="tituloresultado">'+tituloAux+'</h3></div><div class="row"><p class="desc">'+descripcionPublicacion+'</p></div><div class="row"></div></div><button class="verMas" id="'+id+'">Ver</button></div>';
$$("#resultados").append(row);

 }).catch(function(error) {
    console.log("Error getting document:", error);
    });
};

};


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!2");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
app.preloader.hide();
app.panel.close(".panel-left");
mainView.router.navigate("/resultados/");

};


function guardarMiPublicación(id) {

  var miPublicacion= id;
  
   db.collection("usuarios").doc(email).get()
  .then(function(doc) {
    if (doc.exists) {
      db.collection("usuarios").doc(email).update({
      mispublicaciones: firebase.firestore.FieldValue.arrayUnion(miPublicacion)
      });

    } 
  }).catch(function(error) {
    console.log("Error:", error);
  });

};

function eliminarDeLista (id) {
app.preloader.show();
for (i=0; i<arrayFav.length; i++) {
  if (id == arrayFav[i]) {
    arrayFav.splice(i, 1);
  };
}
console.log(arrayFav);

db.collection("usuarios").doc(email).update
({ favoritos: arrayFav})
.then(function() {

console.log("actualizado ok");

})
.catch(function(error) {

console.log("Error: " + error);

});
$$("#resultados").empty();
arrayFav="";
verFavYMis();
};

function eliminarDeBase(id) {
  db.collection("publicaciones").doc(id).delete()
.then(function() {

console.log("Documento borrado!");

})
.catch(function(error) {

console.error("Error: ", error);

});
app.preloader.show();
for (i=0; i<arrayFav.length; i++) {
  if (id == arrayFav[i]) {
    arrayFav.splice(i, 1);
  };
};

db.collection("usuarios").doc(email).update
({ mispublicaciones: arrayFav})
.then(function() {

console.log("actualizado ok");

})
.catch(function(error) {

console.log("Error: " + error);

});
$$("#resultados").empty();
arrayFav="";
verFavYMis();
};


function fotoBrowser() {
  var foto1 = $$("#img1").attr('src');
  var foto2 = $$("#img2").attr('src');
  var myPhotoBrowserDark = app.photoBrowser.create({
    popupCloseLinkText: 'X',

    photos : [
        foto1,
        foto2,
        
    ],
    theme: 'dark'
});
  myPhotoBrowserDark.open();
};


function reportar () {

app.dialog.confirm('¿Creés que esta publicación infringe nuestras normas?', 'Mujeres Trabajando', function () {
    timestamp = Date.now();
 var id = timestamp.toString();

var datos = {
  id: idDePublicacion,
};
db.collection("reportadas").doc(id).set(datos);

  app.dialog.alert('Gracias, la publicación será enviada para su revisión', 'Mujeres Trabajando');
  });

};

function fnValidacionPalabra(palabra) {
  var out = '';
  var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';
  for (var i=0; i<palabra.length; i++)
    if (filtro.indexOf(palabra.charAt(i)) != -1) 
    out += palabra.charAt(i);
  return out;
};






