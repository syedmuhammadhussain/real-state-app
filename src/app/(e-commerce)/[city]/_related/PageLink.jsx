import NextLink from '@/components/ui/NextLink';
import React from 'react'

const PageLink = ({ href, children, disabled, active }) => {
    return (
      <NextLink
        href={href}
        className={`rounded-xl px-4 py-2 transition-all ${
          active
            ? "pointer-events-none bg-primary-dark text-white"
            : disabled
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "border bg-white text-gray-700 hover:bg-primary-light hover:text-white"
        }`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </NextLink>
    );
  }

export default PageLink