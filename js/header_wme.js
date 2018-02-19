  function scaleHero(heroImage,windowWidth,windowHeight,doAlert) {
          widthRatio = windowWidth/heroImage.naturalWidth;
          heightRatio = windowHeight/heroImage.naturalHeight;

          magX = Math.min(widthRatio,heightRatio * 1.2);
          magY = Math.min(heightRatio,widthRatio * 1.2);


          if (doAlert) {alert(heroImage.complete);}
          heroImage.height = heroImage.naturalHeight * magY;
          heroImage.width = heroImage.naturalWidth * magX;

          heroHeightOverflow = -(heroImage.height - windowHeight)/2;
          heroWidthOverflow = -(heroImage.width - windowWidth)/2;
          heroImage.style.transform = `translate3d(${heroWidthOverflow}px,${heroHeightOverflow}px,0px)`;

  }  

  function scaleHeroes() {   
    var heroImages = document.querySelectorAll(".heroImage");
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    navfooter = document.body.querySelector(".navfooter");
    navTop = Math.round(windowHeight * 0.95);
    navfooter.style.top = `${navTop}px`;
    heroImages.forEach(
      function(heroImage,index){
        scaleHero(heroImage,windowWidth,windowHeight,false);
      }
    )
  }