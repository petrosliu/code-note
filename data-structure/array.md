# [Array](#array)
## [Rotate Array](#rotate-array)
```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k%=nums.size();
        reverse(nums.begin(),nums.end());
        reverse(nums.begin(),nums.begin()+k);
        reverse(nums.begin()+k,nums.end());
    }
};
```
```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int len=nums.size(),idx=0;
        k%=len;
        while(k){
            for(int i=0;i<k;i++) swap(nums[idx+i],nums[idx+len-k+i]);
            idx+=k;len-=k;k%=len;
        }
    }
};
```