import useWebStorageCache from "./useWebStorageCache";

const useLocalCache = () => useWebStorageCache(window.localStorage);

export default useLocalCache;
