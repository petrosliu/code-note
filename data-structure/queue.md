# Queue

##Sliding Window Maximum
***Monotonic Queue***
```c++
class Solution {
private:
    inline void monoQueue(vector<int>& nums, deque<int>& q, int i, int k){
        int n=nums[i];
        while(!q.empty()&&q.front()<=i-k) q.pop_front();
        while(!q.empty()&&n>=nums[q.back()]) q.pop_back();
        q.push_back(i);
    }
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> ans;
        int len=nums.size();
        if(len==0||k==0) return ans;
        
        deque<int> q;
        int i;
        for(i=0;i<k&&i<len;i++) monoQueue(nums, q, i, k);
        ans.push_back(nums[q.front()]);
        for(;i<len;i++){
            monoQueue(nums, q, i, k);
            ans.push_back(nums[q.front()]);
        }
        return ans;
    }
};
```

## The Skyline Problem
**Multimap and Multiset**
```c++
class Solution {
public:
    vector<pair<int, int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> skyline;
        multimap<int,int> pts;        
        for(auto b:buildings){
            pts.insert({b[0],b[2]});
            pts.insert({b[1],-b[2]});
        }
        
        multiset<int> hgts;
        hgts.insert(0);
        int curr=0;
        auto it=pts.begin();
        while(it!=pts.end()){
            int pos=it->first;
            while(it!=pts.end() && it->first==pos){
                int h=it->second;
                if(h>0) hgts.insert(h);
                else if(h<0) hgts.erase(hgts.find(-h));
                it++;
            }
            if(curr!=*hgts.rbegin()){
                curr=*hgts.rbegin();
                skyline.push_back({pos,curr});
            }
        }
        return skyline;
    }
};
```