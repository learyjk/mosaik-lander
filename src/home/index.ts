import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

console.log('hi');

window.Webflow ||= [];
window.Webflow.push(() => {
  document.querySelector('.placeholder-text')?.remove();
  const words = ['Every superhero needs a sidekick...'];

  gsap.to('#cursor', {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.8,
    ease: 'power4.inout',
  });

  let tlMaster = gsap.timeline();

  words.forEach((word) => {
    let tlText = gsap.timeline();
    tlText.to('#animated-text', { duration: 3, delay: 2, text: word });
    tlMaster.add(tlText);
  });
});
