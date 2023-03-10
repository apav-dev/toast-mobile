import { useEffect, useRef } from "react";

/**
 * Copied from v1.1 of @yext/search-ui-react
 *
 * This is use to prevent react errors due to performing state update on unmounted component.
 * This error does not need to be suppressed as it will be remove in the next version of React.
 *
 * React PR regarding the issue: https://github.com/facebook/react/pull/22114
 */
export function useComponentMountStatus(): React.MutableRefObject<boolean> {
  const isMountedRef = useRef<boolean>(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}
