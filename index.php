<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory game</title>
  <link rel="stylesheet" href="static/CSS/index.css">
  <script src="static/JS/index.js"></script>
</head>
<body>

  <!-- game block -->

  <div id="game_block" class="block">
    <?php

      $cards = []; // list of unique cards

      if( isset($_GET["number"]) ) { // if the value is set

		    $number = $_GET["number"];
		    $numberUniqCard = floor($number/2); // number Unique Cards
		    $cols = ceil(sqrt($number));
		    $rows = ceil($number/$cols);

		    while( count($cards)<$numberUniqCard ) { // filling an array with unique cards
		      $rand = rand(1, 24);
		      if( !in_array($rand,$cards) )
			    array_push( $cards, $rand );
	      }

	      $cardList = array_merge($cards,$cards); // an array of all cards
	      shuffle($cardList);
	      }


      if (empty($cardList)) { // if the number of cards is not specified
        echo 
            '<h1>Игра на пямять</h1>'
          .'<p id="numberCards">Колличество карточек: 24 </p>'
          .'<form method="get">'
            .'<input type="range"
                     min="2"
                     max="48"
                     step="2"
                     value="24"
                     id="number"
                     name="number"
                     >'
            .'<button type="submit">Играть</button>'
          .'</form>';
      }

      // == laying out cards ==

      else {
        for( $ri=0; $ri<$rows; $ri++ ) { // for each row
          echo '<ul>';

          for( $ci=0; $ci<$cols; $ci++ ) { // for each column
            $index = $ri*$cols+$ci; // calculates the place among the cards
            if( isset($cardList[$index]) )
              echo 
                 '<li>'
                  .'<div class="place-holder">'
                    .'<div class="img-div">'
                      .'<img id="imgs" src="static/IMG/'.$cardList[$index].'.jpg"/>'
                    .'</div>'
                  .'</div>'
                .'</li>';
            }
          
          echo '</ul>';
        };
      };
    ?>
  </div>

  <!-- win block -->

  <div id = "win" class = "block">
    <h1>Ты победил!</h1>
    <a href="http://memorygameJJ.com/">на главную</a>
  </div>

</body>
</html>