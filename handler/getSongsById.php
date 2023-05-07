<?php
    require  "../model/song.php";

    session_start();
    $host = "localhost";
    $db = "playlist";
    $username = "root";
    $password = "";
    try{
    $conn = new mysqli($host, $username, $password, $db);
        
        if ($conn->connect_errno) {
            exit("Konekcija neuspesna: " . $conn->connect_errno);
        }

        $userID = $_GET["userID"];

        $res = song::getByUserId($userID, $conn);

        while($data = $res->fetch_assoc()){
            echo json_encode($data['id']."|".$data['name']."|");
        }

        
    } catch(Exception $e){
        echo $e->getMessage() . "<br/>";
            while($e = $e->getPrevious()) {
                echo 'Previous exception: '.$e->getMessage() . "<br/>";
            }
    }
?>