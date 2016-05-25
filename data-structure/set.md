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

## [Count of Range Sum](#count-of-range-sum)
[Merge Sort Method](../algorithm/divide-and-conquer.html#count-of-range-sum)

**Multiset**
```c++
class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int res=0;
        long sum=0;
        multiset<long> sums={0};
        for(int i=0;i<nums.size();i++){
            sum+=nums[i];
            res+=distance(sums.lower_bound(sum-upper),sums.upper_bound(sum-lower));
            sums.insert(sum);
        }
        return res;
    }
};
```