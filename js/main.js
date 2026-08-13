/* ============================================
   MUSICA — Main JavaScript
   ============================================ */

/* ─── Image Data ─── */
const IMAGES = {
  guitar: {
    hero: 'assets/guitar.webp',
    card: 'assets/guitar.webp',
    title: 'Electric Guitar',
    line1: 'Electric',
    line2: 'Guitar',
    desc: 'Experience the perfect blend of craftsmanship, tone, and performance. Our electric guitars are designed to inspire creativity and made for musicians who dare to stand out.',
    accent: '#C87522'
  },

  piano: {
    hero: 'assets/piano.webp',
    card: 'assets/piano.webp',
    title: 'Grand Piano',
    line1: 'Grand',
    line2: 'Piano',
    desc: 'Timeless tone meets elegant craftsmanship. Each grand piano is a masterpiece of acoustic engineering, delivering rich harmonics and responsive touch for the discerning pianist.',
    accent: '#4B155F'
  },

  drums: {
    hero: 'assets/drum.webp',
    card: 'assets/drum.webp',
    title: 'Drum Collection',
    line1: 'Drum',
    line2: 'Collection',
    desc: 'Power, precision and dynamic performance. Our drum kits deliver thunderous lows, crisp highs, and everything in between for the modern rhythm section.',
    accent: '#D8A63C'
  }
};

const FALLBACK_IMG = 'assets/img7.webp';


/* ============================================
   IMAGE ERROR HANDLING
   ============================================ */

function setupImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {

    img.addEventListener('error', () => {

      if (img.dataset.fallbackApplied === 'true') {
        return;
      }

      img.dataset.fallbackApplied = 'true';

      if (FALLBACK_IMG && img.src !== FALLBACK_IMG) {
        img.src = FALLBACK_IMG;
      }
    });

  });
}


/* ============================================
   HEADER SCROLL
   ============================================ */

function initHeader() {

  const header = document.querySelector('.site-header');

  if (!header) return;

  window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

  }, {
    passive: true
  });

}


/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {

    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');

    document.body.classList.toggle(
      'menu-open',
      mobileNav.classList.contains('open')
    );

  });


  mobileNav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');

      document.body.classList.remove('menu-open');

    });

  });

}


/* ============================================
   ACTIVE NAVIGATION
   ============================================ */

function initActiveNav() {

  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  document
    .querySelectorAll('.desktop-nav a, .mobile-nav a')
    .forEach(link => {

      const href = link.getAttribute('href');

      if (
        href === currentPage ||
        (currentPage === '' && href === 'index.html')
      ) {

        link.classList.add('active');

      }

    });

}


/* ============================================
   CUSTOM CURSOR
   ============================================ */

function initCursor() {

  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  const cursor = document.querySelector('.custom-cursor');

  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;


  document.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

  });


  function animate() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animate);

  }

  animate();


  document
    .querySelectorAll(
      'a, button, .instrument-card, .tilt-card, .bento-item'
    )
    .forEach(el => {

      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });

    });

}


/* ============================================
   INSTRUMENT SWITCHING
   ============================================ */

let currentInstrument = 'guitar';


function initInstrumentSwitcher() {

  const cards = document.querySelectorAll('.instrument-card');

  if (!cards.length) return;


  cards.forEach(card => {

    card.addEventListener('click', () => {

      const instrument = card.dataset.instrument;

      if (instrument === currentInstrument) {
        return;
      }

      switchInstrument(instrument);

    });

  });

}


function switchInstrument(instrument) {

  const data = IMAGES[instrument];

  if (!data) return;


  const heroImage =
    document.querySelector('.hero-main-image');

  const line1 =
    document.querySelector('.hero-title .line-1');

  const line2 =
    document.querySelector('.hero-title .line-2');

  const desc =
    document.querySelector('.hero-description');

  const cards =
    document.querySelectorAll('.instrument-card');


  /* ─── Update active card ─── */

  cards.forEach(card => {

    card.classList.toggle(
      'active',
      card.dataset.instrument === instrument
    );

  });


  /* ─── Hero Image Animation ─── */

  if (heroImage) {

    heroImage.style.transition =
      'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    heroImage.style.opacity = '0';

    heroImage.style.transform =
      'scale(0.92) translateX(30px)';

    heroImage.style.filter =
      'blur(8px)';


    setTimeout(() => {

      heroImage.src = data.hero;


      heroImage.onload = () => {

        heroImage.style.opacity = '1';

        heroImage.style.transform =
          'scale(1) translateX(0)';

        heroImage.style.filter =
          'blur(0px)';

      };


      /* Fallback if image loads from cache */
      setTimeout(() => {

        heroImage.style.opacity = '1';

        heroImage.style.transform =
          'scale(1) translateX(0)';

        heroImage.style.filter =
          'blur(0px)';

      }, 100);

    }, 400);

  }


  /* ─── Text Animation ─── */

  if (line1) {

    line1.style.transition =
      'all 0.5s ease';

    line1.style.opacity = '0';

    line1.style.transform =
      'translateY(20px)';


    setTimeout(() => {

      line1.textContent = data.line1;

      line1.style.opacity = '1';

      line1.style.transform =
        'translateY(0)';

    }, 300);

  }


  if (line2) {

    line2.style.transition =
      'all 0.5s ease 0.1s';

    line2.style.opacity = '0';

    line2.style.transform =
      'translateY(20px)';


    setTimeout(() => {

      line2.textContent = data.line2;

      line2.style.opacity = '1';

      line2.style.transform =
        'translateY(0)';

    }, 400);

  }


  if (desc) {

    desc.style.transition =
      'all 0.5s ease 0.2s';

    desc.style.opacity = '0';


    setTimeout(() => {

      desc.textContent = data.desc;

      desc.style.opacity = '1';

    }, 500);

  }


  currentInstrument = instrument;

}


/* ============================================
   3D TILT CARDS
   ============================================ */

function initTiltCards() {

  document
    .querySelectorAll('.tilt-card')
    .forEach(card => {


      card.addEventListener('mousemove', (e) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          (y - centerY) / 15;

        const rotateY =
          (centerX - x) / 15;


        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           scale3d(1.02, 1.02, 1.02)`;

      });


      card.addEventListener('mouseleave', () => {

        card.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

      });

    });

}


/* ============================================
   SCROLL REVEAL
   ============================================ */

function initScrollReveal() {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );


  document
    .querySelectorAll('.reveal')
    .forEach(el => {

      observer.observe(el);

    });

}


/* ============================================
   COVERFLOW
   ============================================ */

function initCoverflow() {

  const track =
    document.querySelector('.coverflow-track');

  if (!track) return;


  const items =
    track.querySelectorAll('.coverflow-item');

  if (!items.length) return;


  let current = 2;


  function update() {

    items.forEach((item, i) => {

      item.classList.toggle(
        'active',
        i === current
      );

    });


    const offset =
      (track.parentElement.offsetWidth / 2) -
      (items[current].offsetWidth / 2) -
      (
        current *
        (items[0].offsetWidth + 32)
      );


    track.style.transform =
      `translateX(${offset}px)`;

  }


  document
    .querySelector('.coverflow-prev')
    ?.addEventListener('click', () => {

      current =
        Math.max(0, current - 1);

      update();

    });


  document
    .querySelector('.coverflow-next')
    ?.addEventListener('click', () => {

      current =
        Math.min(
          items.length - 1,
          current + 1
        );

      update();

    });


  /* ─── Touch / Drag ─── */

  let startX = 0;


  track.addEventListener(
    'touchstart',
    (e) => {

      startX =
        e.touches[0].clientX;

    }
  );


  track.addEventListener(
    'touchend',
    (e) => {

      const diff =
        startX -
        e.changedTouches[0].clientX;


      if (Math.abs(diff) > 50) {

        if (diff > 0) {

          current =
            Math.min(
              items.length - 1,
              current + 1
            );

        } else {

          current =
            Math.max(
              0,
              current - 1
            );

        }

        update();

      }

    }
  );


  update();

}


/* ============================================
   HORIZONTAL TIMELINE SCROLL
   ============================================ */

function initTimeline() {

  const track =
    document.querySelector('.timeline-track');

  if (!track) return;


  const section =
    document.querySelector('.timeline-section');

  if (!section) return;


  if (window.innerWidth > 768) {

    section.addEventListener(
      'wheel',
      (e) => {

        if (
          Math.abs(e.deltaY) >
          Math.abs(e.deltaX)
        ) {

          e.preventDefault();

          track.scrollLeft += e.deltaY;

        }

      },
      {
        passive: false
      }
    );

  }

}


/* ============================================
   FLOATING CARDS PARALLAX
   ============================================ */

function initFloatingCards() {

  const section =
    document.querySelector('.floating-section');

  if (!section) return;


  const cards =
    section.querySelectorAll('.float-card');


  section.addEventListener(
    'mousemove',
    (e) => {

      const rect =
        section.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (e.clientY - rect.top) /
        rect.height -
        0.5;


      cards.forEach((card, i) => {

        const depth =
          (i % 3 + 1) * 8;


        card.style.transform =
          `translateX(${x * depth}px)
           translateY(${y * depth}px)`;

      });

    }
  );


  section.addEventListener(
    'mouseleave',
    () => {

      cards.forEach(card => {

        card.style.transform =
          'translateX(0) translateY(0)';

      });

    }
  );

}


/* ============================================
   PARTICLES
   ============================================ */

function initParticles() {

  const container =
    document.querySelector('.particles');

  if (!container) return;


  for (let i = 0; i < 30; i++) {

    const p =
      document.createElement('div');

    p.className =
      'particle';


    p.style.left =
      Math.random() * 100 + '%';

    p.style.top =
      Math.random() * 100 + '%';


    p.style.animationDelay =
      Math.random() * 8 + 's';


    p.style.animationDuration =
      (6 + Math.random() * 6) + 's';


    p.style.width =
      (2 + Math.random() * 3) + 'px';

    p.style.height =
      p.style.width;


    container.appendChild(p);

  }

}


/* ============================================
   GRID ANIMATION
   ============================================ */

function initGreenGrid() {

  const grid =
    document.querySelector('.green-grid');

  if (!grid) return;


  const svgNS =
    'http://www.w3.org/2000/svg';

  const svg =
    document.createElementNS(
      svgNS,
      'svg'
    );


  svg.setAttribute(
    'width',
    '100%'
  );

  svg.setAttribute(
    'height',
    '100%'
  );


  const spacing = 60;

  const w =
    window.innerWidth;

  const h =
    window.innerHeight;


  /* ─── Vertical Lines ─── */

  for (
    let x = 0;
    x < w;
    x += spacing
  ) {

    const line =
      document.createElementNS(
        svgNS,
        'line'
      );


    line.setAttribute(
      'x1',
      x
    );

    line.setAttribute(
      'y1',
      0
    );

    line.setAttribute(
      'x2',
      x
    );

    line.setAttribute(
      'y2',
      h
    );


    line.setAttribute(
      'stroke',
      '#173F2C'
    );

    line.setAttribute(
      'stroke-width',
      '0.5'
    );

    line.setAttribute(
      'opacity',
      '0.4'
    );


    svg.appendChild(line);

  }


  /* ─── Horizontal Lines ─── */

  for (
    let y = 0;
    y < h;
    y += spacing
  ) {

    const line =
      document.createElementNS(
        svgNS,
        'line'
      );


    line.setAttribute(
      'x1',
      0
    );

    line.setAttribute(
      'y1',
      y
    );

    line.setAttribute(
      'x2',
      w
    );

    line.setAttribute(
      'y2',
      y
    );


    line.setAttribute(
      'stroke',
      '#173F2C'
    );

    line.setAttribute(
      'stroke-width',
      '0.5'
    );

    line.setAttribute(
      'opacity',
      '0.4'
    );


    svg.appendChild(line);

  }


  /* ─── Glowing Intersections ─── */

  for (
    let x = 0;
    x < w;
    x += spacing
  ) {

    for (
      let y = 0;
      y < h;
      y += spacing
    ) {

      const circle =
        document.createElementNS(
          svgNS,
          'circle'
        );


      circle.setAttribute(
        'cx',
        x
      );

      circle.setAttribute(
        'cy',
        y
      );

      circle.setAttribute(
        'r',
        '1.5'
      );

      circle.setAttribute(
        'fill',
        '#2a5c42'
      );

      circle.setAttribute(
        'opacity',
        '0.6'
      );


      svg.appendChild(circle);

    }

  }


  grid.appendChild(svg);


  /* ─── Subtle Scroll Animation ─── */

  window.addEventListener(
    'scroll',
    () => {

      const scrollY =
        window.scrollY;

      svg.style.transform =
        `translateY(${scrollY * 0.05}px)`;

    },
    {
      passive: true
    }
  );

}


/* ============================================
   ASCII REVEAL
   ============================================ */

function initAsciiReveal() {

  const canvas =
    document.getElementById(
      'ascii-canvas'
    );

  const realCanvas =
    document.getElementById(
      'real-image-canvas'
    );


  if (!canvas || !realCanvas) {
    return;
  }


  const ctx =
    canvas.getContext('2d');

  const realCtx =
    realCanvas.getContext('2d');


  const img =
    new Image();


  img.crossOrigin =
    'anonymous';


  /*
    First try img3.webp.
    If it doesn't exist, automatically
    use guitar.webp instead.
  */

  img.src =
    'assets/img3.webp';


  img.onerror = () => {

    console.warn(
      'img3.webp not found. Using guitar.webp for ASCII reveal.'
    );


    img.onerror = null;

    img.src =
      'assets/guitar.webp';

  };


  const chars =
    ' .:-=+*#%@';


  let progress = 0;

  let revealed = false;


  img.onload = () => {

    const w =
      canvas.width =
      canvas.offsetWidth;


    const h =
      canvas.height =
      canvas.offsetHeight;


    realCanvas.width = w;

    realCanvas.height = h;


    const cellSize = 8;


    const cols =
      Math.floor(
        w / cellSize
      );


    const rows =
      Math.floor(
        h / cellSize
      );


    /* ─── Background ─── */

    ctx.fillStyle =
      '#05050A';

    ctx.fillRect(
      0,
      0,
      w,
      h
    );


    ctx.font =
      `${cellSize}px monospace`;


    ctx.fillStyle =
      '#D8A63C';


    /* ─── Real Image ─── */

    realCtx.drawImage(
      img,
      0,
      0,
      w,
      h
    );


    const imgData =
      realCtx.getImageData(
        0,
        0,
        w,
        h
      ).data;


    function getBrightness(x, y) {

      const i =
        (
          Math.floor(y) *
          w +
          Math.floor(x)
        ) * 4;


      return (
        imgData[i] +
        imgData[i + 1] +
        imgData[i + 2]
      ) / 3;

    }


    function drawAscii() {

      ctx.fillStyle =
        '#05050A';


      ctx.fillRect(
        0,
        0,
        w,
        h
      );


      for (
        let y = 0;
        y < rows;
        y++
      ) {

        for (
          let x = 0;
          x < cols;
          x++
        ) {

          const px =
            x * cellSize;

          const py =
            y * cellSize;


          const brightness =
            getBrightness(
              px + cellSize / 2,
              py + cellSize / 2
            );


          const charIndex =
            Math.floor(
              (
                brightness / 255
              ) *
              (
                chars.length - 1
              )
            );


          const char =
            chars[charIndex];


          const distFromCenter =
            Math.sqrt(
              (
                x - cols / 2
              ) ** 2 +
              (
                y - rows / 2
              ) ** 2
            );


          const maxDist =
            Math.sqrt(
              (
                cols / 2
              ) ** 2 +
              (
                rows / 2
              ) ** 2
            );


          const revealThreshold =
            progress *
            maxDist *
            1.5;


          if (
            distFromCenter <
            revealThreshold
          ) {

            ctx.fillStyle =
              `rgba(216, 166, 60, ${
                brightness / 255
              })`;

          } else {

            ctx.fillStyle =
              `rgba(216, 166, 60, ${
                0.1 +
                (brightness / 255) * 0.15
              })`;

          }


          ctx.fillText(
            char,
            px,
            py + cellSize
          );

        }

      }

    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting &&
              !revealed
            ) {

              revealed = true;


              let start = null;


              function animate(timestamp) {

                if (!start) {
                  start = timestamp;
                }


                progress =
                  Math.min(
                    (
                      timestamp - start
                    ) / 2000,
                    1
                  );


                drawAscii();


                if (
                  progress >= 1
                ) {

                  realCanvas.style.transition =
                    'opacity 1.5s ease';

                  realCanvas.style.opacity =
                    '1';


                  canvas.style.transition =
                    'opacity 1.5s ease';

                  canvas.style.opacity =
                    '0';

                } else {

                  requestAnimationFrame(
                    animate
                  );

                }

              }


              requestAnimationFrame(
                animate
              );

            }

          });

        },
        {
          threshold: 0.3
        }
      );


    observer.observe(
      canvas.parentElement
    );

  };

}


/* ============================================
   DOT REVEAL
   ============================================ */

function initDotReveal() {

  const canvas =
    document.getElementById(
      'dot-canvas'
    );


  if (!canvas) {
    return;
  }


  const ctx =
    canvas.getContext('2d');


  const img =
    new Image();


  img.crossOrigin =
    'anonymous';


  /*
    First try img8.webp.
    If it doesn't exist, use piano.webp.
  */

  img.src =
    'assets/img8.webp';


  img.onerror = () => {

    console.warn(
      'img8.webp not found. Using piano.webp for dot reveal.'
    );


    img.onerror = null;

    img.src =
      'assets/piano.webp';

  };


  let dots = [];

  let animating = false;


  img.onload = () => {

    const w =
      canvas.width =
      canvas.offsetWidth;


    const h =
      canvas.height =
      canvas.offsetHeight;


    const tempCanvas =
      document.createElement(
        'canvas'
      );


    tempCanvas.width = w;

    tempCanvas.height = h;


    const tCtx =
      tempCanvas.getContext(
        '2d'
      );


    tCtx.drawImage(
      img,
      0,
      0,
      w,
      h
    );


    const imgData =
      tCtx.getImageData(
        0,
        0,
        w,
        h
      ).data;


    const spacing = 10;


    const cols =
      Math.floor(
        w / spacing
      );


    const rows =
      Math.floor(
        h / spacing
      );


    dots = [];


    for (
      let y = 0;
      y < rows;
      y++
    ) {

      for (
        let x = 0;
        x < cols;
        x++
      ) {

        const px =
          x * spacing;

        const py =
          y * spacing;


        const i =
          (
            py * w +
            px
          ) * 4;


        const brightness =
          (
            imgData[i] +
            imgData[i + 1] +
            imgData[i + 2]
          ) / 3;


        dots.push({

          tx: px,

          ty: py,

          x:
            Math.random() * w,

          y:
            Math.random() * h,

          r:
            1.5 +
            (
              brightness / 255
            ) * 2,

          color:
            `rgba(
              216,
              166,
              60,
              ${
                0.3 +
                (
                  brightness / 255
                ) * 0.7
              }
            )`,

          speed:
            0.02 +
            Math.random() * 0.03,

          delay:
            Math.random() * 1000

        });

      }

    }


    let progress = 0;

    let startTime = null;


    function draw() {

      ctx.fillStyle =
        '#05050A';


      ctx.fillRect(
        0,
        0,
        w,
        h
      );


      dots.forEach(dot => {

        const t =
          Math.max(
            0,
            Math.min(
              1,
              (
                progress -
                dot.delay
              ) / 1000
            )
          );


        const ease =
          t < 0.5
            ? 4 * t * t * t
            : 1 -
              Math.pow(
                -2 * t + 2,
                3
              ) / 2;


        const x =
          dot.x +
          (
            dot.tx -
            dot.x
          ) * ease;


        const y =
          dot.y +
          (
            dot.ty -
            dot.y
          ) * ease;


        ctx.beginPath();


        ctx.arc(
          x,
          y,
          dot.r *
            (
              0.5 +
              ease * 0.5
            ),
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          dot.color;


        ctx.fill();

      });

    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting &&
              !animating
            ) {

              animating = true;

              startTime =
                performance.now();


              function animate(now) {

                progress =
                  now -
                  startTime;


                draw();


                if (
                  progress < 2500
                ) {

                  requestAnimationFrame(
                    animate
                  );

                }

              }


              requestAnimationFrame(
                animate
              );

            }

          });

        },
        {
          threshold: 0.3
        }
      );


    observer.observe(
      canvas.parentElement
    );

  };

}


/* ============================================
   INITIALIZE ALL
   ============================================ */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    setupImageFallbacks();

    initHeader();

    initMobileMenu();

    initActiveNav();

    initCursor();

    initInstrumentSwitcher();

    initTiltCards();

    initScrollReveal();

    initCoverflow();

    initTimeline();

    initFloatingCards();

    initParticles();

    initGreenGrid();

    initAsciiReveal();

    initDotReveal();

  }
);