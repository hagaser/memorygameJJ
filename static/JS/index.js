window.onload = function() { // when the page loads
    
    
  // ========================== fields ===============================
    
    
  // == displaying the slider value ==
    
  const numberOfSlider = document.getElementById("number");  // gets the value of the slider

  if (numberOfSlider) { //checking for a slider
    numberOfSlider.addEventListener("input", function() {
      numberCards.innerHTML = `Колличество карточек: ${this.value}`; // displaying the slider value
    });

  } else {

    // == The appearance of victory ==

    if (window.location.href.replace(/\D/g, '')) { // if the game is started *how do I shorten this?*

      const observer = new MutationObserver((mutationsList) => { // observing for changing *how do I shorten this?*

        for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {

            if (!document.getElementsByClassName('img-div') // *I'm not sure how correct this is*
                .length) { // if there are no cards

              document.getElementById('win') // *I'm not sure how correct this is*
              .style.display = 'inline-block';

              document.getElementById('game_block') // *I'm not sure how correct this is*
              .style.display = 'none';

            }
          }
        }
      });
      observer.observe(document.body, { childList: true,
                                        subtree: true }); // starts observing
    }
  }

    
  // =============================== game/card ====================================
    

  let openedCards = []; // monitors open cards and their IDs
  let isProcessing = false; // monitor the opening of two cards at the same time, so that they can be closed later
  let imgDivs = document.getElementsByClassName('img-div'); // gets all the cards
    
  // == function that turns over the cards ==

  function hideCards() {

    // close cards

    openedCards.forEach(card => {
      let img = card.querySelector('img')
      card.style.width = '1px';
      img.style.width = '0px';

      // open cards

      setTimeout(() => {
        img.style.display = 'none';
        card.style.width = '50px';
      }, 300);
    });
    openedCards = [];
  }

  // == cards monitoring ==
    
  for (let i = 0; i < imgDivs.length; i++) { // ..for each card
    imgDivs[i].addEventListener('click', function() { // adds monitoring..
      if (isProcessing) return; // if the cards are closing, then nothing will happen when you click on the others

      // opening the card when clicked
      
      let card = this // card = ingDiv
      let img = card.querySelector('img');

      if (img.style.display != 'block'){
        card.style.width = '1px';
        img.style.display = 'block';

        setTimeout(() => {
          img.style.width = '50px';
          card.style.width = '50px';
        }, 300);

        openedCards.push(card); // add opened card
            
        // when opening two cards
            
        if (openedCards.length > 1) {
          isProcessing = true; // blocking the control

          if (openedCards[0].querySelector('img').src === 
              openedCards[1].querySelector('img').src) { // if the cards match
            openedCards.forEach(card => {
                        
              // failing animation
                        
              setTimeout(() => {
                            
                card.style.top = '1000px';
                            
                // delete card
                            
                setTimeout(() => {
                  card.parentNode.removeChild(card);
                }, 700);

              }, 1000);
            });

            // return control

            setTimeout(() => {
              isProcessing = false;
              openedCards = [];
            }, 300);

          } else {

            // the cards don't match, so we just close them

            setTimeout(() => { 
              hideCards();

              setTimeout(() => {
                isProcessing = false; // return control
              }, 300);

            }, 1000);
          }
        }
      }
    });
  }
}