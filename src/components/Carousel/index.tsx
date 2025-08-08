import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/all'
import './index.css'

gsap.registerPlugin(Observer)
const Carousel = () => {
  const ref = useRef(null)
  useGSAP(() => {
 // setup
const fontArms = [".d1", ".d4", ".c2", ".c4", ".o2", ".o3", ".u2", ".c8", ".c9", ".s1", ".s5", ".s2", ".t1", ".r1", ".u3", ".c10", ".c6", ".t3"];
const fontRight = [".d3", ".c1", ".c5", ".o4", ".n3", ".s4", ".r4", ".u2", ".c8", ".c9"];
const fontLeft = [".d2", ".c3", ".o1", ".n1", ".s3", ".r2", ".u1", ".c7"]

// generate some glitchy keyframes
function getGlitchy(
  glitchKeyframeAmount,
  glitchKeyframeOffset,
  glitchFrameSize
) {
  const keyframes = [];
  for (let i = 0; i < glitchKeyframeAmount; i++) {
    const keyframe = {};
    const randomNumber1 = gsap.utils.random(10, 90, 5);
    const randomNumber2 =
      randomNumber1 + gsap.utils.random(-glitchFrameSize, glitchFrameSize, 2);
    const randomOffset = gsap.utils.random(
      glitchKeyframeOffset,
      -1 * glitchKeyframeOffset
    );
    const isLastFrame = i === glitchKeyframeAmount - 1;

    if (i % 3 === 0 || isLastFrame) {
      keyframe.clipPath = `polygon(0 ${randomNumber1}%, 100% ${randomNumber1}%, 100% ${randomNumber1}%, 0 ${randomNumber1}%)`;
    } else {
      keyframe.clipPath = `polygon(0 ${randomNumber1}%, 100% ${randomNumber1}%, 100% ${randomNumber2}%, 0   ${randomNumber2}%)`;
      keyframe.xPercent = randomOffset;
    }
    keyframe.webkitClipPath = keyframe.clipPath;
    keyframes.push(keyframe);
  }
  return keyframes;
};

// nice flickery eases, they need easePack 
const flicker = "rough({ template: sine.inOut, strength: 1.5, points: 10})";
const flicker2 = "rough({template: power0.none, strength: 2, points: 12})";
const strongFlicker = "rough({template: power2.inOut, strength: 2.5, points: 15})";

const glitchKeyframes = getGlitchy(8, 2, 20);

// timelines
function randomizedStretching() {
  const timeline = gsap.timeline()
  .from(".letters", {
    duration: 1,
    ease: flicker2,
    xPercent: (i) => {
			return gsap.utils.random(-400, 400, 5);
		},
    scaleX: (i) => {
      return gsap.utils.random(0, 10);
    },
    transformOrigin: "50%, 50%",
    stagger: 0.05
  },0)

  return timeline;
}
function opacityFlicker() {
  const timeline = gsap.timeline({defaults: {duration: 1.5,opacity: 0,stagger: 0.1}})
  .from(".letter--one", {
    ease: strongFlicker,   
  },0)
  .from(".letter--two", {
    ease: flicker2,
  },0)
  
  return timeline;
}
function linesTimeline() {
 const timeline = gsap.timeline({defaults:{ease: "expo.out", duration: 1}})
.from(fontLeft, {
  xPercent: 100,
},0.4)
.from(fontRight, {
  xPercent: -100,
},0.4)
.from(fontArms, {
  scaleX: 0,
  transformOrigin:"50% 50%",
},0)
.from(".n2", {
  rotate: 20,
  scale: 0.9,
  transformOrigin:"50% 50%"
},0)
.from(".r3", {
  rotate: 19,
  xPercent: -30,
  opacity: 0,
  transformOrigin:"50% 50%"
},0)
 return timeline;
}
function openingPinkLines() {
  const timeline = gsap.timeline({defaults:{ duration: 0.5,}})
  .fromTo(".dash",{
    scaleY: 0,
    scaleX: 0,
    xPercent: -200,
    transformOrigin: "50%,50%",
    ease: "linear",
  },{
    scaleY: 0.2,
    scaleX: 20,
    ease: "linear",
  },)
  .from(".dot",{
    xPercent: 900,
    scaleX: 300,
    transformOrigin: "100%,100%",
    ease: strongFlicker,
    opacity: 0,
  })
  .to(".dash",{
    scaleX: 1,
    scaleY: 1,
    xPercent: -950,
    transformOrigin: "100%,100%",
    ease: strongFlicker,
  }, "-=0.5")
  return timeline;
}
function glitch() {
  const timeline = gsap.timeline()
  .to(".glitchLayer",{
    duration: 0.1,
    opacity: 1,
  },0)
  .to(".glitchLayer",{
    duration: 1.5,
    ease: "flicker2",
    keyframes: glitchKeyframes
  },0)
  return timeline;
}
function textGlitch() {
  const timeline = gsap.timeline({defaults: { duration: 0.5, transformOrigin: "100%,100%", ease: flicker, }})
   .to(".c5",{
    xPercent: 80,
   },0)
  .to(".d1",{
    xPercent: 28,
  },0)
  .to(".s5",{
    xPercent: -30,
  },0)
  .to(".n1",{
    yPercent: 20,
  },0)
  .to(".n3",{
    yPercent: -20,
  },0)
   .to(".c6",{
    yPercent: -90,
  },0)
  .to(".u3",{
    yPercent: 90,
  },0)
  .to(".r3",{
    yPercent: 30,
  },0)
  .to( ".t4",{
    yPercent: 30,
  },0)
  return timeline;
}
function finalTextGlitch() {
  const timeline = gsap.timeline()
  .to([".d1", ".n1", ".n3", ".s5", ".r3", ".t4"],{
    duration: 0.2,
    yPercent: 0,
    xPercent: 0,
    transformOrigin: "100%,100%",
    ease: flicker,
  })
  return timeline;
}

// main timeline
const masterTimeline = gsap.timeline({delay:1.5})
.add(openingPinkLines(),0)
.add(opacityFlicker(),0.5)
.add(randomizedStretching(),0.7)
.add(linesTimeline(),2.8)
.add(glitch(),"-=0.5")
.add(textGlitch(),"-=1")
.add(glitch().timeScale(1.1),"+=1")
.add(finalTextGlitch().timeScale(1.1),"-=0.5")


//Chris Gannons timeline scrubber tool
// ScrubGSAPTimeline(masterTimeline);

  }, {
    scope: ref,
  })
  return (
    <div className='slide_container_father' ref={ref}>
    
    <svg
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1542.947 842.427">
  <defs>
    <filter id="glow" width="150%" height="150%" x="-25%" y="-25%" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feGaussianBlur in="SourceGraphic" stdDeviation="22"/>
      <feColorMatrix values="0 0 0 0 0.988235 0 0 0 0 0.301961 0 0 0 0 0.890196 0 0 0 0.8 0"/>
      <feBlend mode="multiply" result="DROPSHADOW"/>
      <feBlend in="SourceGraphic" in2="DROPSHADOW" />
    </filter>
  </defs>
  <g className="text">
    
    <path className="dash dotDash" d="M900.339,258.82h144v48h-144Z" fill="#fb22c6"/>
    <rect className="dot dotDash" x="308.339" y="354.82" width="48" height="48" fill="#fb22c6"/>

    <g filter="url(#glow)" fill="#ffffff">
      <g className="letters letter--two d">
        <path className="d1" d="M148.339,162.82h96a48,48,0,0,1,48,48h-144Z"/>
        <path className="d2" d="M148.339,162.82h48v240h-48Z"/>
        <path className="d3" d="M244.339,162.82a48,48,0,0,1,48,48v144a48,48,0,0,1-48,48Z"/>
        <path className="d4" d="M148.339,354.82h144a48,48,0,0,1-48,48h-96Z"/>
      </g>
      <g className="letters letter--one s">
        <path className="s1" d="M372.339,498.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path className="s2" d="M372.339,546.82h96a48,48,0,0,1,48,48h-96A48,48,0,0,1,372.339,546.82Z"/>
        <path className="s3" d="M372.339,498.82a48,48,0,0,1,48-48v144a48,48,0,0,1-48-48Z"/>
        <path className="s4" d="M468.339,546.82a48,48,0,0,1,48,48v48a48,48,0,0,1-48,48Z"/>
        <path className="s5" d="M372.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,372.339,642.82Z"/>
      </g>
      <g className="letters letter--one c">
        <path className="c1" d="M468.339,162.82a48,48,0,0,1,48,48v48h-48Z"/>
        <path className="c2" d="M372.339,210.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path className="c3" d="M372.339,210.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path className="c4" d="M372.339,354.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,372.339,354.82Z"/>
        <path className="c5" d="M468.339,306.82h48v48a48,48,0,0,1-48,48Z"/>
      </g>
      <g className="letters letter--one o">
        <path className="o1" d="M548.339,210.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path className="o2" d="M548.339,354.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,548.339,354.82Z"/>
        <path className="o3" d="M548.339,210.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path className="o4" d="M644.339,162.82a48,48,0,0,1,48,48v144a48,48,0,0,1-48,48Z"/>
      </g>
      <g className="letters letter--two n">
        <path className="n1" d="M724.339,162.82h48v240h-48Z"/>
        <path className="n2" d="M724.339,162.82h48l96,240h-48Z"/>
        <path className="n3" d="M820.339,162.82h48v240h-48Z"/>
      </g>
      <g className="letters letter--one t-2">
        <path className="t1" d="M548.339,450.82h144v48h-144Z"/>
        <path className="t2" d="M596.339,450.82h48v240h-48Z"/>
      </g>
      <g className="letters letter--two r">
        <path className="r1" d="M724.339,450.82h96a48,48,0,0,1,48,48h-144Z"/>
        <path className="r2" d="M724.339,450.82h48v240h-48Z"/>
        <path className="r3" d="M772.339,546.82h48l48,144h-48Z"/>
        <path className="r4" d="M820.339,450.82a48,48,0,0,1,48,48v48a48,48,0,0,1-48,48Z"/>
        <path className="r5" d="M772.339,546.82h48v48h-32Z"/>
      </g>
      <g className="letters letter--one u">
        <path className="u1" d="M900.339,450.82h48v240a48,48,0,0,1-48-48Z"/>
        <path className="u2" d="M996.339,450.82h48v192a48,48,0,0,1-48,48Z"/>
        <path className="u3" d="M900.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,900.339,642.82Z"/>
      </g>
      <g className="letters letter--two c-2">
        <path className="c6" d="M1076.339,498.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path className="c7" d="M1076.339,498.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path className="c8" d="M1172.339,450.82a48,48,0,0,1,48,48v48h-48Z"/>
        <path className="c9" d="M1172.339,594.82h48v48a48,48,0,0,1-48,48Z"/>
        <path className="c10" d="M1076.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,1076.339,642.82Z"/>
      </g>
      <g className="letters letter--two t">
        <path className="t3" d="M1252.339,450.82h144v48h-144Z"/>
        <path className="t4" d="M1300.339,450.82h48v240h-48Z"/>
      </g>
    </g>
  </g>
  
  <g opacity="0" className="glitchLayer"> 
    <rect x="0" y="0" width="1542" height="842" fill="#160a2b"/>
    <path d="M900.339,258.82h144v48h-144Z" fill="#fb22c6"/>
    <rect x="308.339" y="354.82" width="48" height="48" fill="#fb22c6"/>

    <g filter="url(#glow)" fill="#fff">
      <g>
        <path d="M148.339,162.82h96a48,48,0,0,1,48,48h-144Z"/>
        <path d="M148.339,162.82h48v240h-48Z"/>
        <path d="M244.339,162.82a48,48,0,0,1,48,48v144a48,48,0,0,1-48,48Z"/>
        <path d="M148.339,354.82h144a48,48,0,0,1-48,48h-96Z"/>
      </g>
      <g>
        <path d="M372.339,498.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path d="M372.339,546.82h96a48,48,0,0,1,48,48h-96A48,48,0,0,1,372.339,546.82Z"/>
        <path d="M372.339,498.82a48,48,0,0,1,48-48v144a48,48,0,0,1-48-48Z"/>
        <path d="M468.339,546.82a48,48,0,0,1,48,48v48a48,48,0,0,1-48,48Z"/>
        <path d="M372.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,372.339,642.82Z"/>
      </g>
      <g>
        <path d="M468.339,162.82a48,48,0,0,1,48,48v48h-48Z"/>
        <path d="M372.339,210.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path d="M372.339,210.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path d="M372.339,354.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,372.339,354.82Z"/>
        <path d="M468.339,306.82h48v48a48,48,0,0,1-48,48Z"/>
      </g>
      <g>
        <path d="M548.339,210.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path d="M548.339,354.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,548.339,354.82Z"/>
        <path d="M548.339,210.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path d="M644.339,162.82a48,48,0,0,1,48,48v144a48,48,0,0,1-48,48Z"/>
      </g>
      <g>
        <path d="M724.339,162.82h48v240h-48Z"/>
        <path d="M724.339,162.82h48l96,240h-48Z"/>
        <path d="M820.339,162.82h48v240h-48Z"/>
      </g>
      <g>
        <path d="M548.339,450.82h144v48h-144Z"/>
        <path d="M596.339,450.82h48v240h-48Z"/>
      </g>
      <g>
        <path d="M724.339,450.82h96a48,48,0,0,1,48,48h-144Z"/>
        <path d="M724.339,450.82h48v240h-48Z"/>
        <path d="M772.339,546.82h48l48,144h-48Z"/>
        <path d="M820.339,450.82a48,48,0,0,1,48,48v48a48,48,0,0,1-48,48Z"/>
        <path d="M772.339,546.82h48v48h-32Z"/>
      </g>
      <g>
        <path d="M900.339,450.82h48v240a48,48,0,0,1-48-48Z"/>
        <path d="M996.339,450.82h48v192a48,48,0,0,1-48,48Z"/>
        <path d="M900.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,900.339,642.82Z"/>
      </g>
      <g>
        <path d="M1076.339,498.82a48,48,0,0,1,48-48h48a48,48,0,0,1,48,48Z"/>
        <path d="M1076.339,498.82a48,48,0,0,1,48-48v240a48,48,0,0,1-48-48Z"/>
        <path d="M1172.339,450.82a48,48,0,0,1,48,48v48h-48Z"/>
        <path d="M1172.339,594.82h48v48a48,48,0,0,1-48,48Z"/>
        <path d="M1076.339,642.82h144a48,48,0,0,1-48,48h-48A48,48,0,0,1,1076.339,642.82Z"/>
      </g>
      <g>
        <path d="M1252.339,450.82h144v48h-144Z"/>
        <path d="M1300.339,450.82h48v240h-48Z"/>
      </g>
    </g>
  </g>
</svg>


<a href="https://greensock.com" target="_blank"><img className="gsap-3-logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-3-logo.svg" width="150" /></a>

    </div>
  )
}

export default Carousel