  function scaleHero(heroImage,windowWidth,windowHeight,doAlert) {
          maxStretch = 1.2;
          maxWidth = windowHeight * maxStretch * (800/1300);

          displayedWidth = (windowWidth > maxWidth) ? maxWidth : windowWidth;

          widthRatio = displayedWidth/heroImage.naturalWidth;
          heightRatio = windowHeight/heroImage.naturalHeight;
          heroParentOverflow = window.getComputedStyle(heroImage.parentElement).overflow;

          magX = Math.min(widthRatio,heightRatio * maxStretch);
          magY = Math.min(heightRatio,widthRatio * maxStretch);
          
          if (heroParentOverflow == "scroll" || heroParentOverflow == "auto") {
            magX = widthRatio;
            magY = magX;
          }


          if (doAlert) {alert(heroImage.complete);}
          heroImage.height = heroImage.naturalHeight * magY;
          heroImage.width = heroImage.naturalWidth * magX;

          heroHeightOverflow = (heroParentOverflow == "scroll" ? 0 : -(heroImage.height - windowHeight)/2);
          heroWidthOverflow = -(heroImage.width - windowWidth)/2;
  
          heroImage.style.transform = `translate3d(${heroWidthOverflow}px,${heroHeightOverflow}px,0px)`;

  
  }  

  function scaleHeroes() {   
    var heroImages = document.querySelectorAll(".heroImage");
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    var ct = document.querySelector(".cardtable");
    ct.clientWidth = windowWidth;
    ct.clientHeight = windowHeight;
    navfooter = document.body.querySelector(".navfooter");
    navTop = Math.round(windowHeight * 0.95);
    navfooter.style.top = `${navTop}px`;
    heroImages.forEach(
      function(heroImage,index){
        scaleHero(heroImage,windowWidth,windowHeight,false);
      }
    )
  }