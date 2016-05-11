# Greedy

##Patching Array
```c++
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        int idx=0,ans=0,len=nums.size();
        long pass=0;
        while(pass<n){
            if(idx>=len||nums[idx]>pass+1){
                pass=pass*2+1;
                ans++;
            }
            else{
                pass+=nums[idx];
                idx++;
            }
        }
        return ans;
    }
};
```