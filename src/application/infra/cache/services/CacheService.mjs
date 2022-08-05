// @ts-check
import { CacheService, DynamoDbCacheStrategy } from "cache-service-lib";

const cacheService = new CacheService();
cacheService.registerStrategy("memCache", new DynamoDbCacheStrategy({

}, {
	cacheHashValue: "#CACHE",
	hashAttribute: "kind",
	keyAttribute: "key",
	table: "wedding_jose_mari",
	ttlAttribute: "ttl"
}));

export {
	cacheService
};