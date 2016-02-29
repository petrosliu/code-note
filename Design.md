# Design

##LRU Cache
```
class LRUCache{
private:
    unordered_map<int,pair<int,list<int>::iterator>> hashmap;
    list<int> cache;
    int cap;
public:
    LRUCache(int capacity):cap(capacity) {}

    int get(int key) {
        auto it=hashmap.find(key);
        if(it==hashmap.end())return -1;
        auto &p=it->second;
        cache.erase(p.second);
        cache.push_front(key);
        p.second=cache.begin();
        return p.first;
    }
    
    void set(int key, int value) {
        auto it=hashmap.find(key);
        if(it!=hashmap.end()){
            auto &p=it->second;
            cache.erase(p.second);
            cache.push_front(key);
        }
        else{
            if(hashmap.size()==cap){
                hashmap.erase(cache.back());
                cache.pop_back();
            }
            cache.push_front(key);
        }
        hashmap[key]={value,cache.begin()};
    }
};
```