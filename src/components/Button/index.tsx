import React, { useRef } from 'react'
import './index.scss';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText'
import gsap from 'gsap';
gsap.registerPlugin(SplitText)
const Button = ({ children, ...btnProps }: { children: any, btnProps: React.ButtonHTMLAttributes<HTMLButtonElement> }) => {
  const ref = useRef(null)
  useGSAP(() => {
    const svg = document.querySelector("svg");
const wibble = document.querySelector("#wibble");
const width = 100;
const pointz = 30;
const spacing = width / pointz;
const pointzArray = [];
const mySplitText = new SplitText(".text", { type: "chars" });
const chars = mySplitText.chars;
const amplitude = 10;
const duration = 0.4;

function staggerText(direction) {
	gsap.to(chars, {
		duration: duration / 3,
		y: amplitude * -1,
		ease: "Sine.easeInOut",
		stagger: {
			amount: duration / 3,
			yoyo: true,
			repeat: 1,
			from: direction
		}
	});
}

for (let i = 0; i < pointz; i++) {
	const position = i / (pointz - 1);

	const point = wibble.points.appendItem(svg.createSVGPoint());

	point.x = i * spacing;
	point.y = 25;

	pointzArray.push(point);
}

const button = document.querySelector("button");
gsap.set(button, { opacity: 1 });
let isAnimating = false;
const reservedArray = [...pointzArray].reverse();

button.addEventListener("mouseenter", (e) => {
	if (isAnimating === true) return;

	const buttonCoords = button.getBoundingClientRect();
	const middle = buttonCoords.left + buttonCoords.width / 2;
	const leftSide = e.clientX < middle;

	if (leftSide) {
		staggerText("start");
		wibbleButton(reservedArray);
	} else {
		staggerText("end");
		wibbleButton(pointzArray);
	}

	isAnimating = true;
});

function wibbleButton(array) {
	array.forEach((point, index) => {
		const mapper = gsap.utils.mapRange(0, pointz, 0, 0.4);

		if (index === 0) {
			gsap
				.to(point, {
					keyframes: [
						{ y: `+=${amplitude}`, ease: "Sine.easeInOut" },
						{ y: `-=${amplitude * 2}`, ease: "Sine.easeInOut" },
						{ y: `+=${amplitude}`, ease: "Sine.easeInOut" }
					],
					yoyo: true,
					duration: duration,
					onComplete: () => {
						isAnimating = false;
					}
				})
				.progress(mapper(index));
		} else {
			gsap
				.to(point, {
					keyframes: [
						{ y: `+=${amplitude}`, ease: "Sine.easeInOut" },
						{ y: `-=${amplitude * 2}`, ease: "Sine.easeInOut" },
						{ y: `+=${amplitude}`, ease: "Sine.easeInOut" }
					],
					yoyo: true,
					duration: duration
				})
				.progress(mapper(index));
		}
	});
}

  }, {
    scope: ref
  })
  return (
    <button ref={ref} {...btnProps}>
    <span className="text">{children}</span>
    <svg className='btn_svg' viewBox="0 0 100 50" preserveAspectRatio="none">
      <defs>
        <filter id="shadow" filterUnits="userSpaceOnUse" height="200%" width="200%" y="-50%" x="-50%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#17BBAB" flood-opacity="0.4" />
        </filter>
  
        <filter id="border" filterUnits="userSpaceOnUse" height="200%" width="200%" y="-50%" x="-50%">
          <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="1.2"></feMorphology>
  
          <feFlood flood-color="#fff" flood-opacity="1" result="WHITE"></feFlood>
          <feComposite in="WHITE" in2="DILATED" operator="in" result="OUTLINE"></feComposite>
  
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="focus">
        <polyline stroke="#17bbab" id="wibble" fill="none" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  </button>
  )
}

export default Button