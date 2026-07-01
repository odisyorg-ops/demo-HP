import { useLayoutEffect, useRef, useCallback } from 'react';
import { animate, scroll } from 'framer-motion';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const stackCompletedRef = useRef(false);
  const cleanupFnsRef = useRef([]);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  useLayoutEffect(() => {
    const scroller = useWindowScroll ? document.documentElement : scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scrollerRef.current.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform, filter';
    });

    const cleanups = [];

    cards.forEach((card, i) => {
      const containerHeight = useWindowScroll ? window.innerHeight : scrollerRef.current.clientHeight;
      const stackPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPx = parsePercentage(scaleEndPosition, containerHeight);

      const endEl = useWindowScroll
        ? document.querySelector('.scroll-stack-end')
        : scrollerRef.current?.querySelector('.scroll-stack-end');

      // Framer scroll() tracks element progress relative to the viewport
      const stopScroll = scroll(
        (progress) => {
          // Map raw element progress → our custom scroll math
          const cardOffsetTop = card.offsetTop;
          const endOffsetTop = endEl ? endEl.offsetTop : 0;
          const scrollH = useWindowScroll
            ? document.documentElement.scrollHeight - window.innerHeight
            : scroller.scrollHeight - scroller.clientHeight;
          const scrollTop = progress * scrollH;

          const triggerStart = cardOffsetTop - stackPx - itemStackDistance * i;
          const triggerEnd = cardOffsetTop - scaleEndPx;
          const pinStart = triggerStart;
          const pinEnd = endOffsetTop - containerHeight / 2;

          // Scale
          const scaleProgress =
            scrollTop < triggerStart ? 0
            : scrollTop > triggerEnd ? 1
            : (scrollTop - triggerStart) / (triggerEnd - triggerStart);
          const targetScale = baseScale + i * itemScale;
          const scale = 1 - scaleProgress * (1 - targetScale);

          // Translate Y (pinning)
          let translateY = 0;
          if (scrollTop >= pinStart && scrollTop <= pinEnd) {
            translateY = scrollTop - cardOffsetTop + stackPx + itemStackDistance * i;
          } else if (scrollTop > pinEnd) {
            translateY = pinEnd - cardOffsetTop + stackPx + itemStackDistance * i;
          }

          // Rotation
          const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

          // Blur
          let blur = 0;
          if (blurAmount) {
            let topCardIndex = 0;
            cards.forEach((c, j) => {
              const jTrigger = c.offsetTop - stackPx - itemStackDistance * j;
              if (scrollTop >= jTrigger) topCardIndex = j;
            });
            if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
          }

          animate(card, {
            y: Math.round(translateY * 100) / 100,
            scale: Math.round(scale * 1000) / 1000,
            rotate: Math.round(rotation * 100) / 100,
            filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
          }, { duration: 0 });

          // onStackComplete callback
          if (i === cards.length - 1) {
            const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
            if (isInView && !stackCompletedRef.current) {
              stackCompletedRef.current = true;
              onStackComplete?.();
            } else if (!isInView) {
              stackCompletedRef.current = false;
            }
          }
        },
        { source: useWindowScroll ? document.documentElement : scrollerRef.current }
      );

      cleanups.push(stopScroll);
    });

    cleanupFnsRef.current = cleanups;

    return () => {
      cleanupFnsRef.current.forEach(fn => fn?.());
      stackCompletedRef.current = false;
      cardsRef.current = [];
    };
  }, [
    itemDistance, itemScale, itemStackDistance,
    stackPosition, scaleEndPosition, baseScale,
    rotationAmount, blurAmount, useWindowScroll,
    onStackComplete, parsePercentage,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full h-full overflow-y-auto overflow-x-visible overscroll-contain ${className}`.trim()}
    >
      <div className="px-20 pt-[20vh] pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;