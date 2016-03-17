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

