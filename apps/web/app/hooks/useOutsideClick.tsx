import React from "react";

const useOutsideClick = (ref: React.RefObject<HTMLElement>) => {
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        if (isClicked) {
          setIsClicked(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return [isClicked];
};

export default useOutsideClick;
