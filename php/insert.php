<!DOCTYPE html>
<html lang="en">
    <!-- meta information, title, external resources -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, width=device-width">
        <title>NationFact - Contact Us</title>
        <link rel="stylesheet" type=text/css href="../css/insertstyle.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins%3A400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter%3A400%2C500">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sen%3A700">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C500%2C700">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    </head>
    <body>
        <!-- menu section -->
        <div class="menu-container">
            <div class="menu">
                <div class="menu-table flex-row-space-between">
                  <div class="logo flex-row-center">
                    <a href="/index.html">
                        <img
                          id="icon"
                          src="../img/logo.png"
                          alt="website icon"
                        >
                    </a>
                  </div>
                  <a class="menu-button" tabindex="0" href="#">
                    <img src="../img/menu.png" alt="menu icon">
                  </a>
                  <div class="menu-items flex-row-center flex-item">
                    <a href="../html/countries.html">Countries</a>
                    <a href="#">Comparison</a>
                    <a href="../html/about.html">About</a>
                    <a href="../php/contactus.php">Contact Us</a>
                  </div>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br><br><br>
        <!-- php for connecting to and inserting user data into a database table -->
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "wdt-cw";
        
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        
        $query=$conn->prepare("INSERT INTO messages (first, last, email, message) VALUES (?,?,?,?)");
        
        $query->bindParam(1, $first);
        $query->bindParam(2, $last);
        $query->bindParam(3, $email);
        $query->bindParam(4, $message);
        
        $first=$_POST['first'];
        $last=$_POST['last'];
        $email=$_POST['email']; 
        $message=$_POST['message'];
        
        $query->execute();
        $conn = null;

        echo "<div class='content-container content flex-row2 text-medium'> Hi " . $_POST['first'] . " " . $_POST['last'] . ". Thank you for your message. <br> </div>";
        echo "<div class='content-container content flex-row2 text-medium'> We will contact you at " . $_POST['email'] . " soon. </div>";
        ?>

        <br><br><br><br><br>
        <!-- footer section -->
        <footer class="footer">
            <div class="content-container">
                <div class="content">
                    <div class="flex-row">
                        <div class="flex-item flex-item-stretch flex-column">
                            <p class="n2">
                                <a id="n1" href="/index.html">NationFact</a><br>
                                A useful website for people who want to learn about capital cities and the cost of living
                                 in different parts of the world. With NationFact, you can easily access information about
                                  various countries, including their capital cities, and compare the cost of living between different cities.
                            </p>
                            <div class="social">
                            <a href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a>
                            <a href="https://www.twitter.com/"><i class="fa fa-twitter"></i></a>
                            <a href="https://www.instagram.com/"><i class="fa fa-instagram"></i></a>
                            </div>
                        </div>
                        <div class="flex-item flex-item-stretch-4 flex-column">
                            <p class="n2">
                                <a id="n3">Useful Links</a><br><br>
                                    <a href="/index.html">Home</a><br>
                                    <a href="../html/countries.html">Countries</a><br>
                                    <a href="./html/comparison.html">Comparison</a><br>
                                    <a href="../html/about.html">About</a><br>
                                    <a href="../php/contactus.php">Contact Us</a><br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
    </body>
</html>                