// import { useEffect, useState } from 'react';
// Draft, we dont use this currently, but is very important to learn

 enum Breakpoint {
  Xs, // 0-576px
  Sm, // 576-768px
  Md, // 768-992px
  Lg, // 992-1200px
  Xl  // >1200px
}
export const useResponsiveBreakpoints = (width: number) => {
  const getBreakpoint = (width: number) => {
    if (width < 576) {
      return Breakpoint.Xs;
    } else if (width < 768) {
      return Breakpoint.Sm;
    } else if (width < 992) {
      return Breakpoint.Md;
    } else if (width < 1200) {
      return Breakpoint.Lg;
    } else {
      return Breakpoint.Xl;
    }
  };

  let tableClass = '';

  switch (getBreakpoint(width)) {
    case Breakpoint.Xs:
      tableClass = 'responsive-xs';
      break;
    case Breakpoint.Sm:
      tableClass = 'responsive-sm';
      break;
    case Breakpoint.Md:
      tableClass = 'responsive-md';
      break;
    case Breakpoint.Lg:
      tableClass = 'responsive-lg';
      break;
    case Breakpoint.Xl:
      tableClass = 'responsive-xl';
      break;
    default:
      tableClass = 'responsive-xs'; // Fallback für den kleinsten Breakpoint
      break;
  }

  return tableClass;
};

export default useResponsiveBreakpoints;
