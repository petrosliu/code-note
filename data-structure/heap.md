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