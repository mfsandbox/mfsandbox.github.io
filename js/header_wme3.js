  function scaleHero(heroImage,windowWidth,windowHeight,doAlert) {
          maxStretch = 1.2;
          maxWidth = windowHeight * maxStretch * (800/1300);

          displayedWidth = (windowWidth > maxWidth) ? maxWidth : windowWidth;

          heroStyle = window.getComputedStyle(heroImage);
          heroWidth = heroStyle.width.replace('px','');
          heroHeight = heroStyle.height.replace('px','');

          widthRatio = displayedWidth/heroWidth;
          heightRatio = windowHeight/heroHeight;
          heroOverflow = heroStyle.overflow;

          magX = Math.min(widthRatio,heightRatio * maxStretch);
          magY = Math.min(heightRatio,widthRatio * maxStretch);
          
          if (heroOverflow == "scroll" || heroOverflow == "auto") {
            magX = widthRatio;
            magY = magX;
          }


          if (doAlert) {alert(heroImage.complete);}
          //heroImage.height = heroImage.naturalHeight * magY;
          //heroImage.width = heroImage.naturalWidth * magX;

          heroHeightOverflow = (heroOverflow == "scroll" ? 0 : -(heroHeight - windowHeight)/2);
          heroWidthOverflow = -(heroWidth - windowWidth)/2;

          translateString = `translate3d(${heroWidthOverflow}px,${heroHeightOverflow}px,0px)`;
          scaleString = `scale3d(${magX},${magY},1)`;
  
          heroImage.style.transform = `${translateString} ${scaleString}`;

  
  }  

  function scaleHeroes() {   
    var heroImages = document.querySelectorAll(".fixedcard");
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    var ct = document.querySelector(".cardtable");
    ct.style.height = `${windowHeight}px`;
    ct.style.width = `${windowWidth}px`;
    navfooter = document.body.querySelector(".navfooter");
    navTop = Math.round(windowHeight * 0.95);
    navfooter.style.top = `${navTop}px`;
    heroImages.forEach(
      function(heroImage,index){
        scaleHero(heroImage,windowWidth,windowHeight,false);
      }
    )
  }