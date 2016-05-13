# [Design](#design)

## [LRU Cache](#lru-cache)
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

## [Find Median from Data Stream](#find-median-from-data-stream)
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

## [Zigzag Iterator](#zigzag-iterator)

```c++
class ZigzagIterator {
private:
    queue<pair<vector<int>::iterator,vector<int>::iterator>> Q;
public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        if(v1.size()){
            Q.push({v1.begin(),v1.end()});
        }
        if(v2.size()){
            Q.push({v2.begin(),v2.end()});
        }
    }

    int next() {
        auto it=Q.front();
        if(it.first+1!=it.second){
            Q.push({it.first+1,it.second});
        }
        Q.pop();
        return *(it.first);
    }

    bool hasNext() {
        return !Q.empty();
    }
};
```

## [Flatten Nested List Iterator](#flatten-nested-list-iterator)
```c++
class NestedIterator {
private:
    vector<pair<vector<NestedInteger>::iterator,vector<NestedInteger>::iterator>> stack;
public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        stack.push_back({nestedList.begin(),nestedList.end()});
    }

    int next() {
        hasNext();
        return (stack.back().first++)->getInteger();
    }

    bool hasNext() {
        while(!stack.empty()){
            if(stack.back().first==stack.back().second) stack.pop_back();
            else if(!stack.back().first->isInteger()){
                auto &next=stack.back().first->getList();
                stack.back().first++;
                stack.push_back({next.begin(),next.end()});
            }
            else return true;
        }
        return false;
    }
};
```