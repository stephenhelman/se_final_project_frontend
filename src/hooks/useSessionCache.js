import useWebStorageCache from "./useWebStorageCache";

const useSessionCache = () => useWebStorageCache(window.sessionStorage);

export default useSessionCache;
