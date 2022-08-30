// @ts-check
import { CacheService, MemCacheStrategy } from 'cache-service-lib';

const cacheService = new CacheService();

const strategy = new MemCacheStrategy();
cacheService.registerStrategy('mem', strategy);

export { cacheService };
