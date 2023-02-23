import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import Swiper, { Navigation } from 'swiper';
import 'swiper/css/bundle';

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const RED = '#ff576d';
const ORANGE = '#fb913a';
const NAVY = '#181d2c';
const GRAY = '#3d414e';
const WHITE = '#ffffff';
const BG_RO_GRADIENT = `linear-gradient(115deg, ${RED}, ${ORANGE})`;
const BG_WHITE_GRADIENT = `linear-gradient(115deg, ${WHITE}, ${WHITE})`;

window.Webflow ||= [];
window.Webflow.push(() => {
  typeWriterIntro();
  functionalitySuiteComponent();

  function functionalitySuiteComponent() {
    const bulletRows = document.querySelectorAll('.bullet-row') as NodeListOf<HTMLAnchorElement>;
    const bullets = document.querySelectorAll('.bullet');
    const bulletLines = document.querySelectorAll('.bullet-line-red');
    const bulletHeadings = document.querySelectorAll('.is-bullet-content');
    const videoWrappers = document.querySelectorAll('.window-wrap-scrollcomp');

    // set initial states
    gsap.set(bullets[0], { backgroundColor: RED, borderColor: RED });
    gsap.set(bulletHeadings[0], { backgroundImage: BG_RO_GRADIENT });
    gsap.set(videoWrappers, { opacity: 0, yPercent: 4 });

    // register the effect with GSAP:
    gsap.registerEffect({
      name: 'videoFadeAndMove',
      effect: (target: GSAPTweenTarget) => {
        return gsap
          .timeline({ defaults: { ease: 'none' } })
          .from(target, {
            opacity: 0,
            duration: 1,
            yPercent: 4,
          })
          .to(target, {
            opacity: 1,
            duration: 10,
            yPercent: 0,
          })
          .to(target, {
            opacity: 1,
            duration: 10,
            yPercent: 0,
          })
          .to(target, {
            opacity: 0,
            duration: 1,
            yPercent: -4,
          });
      },
      extendTimeline: true,
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.sticky-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        //markers: true,
        scrub: 1,
      },
      defaults: {
        ease: 'none',
      },
    });

    // videos
    var videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.sticky-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      defaults: {
        ease: 'none',
      },
    });

    videoTimeline
      .videoFadeAndMove(videoWrappers[0])
      .addLabel('marker1')
      .videoFadeAndMove(videoWrappers[1])
      .videoFadeAndMove(videoWrappers[2])
      .videoFadeAndMove(videoWrappers[3])
      .videoFadeAndMove(videoWrappers[4]);

    masterTimeline
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
      gsap.to(bullets, { backgroundColor: NAVY, borderColor: GRAY });
      gsap.to(bulletHeadings, { backgroundImage: BG_WHITE_GRADIENT });
      gsap.set(bulletLines, { height: '0%' });
      //gsap.set(videoWrappers, { opacity: 0 });

      // set new
      gsap.to(bullets[stepNumber], { backgroundColor: RED, borderColor: RED });
      gsap.to(bulletHeadings[stepNumber], { backgroundImage: BG_RO_GRADIENT });
      //gsap.to(videoWrappers[stepNumber], { opacity: 1 });
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

  function buildSwiper() {
    let swiperMain = new Swiper('.swiper', {
      slidesPerView: 1,
      keyboard: true,
      direction: 'horizontal',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    const twoBtn = document.querySelector('#slide-two-btn');
    const threeBtn = document.querySelector('#slide-three-btn');

    twoBtn?.addEventListener('click', () => {
      swiperMain.slideTo(1);
    });

    threeBtn?.addEventListener('click', () => {
      swiperMain.slideTo(2);
    });
  }
  buildSwiper();

  function laptopSectionScroll() {
    let laptopTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.laptop-lottie',
        start: 'top bottom',
        end: 'top top+=30%', // offset from lottie
        markers: true,
        scrub: true,
      },
    });
    laptopTimeline.to('.laptop-lottie', {
      opacity: 1,
      onComplete: () => {
        const laptopVideos = document.querySelectorAll(
          '[wb-data="laptop-video"]'
        ) as NodeListOf<HTMLVideoElement>;
        laptopVideos.forEach((video) => {
          video.currentTime = 0;
        });
      },
    });
  }
  laptopSectionScroll();
});
