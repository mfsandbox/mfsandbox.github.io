  var deck = document.querySelector(".deck");
  var currentCardIndex = 0;
  var cards = document.querySelectorAll(".card");
  var cardCount = cards.length;
  var navFooter = document.querySelector(".navfooter");
  var navIcons = [];
  var swipeEnabled = true;


//polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)
  var topLeftClip = "polygon(0% 0%, 100% 0%, 100% 91%, 85% 100%, 0% 100%)";
  var bottomRightClip = "polygon(0% 0%, 100% 0%, 100% 91%, 85% 100%, 0% 100%)";
  var noClip = "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)";
  //var leftCornerUp = "-webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 91%, 85% 100%, 0% 100%); clip-path: polygon(0% 0%, 100% 0%, 100% 91%, 85% 100%, 0% 100%);"

  var url = new URL(document.location.href);
  var urlCardNumber = Number(url.searchParams.get("card"));
  if (Number.isInteger(urlCardNumber)) {
    if (urlCardNumber >0 && urlCardNumber <= cardCount){
      currentCardIndex = urlCardNumber - 1;
    }
  }


  url.searchParams.get("card");

  function gotoMap() {
    document.querySelector("#zipcodelink").href = "https://www.google.com/maps/search/?api=1&query=world+market+zip+code+" + document.querySelector("#zipcode").value;
  }

  function decrementCardIndex() {
    if (swipeEnabled) {
      if (currentCardIndex <= 0) {
        currentCardIndex = cardCount;
      }
      currentCardIndex--;
    }
  }

  function incrementCardIndex() {
    if (swipeEnabled) {
      if (currentCardIndex >= cardCount - 1) {
        currentCardIndex = -1;
      }
      currentCardIndex++;
    }  
  }

  function initializeNavDots(navFooter, navIcons) {
    if (cards.length > 1) {
      cards.forEach(
        function(card, index) {
          navicon = document.createElement("i");
          navicon.className = (index == currentCardIndex ? "navicon fa fa-circle" : "navicon fa fa-circle-o");
          navicon.style = "font-size: 50%;";
          navFooter.appendChild(navicon);
          navIcons[index] = (navicon);
        }
      )
    }
  }
  
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

/*
  function initFlipCards() {
    flipcards = document.querySelectorAll(".flipcard");
    flipcards.forEach(
      function(card,index) {
        cardBack = card.querySelector('.cardback');
        cardBack.hidden = true;
        flippers = card.querySelectorAll('.cardflipper');
        flippers.forEach(
          function(flipper,index) {
            flipper.style.cursor = "pointer";
            flipper.onclick = function(){
              flipCard(card);
            }        
          }
        )   
      }
    )
  } 
  */

  function setCardVisibility(cards, navIcons) {
    cards.forEach(
      function (card,index){
        card.style.webkitClipPath = noClip;
        card.style.clipPath = noClip;

        if (index == currentCardIndex) {

          url.searchParams.set("card",`${index + 1}`);
          history.replaceState({},null,url.href);
          card.hidden = false;
          card.scrollTop = 0;

            dogear = card.querySelector(".dogear");
            if (dogear != undefined) {
              dogear.style.transitionDelay = "1s";
              dogear.style.transform = "scale3d(1,1,1)";
            }

          backsideAttr = card.attributes.backside;
          if (backsideAttr != undefined) {
            dogear = card.querySelector(".dogear");
            if (dogear != undefined) {
              dogear.style.transitionDelay = "1s";
              dogear.style.transform = "scale3d(1,1,1)";
            }
            document.querySelector(".cardflipper").href = backsideAttr.value;
            card.style.transitionDuration = "1s";
            card.style.webkitClipPath = bottomRightClip;
            card.style.clipPath = bottomRightClip;
          }

          /*if (card.className.includes("flipcard")) {*/
          if (cardCount > 1)
          {  
            if (false) {
              navIcons[index].className = "navicon fa fa-reply";
              navIcons[index].style = "font-size: 100%;";
              navIcons[index].onclick = function() {  
                                                      flipCard(card);
                                                    }
            }
            else {  
              navIcons[index].className = "navicon fa fa-circle" ;
            }
          }  
        }
        else {
          card.hidden = true;
          dogear = card.querySelector(".dogear");
          if (dogear != undefined) {
              dogear.style.transform = "scale3d(0,0,0)";
          }
          navIcons[index].className = "navicon fa fa-circle-o";
          if (card.className.includes("flipcard")) {
              navIcons[index].style = "font-size: 50%;"
          } 
        }  
      }
    )
  }



  var hammered = Hammer(deck);
  hammered.on('swiperight', function(event) {decrementCardIndex(); setCardVisibility(cards, navIcons)});
  hammered.on('swipeleft',function(event) {incrementCardIndex(); setCardVisibility(cards, navIcons)});

  initializeNavDots(navFooter,navIcons);
  setCardVisibility(cards,navIcons);
  //initFlipCards();

/*
  if (cardCount > 1)
  {
      document.querySelector(".deck .cardIndexDecrementor").addEventListener('click', function(event) {decrementCardIndex(); setCardVisibility(cards, navIcons);})
      document.querySelectorAll(".deck .cardIndexIncrementor").forEach(
            (incrementor) =>
            {
              incrementor.addEventListener('click', function(event) {incrementCardIndex(); setCardVisibility(cards, navIcons);})
            }
          )
  }
  */

  var cardbacks = document.querySelectorAll(".cardback, .scrollcard");

  cardbacks.forEach(function(cardback,index) {
                      cardback.addEventListener(
                        "touchmove",
                        function(event) {event.stopPropagation()},
                        false
                      );

                    }
  );                               


  document.body.addEventListener("touchmove",
                                  function(event) {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                  },
                                  false
                                )



  window.addEventListener("resize", function(event) {scaleHeroes();});

