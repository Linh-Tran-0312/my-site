import { useEffect, useState } from 'react';

const getMediaMatches = (query: string) => {
  return window.matchMedia(query).matches;
};
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(getMediaMatches(query));
  const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange, false);
    return () => mediaQuery.removeEventListener('change', handleChange, false);
  }, [query]);
  return matches;
}
export default useMediaQuery;
