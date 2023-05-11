import { useEffect } from "react";

const useClickOutside = (refs, callback) => {
  const handleClickOutside = (event) => {
    if (refs.some((ref) => ref.current && ref.current.contains(event.target))) {
      return;
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs]);
};

export default useClickOutside;
