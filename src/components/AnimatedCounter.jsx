import { useEffect, useRef } from "react";
import { counterItems } from "../constants/index.js";
import { useMotionValue, useTransform, animate, useInView } from "framer-motion";

const CounterValue = ({ targetValue, suffix }) => {
  const elementRef = useRef(null);
  const motionVal = useMotionValue(0);
  const integerVal = useTransform(motionVal, (current) => Math.round(current));
  
  // Monitors viewport visibility. Triggers every single time it comes on screen.
  const isVisible = useInView(elementRef, { margin: "-50px 0px" });

  useEffect(() => {
    if (isVisible) {
      const animationControls = animate(motionVal, targetValue, {
        duration: 2,
        ease: "easeOut",
      });
      return () => animationControls.stop();
    } else {
      motionVal.set(0); // Resets smoothly to 0 when scrolled out of view
    }
  }, [isVisible, motionVal, targetValue]);

    useEffect(() => {
    return integerVal.on("change", (latestValue) => {
      if (elementRef.current) {
        elementRef.current.textContent = `${latestValue}${suffix}`;
      }
    });
  }, [integerVal, suffix]);

  return <span ref={elementRef}>0{suffix}</span>;
};

const AnimatedCounter = () => {
  return (
    <div id="counter" className="px-12 xl:mt-0 mt-32 mb-5">
        <div className="mx-auto grid-4-cols">
            {counterItems.map((item) => (
               /* FIXED: Unique key placed on the outermost element using your real item.id */
               <div key={item.id} className="bg-zinc-900 rounded-lg p-5 flex flex-col justify-center">
                 
                 {/* FIXED: Removed the invalid key syntax here */}
                 <div className="counter-number text-white text-4xl font-bold mb-2">
                   {/* FIXED: Swapped breaking CountUp for the React-19-safe CounterValue wrapper */}
                   <CounterValue targetValue={item.value} suffix={item.suffix} />
                 </div>

                 <div className="text-white-50 text-lg">{item.label}</div>
               </div>
            ))}
        </div>
    </div>

  );
};

export default AnimatedCounter;