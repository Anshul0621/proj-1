function locgsap() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locgsap();

function loader(){

let ital = document.querySelector('.italia')

function number(){
    let i = 1;
    let inte = setInterval(() => {
        ital.innerHTML = i+'-100';
        i++

        if(i>100){
            clearInterval(inte)
        }

    }, 20);
}
number()

let tl = gsap.timeline()
tl.from('.line h1,.line h2',{
    y:100,
    stagger:0.4,
})
tl.to('.line h1 span',{
    animationName: 'anim'
})

tl.from('.bottom',{
    opacity:0,
    duration:1,
})

tl.to('#loader h2',{
    delay:0.2,
    opacity:0
})
tl.to('#loader h1,.line h3',{
    stagger:0.1,
    opacity:0
})

tl.to('#loader',{
    delay:0.5,
    y:'-100%'
})
tl.from('#page-1body .right h1',{
    y:100,
    stagger:0.2
})

}

loader()

function crssr() {
  document.addEventListener("mousemove", (det) => {
    gsap.to("#crsr", {
      duration: 0,
      left: det.x,
      top: det.y,
    });
  });
}

crssr();

function videocrsr() {
  var cont = document.querySelector("#videocont");
  var player = document.querySelector("#player");
  var crsr = document.querySelector("#crsr");

  cont.addEventListener("mouseenter", () => {
    crsr.style.display = "none";
    player.style.display = "flex";
    // player.style.top = "15%";

  });

  cont.addEventListener("mouseleave", () => {
    crsr.style.display = "block";
    player.style.transition = "left 0.3s ease, top 0.3s ease";
    player.style.left = "80%";
    player.style.top = "15%";
    player.style.transformOrigin = 'center';

    // player.style.scale = 1
    setTimeout(() => {
      player.style.transition = "none";
  }, 300);
  });


  cont.addEventListener('mouseenter',()=>{

    cont.addEventListener("mousemove", (e) => {
      gsap.set(player, {
        duration: 0,
        left: e.x ,
        top:  e.y,
      });
    });
    
  })
  }
videocrsr();

function videoplayer(){

  function isVideoPlaying(video) {
    return !!(
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2
    );
}
  var contimg = document.querySelector("#videocont img");
  var player = document.querySelector("#player");
  var video = document.querySelector('#videocont video')
  var svg = document.querySelector('#player img')


  contimg.addEventListener('click',()=>{
   
    
    if(!isVideoPlaying(video)){
      video.play()
      svg.src = 'pause.svg'
      contimg.style.opacity = 0
      contimg.style.transition = 'opacity 0.3s ease'
      
    }else{
      svg.src = 'play.svg'
      video.pause()
      player.style.transform = 'scale(1)';
      contimg.style.opacity = 1
      contimg.style.transition = 'opacity 0.5s ease'
      player.style.transformOrigin = 'center';
    }

    video.addEventListener('ended', function() {
      // When the video ends, restart it
      video.currentTime = 0; // Reset video to the start
      video.play();
    });




    setTimeout(() => {
      if(isVideoPlaying(video)){
        player.style.transition = 'transform 0.3s ease';
            player.style.transform = 'scale(0.7)';
            player.style.transformOrigin = 'center';
      }
    }, 200);

  })
}
videoplayer()

function scrolltext() {
  const tl = gsap.timeline({ repeat: -1 });

  tl.fromTo(
    ".scrolltext",
    { y: "-100%" },
    { y: "0%", duration: 1, ease: "power2.out" }
  )
    .to(".scrolltext", {
      y: "0%",
      duration: 0.2,
    })
    .to(".scrolltext", {
      y: "100%",
      duration: 1.5,
    });
}
scrolltext();

Shery.makeMagnet("#nav #part2 h4");
Shery.makeMagnet("#part1 #hoverer");


function unrelatedelement(){
    document.querySelectorAll('.cardhover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const targetId = el.dataset.target;
      const target = document.getElementById(targetId);
      if (target) target.style.visibility = 'visible';
    });

    el.addEventListener('mouseleave', () => {
      const targetId = el.dataset.target;
      const target = document.getElementById(targetId);
      if (target) target.style.visibility = 'hidden';
    });
  });

// for unrelated element
}

unrelatedelement()

function hoverbox(){
  document.addEventListener("mousemove", (det) => {
    gsap.to(".hoverbox", {
      duration: 0,
      left: det.x,
      top: det.y,
    });
  });
}
hoverbox()



function imageeff() {
  Shery.imageEffect(".image-div", {
    style: 5,
    // debug:true,
    config:
    {"a":{"value":0.23,"range":[0,30]},"b":{"value":1,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6738455786128248},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.76,"range":[0,10]},"metaball":{"value":0.44,"range":[0,2]},"discard_threshold":{"value":0.55,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}},
    gooey:true
  });
}
 imageeff();



function endpageanim(){
  let conte = document.querySelector('.conte')
  conte.addEventListener('mouseenter',()=>{
    // $('.conte h1').css('opacity', 0); 
    gsap.from('.conte h1',{
      opacity:0,
      duration:1,
      onStart:function(){
        $('.conte h1').textillate({ in: { effect: 'fadeIn' } });
      }
    })
  })
}

endpageanim()