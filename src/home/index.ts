import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

const RED = '#ff576d';
const NAVY = '#181d2c';
const GRAY = '#3d414e';
const WHITE = '#ffffff';

window.Webflow ||= [];
window.Webflow.push(() => {
  typeWriterIntro();
  functionalitySuiteComponent();

  function functionalitySuiteComponent() {
    const bullets = document.querySelectorAll('.bullet');
    const bulletLines = document.querySelectorAll('.bullet-line-red');
    const bulletHeadings = document.querySelectorAll('.is-bullet-content');
    const videoWrappers = document.querySelectorAll('.window-wrap-scrollcomp');

    // register the effect with GSAP:
    gsap.registerEffect({
      name: 'videoFadeAndMove',
      effect: (target: GSAPTweenTarget) => {
        return gsap
          .timeline()
          .from(target, {
            opacity: 0,
            yPercent: 4,
            ease: 'none',
          })
          .to(target, {
            opacity: 1,
            duration: 3,
            yPercent: 0,
            ease: 'none',
          })
          .to(target, {
            opacity: 0,
            yPercent: -4,
            ease: 'none',
          });
      },
      extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
    });

    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.sticky-layout',
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1,
      },
      defaults: {
        ease: 'none',
      },
    });

    // videos
    var videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.sticky-layout',
        start: 'top top',
        end: '+=500%',
        scrub: 1,
      },
      defaults: {
        ease: 'none',
      },
    });

    // set initial states
    gsap.set(bullets[0], { backgroundColor: RED, borderColor: RED });
    gsap.set(bulletHeadings[0], { color: RED });
    gsap.set(videoWrappers, { opacity: 0, yPercent: 4 });

    videoTimeline
      .videoFadeAndMove(videoWrappers[0])
      .videoFadeAndMove(videoWrappers[1])
      .videoFadeAndMove(videoWrappers[2])
      .videoFadeAndMove(videoWrappers[3])
      .videoFadeAndMove(videoWrappers[4]);

    contentTimeline
      .to(bulletLines[0], {
        height: '100%',
        onComplete: () => handleOnComplete(1),
      })
      .to(bulletLines[1], {
        height: '100%',
        onReverseComplete: () => handleOnComplete(0),
        onComplete: () => handleOnComplete(2),
      })
      .to(bulletLines[2], {
        height: '100%',
        onReverseComplete: () => handleOnComplete(1),
        onComplete: () => handleOnComplete(3),
      })
      .to(bulletLines[3], {
        height: '100%',
        onReverseComplete: () => handleOnComplete(2),
        onComplete: () => handleOnComplete(4),
      })
      .to(bulletLines[4], {
        height: '100%',
        onReverseComplete: () => handleOnComplete(3),
      });

    function handleOnComplete(stepNumber: number) {
      // reset
      gsap.set(bullets, { backgroundColor: NAVY, borderColor: GRAY });
      gsap.set(bulletHeadings, { color: WHITE });
      gsap.set(bulletLines, { height: '10%' });
      gsap.set(videoWrappers, { opacity: 0 });

      // set new
      gsap.set(bullets[stepNumber], { backgroundColor: RED, borderColor: RED });
      gsap.set(bulletHeadings[stepNumber], { color: RED });
      gsap.set(videoWrappers[stepNumber], { opacity: 1 });
    }
  }

  function typeWriterIntro() {
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
  }
});
