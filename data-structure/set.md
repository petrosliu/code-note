# [Set](#set)
	
## [Longest Consecutive Sequence](#longest-consecutive-sequence)
```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> S(nums.begin(),nums.end());
        int maxi=0;
        while(!S.empty()){
            auto it=S.begin();
            int n=*it, left=n-1, right=n+1;
            S.erase(it);
            while((it=S.find(left))!=S.end()){
                S.erase(it);
                left--;
            }
            while((it=S.find(right))!=S.end()){
                S.erase(it);
                right++;
            }
            int len=right-left-1;
            if(len>maxi) maxi=len;
        }
        return maxi;
    }
};
```