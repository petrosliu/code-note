# Design

##LRU Cache
```c++
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

##Find Median from Data Stream
```c++
class MedianFinder {
private:
    priority_queue<int, vector<int>, greater<int>> topheap;
    priority_queue<int, vector<int>, less<int>> bottomheap;
    
    void balance(){
        while(bottomheap.size()<topheap.size()){
            bottomheap.push(topheap.top());
            topheap.pop();
        }
        while(bottomheap.size()>topheap.size()+1){
            topheap.push(bottomheap.top());
            bottomheap.pop();
        }
    }
    
public:
    void addNum(int num) {
        if(bottomheap.size()==0||num<=bottomheap.top()) bottomheap.push(num);
        else topheap.push(num);
        balance();
    }

    double findMedian() {
        if(bottomheap.size()==0) return 0;
        if(bottomheap.size()==topheap.size()) return (double)(topheap.top()+bottomheap.top())/2;
        return bottomheap.top();
    }
};
```