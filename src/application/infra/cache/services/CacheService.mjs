// @ts-check
import { CacheService, MemCacheStrategy } from "cache-service-lib";

const cacheService = new CacheService();
cacheService.registerStrategy("memCache", new MemCacheStrategy());

export {
	cacheService
};