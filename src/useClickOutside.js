import { useEffect } from "react";

const useClickOutside = (ref, handler) => {
   console.log(handler, ref);
  useEffect(() => {
    const listener = (event) => {
      console.log(ref.current,ref.current.contains(event.target))
      // Do nothing if clicking ref's element or descendent elements
      // Check if the click occurred inside the element or its children

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // If click is outside, trigger the handler

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
