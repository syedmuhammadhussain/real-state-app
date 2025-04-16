'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NextLink = ({ children, href, ...rest }) => {
  const [prefetching, setPrefetching] = useState(false);
  const linkRef = useRef(null);

  const setPrefetchListener = () => {
    setPrefetching(true);
  };

  const removePrefetchListener = () => {
    setPrefetching(false);
  };

  useEffect(() => {
    const linkElement = linkRef.current;
    if (linkElement) {
      linkElement.addEventListener("mouseover", setPrefetchListener);
      linkElement.addEventListener("mouseleave", removePrefetchListener);
    }

    return () => {
      if (linkElement) {
        linkElement.removeEventListener("mouseover", setPrefetchListener);
        linkElement.removeEventListener("mouseleave", removePrefetchListener);
      }
    };
  }, []);

  return (
    <Link  ref={linkRef} href={href} prefetch={prefetching} {...rest}>
      {children}
    </Link>
  );
};

export default NextLink;
