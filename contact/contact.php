<!--Titan Robotics Contact Page
Created By: IMSA Titan Robotics Programming team-->
<?php
if(isset($_POST['submit'])){
    $to = "titan2022robotics@gmail.com";
    $from = $_POST['email'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $subject = "Form submission";
    $subject2 = "Copy of your form submission";
    $message = $fname." ".$lname." wrote the following:"."\n\n".$_POST['message'];
    $message2 = "Here is a copy of your message, ".$fname."\n\n".$_POST['message'];

    $headers = "From:".$from;
    $headers2 = "From:".$to;
    mail($to,$subject,$message,$headers); //sends message to titan2022robotics@gmail.com
    mail($from,$subject2,$message2,$headers2); //sends copy of message to the sender
    //header('Location: contact.php');
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Titan Robotics: Contact</title>
        <link rel="stylesheet" type="text/css" href="../css/main.css">
        <link rel="stylesheet" type="text/css" href="../css/contact.css">
        <link rel="icon" href="../images/logos/2022LogoSmall.png" type="image/png" sizes="16x16">
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700|Roboto:300,400" rel="stylesheet">
        <meta charset="UTF-8">
    </head>
    <body>
        <div class="navBar">
            <div class="item">
                <a class="logoLink" href="../index.html">
                    <img class="logo" alt="LOGO" src="../images/logos/2022LogoSmall.png" href="">
                </a>
            </div>
            <div class="item">
                <a href="../index.html">HOME</a>
            </div>
            <div class="item">
                <a href="../about/about.html">ABOUT</a>
            </div>
            <div class="item">
                <a href="../sponsors/sponsors.html">SPONSORS</a>
            </div>
            <div class="item">
                <a href="../resources/resources.html">RESOURCES</a>
            </div>
            <div class="item">
                <a class="active" href="contact.php">CONTACT</a>
            </div>
        </div>
        <div class="content">
            <div class="contactForm">
                <form action="" method="post">
                    <label for="fname"><p>First Name <small>*</small></p></label>
                    <input type="text" id="fname" name="fname" required>
                    <label for="lname"><p>Last Name <small>*</small></p></label>
                    <input type="text" id="lname" name="lname" required>
                    <label for="email"><p>Return Email <small>*</small></p></label>
                    <input type="email" id="email" name="email" required>
                    <label for="affiliation"><p>Affiliation <small>*</small></p></label>
                    <select id="affiliation" name="affiliation" required>
                        <option value="-">-</option>
                        <option value="fellowFRC">Fellow FRC Team</option>
                        <option value="potentialSponsor">Potential Sponsor</option>
                        <option value="other">Other</option>
                    </select>
                    <label for="message"><p>Message <small>*</small></p></label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                    <input type="submit" name="submit" value="Submit">
                </form>
            </div>
        </div>
        <div class="pageBottom">
            <div class="socialMedia">
                <table>
                    <tr>
                        <td>
                            <a href="https://www.facebook.com/TitanRobotics2022/" rel="noopener noreferrer" target="_blank">
                                <img src="../images/socialMedia/facebookLogo.png">
                            </a>
                        </td>
                        <td>
                            <a href="https://www.instagram.com/titan2022robotics/" rel="noopener noreferrer" target="_blank">
                                <img src="../images/socialMedia/instaLogo.png">
                            </a>
                        </td>
                        <td>
                            <a href="https://twitter.com/team2022" rel="noopener noreferrer" target="_blank">
                                <img src="../images/socialMedia/twitterLogo.png">
                            </a>
                        </td>
                        <td>
                            <a href="mailto:titan2022robotics@gmail.com" target="_top">
                                <img src="../images/socialMedia/emailLogo.png">
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="randomInfo">
                <p>Titan Robotics FRC Team 2022<br>Illinois Mathematics and Science Academy<br>1500 Sullivan Rd, Aurora IL, 60506</p>
            </div>
        </div>
    </body>
</html>
