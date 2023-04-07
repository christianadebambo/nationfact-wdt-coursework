<?php
$servername = "localhost";
$username = "id20569733_root";
$password=">}1/~{1!96\yAZSz";
$dbname="id20569733_wdt";
try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname",
$username,$password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo "Connected successfully <br />";
}
catch(PDOException $e)
{
echo "Connection failed: " . $e->getMessage();
}
$query=$conn->prepare("CREATE TABLE messages (id int(6) NOT NULL
auto_increment,first varchar(15) NOT NULL,last varchar(15) NOT
NULL,email varchar(30) NOT NULL,message varchar(30) NOT NULL,PRIMARY
KEY (id),UNIQUE id (id),KEY id_2 (id))");
$query->execute();
$conn = null;
?>