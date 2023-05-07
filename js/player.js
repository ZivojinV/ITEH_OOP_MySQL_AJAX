window.onload = function getSongsById(){
    console.log(localStorage.getItem("id"));
    $.ajax({
        url: 'handler/getSongsById.php',
        type: 'get',
        data: { 
            "userID": localStorage.getItem("id"),
        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id"));
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
            let j=0;
            let arr = [];
            arr=response.split("\"\"");
            for(let k = 0;k<arr.length;k++ ){
                arr[k]=arr[k].replaceAll('\"', '');
            }
            html = "";
            for (let i = 0; i < arr.length; i++) {
                let id = arr[i].split("|")[0];
                let u = arr[i].split("|")[1];
                let p = arr[i].split("|")[2];
                insertRow(id, u);
            }
            
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
}

function saveSong(){
    $.ajax({
        url: 'handler/addSong.php',
        type: 'post',
        data: {
            "userID": localStorage.getItem("id"),
            "name": document.getElementById("name").value
        },
        success: function(response){
            alert("Sacuvano" + response);

        },
        error: function(xhr){
            alert("GRESKA" + xhr);
        }
     });
}


function deleteSong(id){
    $.ajax({
        url: 'handler/deleteSong.php',
        type: 'post',
        data: { 
            "id": id
        },
        success: function(response){
            alert("Sacuvano" + response);

        },
        error: function(xhr){
            alert("GRESKA" + xhr);
        }
     });
}

function insertRow(id, name){
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    // var cell4 = row.insertCell(3);
    cell1.innerHTML = id;
    cell2.innerHTML = name;
    cell3.innerHTML = '<button class="btn-inv" onClick="deleteSong('+id+')">Delete</button>';
 }

 function search(){
    let id = "";
    let name = "";
    const table = document.getElementById('myTable');
    if (table) {
        while (table.rows.length > 1) {
        table.deleteRow(1);
        }
    }
    $.ajax({
        url: 'handler/getSongByName.php',
        type: 'get',
        data: { 
            "id": localStorage.getItem("id"),
            "name": document.getElementById("name").value,
        },
        success: function(response){
            if(response == "") {
                console.log(localStorage.getItem("id"));
                return 'a';
            }
            console.log(localStorage.getItem("id")+"fd")
            let j=0;
            let arr = [];
            arr=response.split("\"\"");
            for(let k = 0;k<arr.length;k++ ){
                arr[k]=arr[k].replaceAll('\"', '');
            }
            for (let i = 0; i < arr.length; i++) {
                id = arr[i].split("|")[0];
                name = arr[i].split("|")[1];
                console.log(id + name);
                insertRow(id, name);
            }
            
            
        },
        error: function(xhr){
            alert("GRESKA" + xhr.status);
        }
     });
     
 }