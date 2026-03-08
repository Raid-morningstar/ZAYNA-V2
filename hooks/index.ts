import { useEffect, useRef, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useOutsideClick<T extends HTMLElement>
(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, [callback]);

  return ref;
}

export function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
