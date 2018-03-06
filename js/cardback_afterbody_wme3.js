  var deck = document.querySelector(".deck");
  var currentCardIndex = 0;
  var cards = document.querySelectorAll(".card");
  var cardCount = cards.length;
  var navFooter = document.querySelector(".navfooter");
  var navIcons = [];
  var swipeEnabled = true;

  var url = new URL(document.location.href);
  var urlCardNumber = Number(url.searchParams.get("card"));
  if (Number.isInteger(urlCardNumber)) {
    if (urlCardNumber >0 && urlCardNumber <= cardCount){
      currentCardIndex = urlCardNumber - 1;
    }
  }


  url.searchParams.get("card")
  
  function flipCard(card) {
    url.searchParams.set("card",`${currentCardIndex + 1}`);
    history.pushState(null,null,url.href);
    var cardBack = card.querySelector('.cardback');
    var cardFront = card.querySelector('.cardfront');
    cardFront.hidden = !cardFront.hidden;
    cardBack.hidden = !cardFront.hidden;
    swipeEnabled = !cardFront.hidden;
    if (!swipeEnabled) {
      navFooter.style.display = "none";
    }
    else {
      navFooter.style.display = "";
    }
    document.querySelector('.cardIndexDecrementor').style.visibility = swipeEnabled ? 'Visible' : 'Hidden';
    document.querySelector('.cardIndexIncrementor').style.visibility = swipeEnabled ? 'Visible' : 'Hidden';
  }



  window.addEventListener("resize", function(event) {scaleHeroes();});

