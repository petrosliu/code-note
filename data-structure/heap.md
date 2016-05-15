# [Heap](#heap)

## [Meeting Rooms II](#meeting-rooms-ii)
```c++
bool mycomp(Interval& l, Interval& r){return l.start<r.start;}
class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        sort(intervals.begin(),intervals.end(),mycomp);
        priority_queue<int,vector<int>,greater<int>> pq;
        for(auto i:intervals){
            if(pq.size()&&pq.top()<=i.start) pq.pop();
            pq.push(i.end);
        }
        return pq.size();
    }
};
```

## [Top K Frequent Elements](#top-k-frequent-elements)
```c++
struct mycomp{
    bool operator() (unordered_map<int,int>::iterator& l, unordered_map<int,int>::iterator& r){
        return l->second>r->second;
    }
};

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> hm;
        for(auto n:nums) hm[n]++;
        priority_queue<unordered_map<int,int>::iterator,vector<unordered_map<int,int>::iterator>,mycomp> pq;
        for(auto it=hm.begin();it!=hm.end();it++){
            pq.push(it);
            if(pq.size()>k)pq.pop();
        }
        vector<int> ans;
        while(pq.size()){ans.push_back(pq.top()->first);pq.pop();}
        return ans;
    }
};
```