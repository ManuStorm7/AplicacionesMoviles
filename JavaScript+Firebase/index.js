var firebaseConfig = {
    apiKey: "AIzaSyD5MfLnqahFxLqo1Hug-my2FNNTPdMkt7Q",
    authDomain: "proyecto1-d9160.firebaseapp.com",
    databaseURL: "https://proyecto1-d9160-default-rtdb.firebaseio.com",
    projectId: "proyecto1-d9160",
    storageBucket: "proyecto1-d9160.appspot.com",
    messagingSenderId: "1087634744024",
    appId: "1:1087634744024:web:9a011aafffe7142338edad",
    measurementId: "G-JVGXJVC3S1"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var marca = document.getElementById("Input2").value;
    var modelo = document.getElementById("Input3").value;
    var color = document.getElementById("Input4").value;
    var año = document.getElementById("Input5").value;
    var cilindros = document.getElementById("Input6").value;
    var tipo = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var vehiculo = {
            id, //matricula:id
            marca,
            modelo,
            color,
            año,
            cilindros,
            tipo,
        }

        //console.log(vehiculo);

        firebase.database().ref('Vehiculos/' + id).update(vehiculo).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Vehiculos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(carro){
    
    if(carro!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = carro.id;
        cell2.innerHTML = carro.marca; 
        cell3.innerHTML = carro.modelo;
        cell4.innerHTML = carro.color;
        cell5.innerHTML = carro.marca; 
        cell6.innerHTML = carro.modelo;
        cell7.innerHTML = carro.color;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${carro.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+carro.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Vehiculos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Vehiculos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(carro){
    if(carro!=null)
    {
        document.getElementById("Input1").value=carro.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=carro.marca;
        document.getElementById("Input3").value=carro.modelo;
        document.getElementById("Input4").value=carro.color;
        document.getElementById("Input5").value=carro.año;
        document.getElementById("Input6").value=carro.cilindros;
        document.getElementById("Input7").value=carro.tipo;
    }
}


//Para consulta de color
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Vehiculos");
    ref.orderByChild("color").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(carro){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = carro.id;
    cell2.innerHTML = carro.marca; 
    cell3.innerHTML = carro.modelo;
    cell4.innerHTML = carro.color;
    cell5.innerHTML = carro.año; 
    cell6.innerHTML = carro.cilindros;
    cell7.innerHTML = carro.tipo;
   
}