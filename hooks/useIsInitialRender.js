import React, { useRef, useEffect } from "react";

export default useIsInitialRender = () => {
  const initialRenderRef = useRef(true);

  useEffect(() => {
    initialRenderRef.current = false;
  }, []);

  return initialRenderRef.current;
};
