import { useEffect, useRef, useState } from "react";

let render = 0;

export const useEvent = (initialRef: any) => {
  const ref = useRef<any>(initialRef);
  const [state, setState] = useState(initialRef);

  useEffect(() => {
    ref.current = initialRef;
  }, [initialRef]);

  return { event: ref };
};
