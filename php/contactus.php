<!DOCTYPE html>
<html lang="en">
    <!-- meta information, title, external resources -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, width=device-width">
        <title>NationFact - Contact Us</title>
        <link rel="stylesheet" type=text/css href="../css/contactusstyle.css">
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
                    <a href="../html/index.html">
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
                    <a href="../html/comparison.html">Comparison</a>
                    <a href="../html/about.html">About</a>
                    <a href="../php/contactus.php">Contact Us</a>
                  </div>
                </div>
            </div>
        </div>
        <!-- main section -->
        <div class="content-container">
            <div class="content">
                <div class="flex-row2">
                    <p class="text-large">Contact Us</p>
                </div>
                <div class="flex-row2">
                    <!-- contact form that allows for text/textarea input & submit -->
                    <form action="../php/insert.php" method="post" name="contactform" onsubmit="return validateContactForm()">
                        <div class="text-small">
                            <label for="first">First Name:</label>
                            <input type="text" name="first" id="first" class="input-field">
                            <span id="first-info" class="info"></span>
                        </div><br>
                        
                        <div class="text-small">
                            <label for="last">Last Name:</label>
                            <input type="text" name="last" id="last" class="input-field">
                            <span id="last-info" class="info"></span>
                        </div><br>
                        
                        <div class="text-small">
                            <label for="email">Email Address:</label>
                            <input type="text" name="email" id="email" class="input-field">
                            <span id="email-info" class="info"></span>
                        </div><br>
                        
                        <div class="text-small">
                            <label for="message">Your Message:</label>
                            <textarea name="message" id="message" class="input-field"></textarea>
                            <span id="message-info" class="info"></span>
                        </div><br>
                            
                        <input type="submit" value="Submit" name="submit" id="submit" class="button">
                    </form>
                </div>
            </div>
        </div>

        <!-- validate contact form script with jQuery -->
        <script>
        
        function validateContactForm() {
            var valid = true;
            
            $(".info").html("");
            $(".input-field").css('border', '#FF0000 1px solid');
            var first = $("#first").val();
            var last = $("#last").val();
            var email = $("#email").val();
            var message = $("#message").val();
            
            if (first == "") {
                $("#first-info").html("Required.").css('color', '#FF0000');
                $("#first").css('border', '#FF0000 1px solid');
                valid = false;
            }
	
            if (last == "") {
                $("#last-info").html("Required.").css('color', '#FF0000');
                $("#last").css('border', '#FF0000 1px solid');
                valid = false;
            }
	
            if (email == "" || !email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
                $("#email-info").html("Invalid Email Address.").css('color', '#FF0000');
                $("#email").css('border', '#FF0000 1px solid');
                valid = false;
            }
            
            if (message == "") {
                $("#message-info").html("Required.").css('color', '#FF0000');
                $("#message").css('border', '#FF0000 1px solid');
                valid = false;
            }
            
            return valid;
        }
        
        </script>
        <br><br><br><br><br>
        <!-- footer section -->
        <footer class="footer">
            <div class="content-container">
                <div class="content">
                    <div class="flex-row">
                        <div class="flex-item flex-item-stretch flex-column">
                            <p class="n2">
                                <a id="n1" href="../html/index.html">NationFact</a><br>
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
                                    <a href="../html/index.html">Home</a><br>
                                    <a href="../html/countries.html">Countries</a><br>
                                    <a href="../html/comparison.html">Comparison</a><br>
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