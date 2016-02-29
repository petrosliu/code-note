# Binary Search

##Find Minimum in Rotated Sorted Array
```c++
class Solution {
public:
    int findMin(vector<int>& nums) {
        int len=nums.size();
        if(len==1) return nums[0];
        int l=0,r=len-1;
        while(l<r){
            if(nums[l]<nums[r])return nums[l];
            int m=(l+r)/2;
            if(nums[l]==nums[m]||nums[m]==nums[r]){
                if(nums[l]==nums[m])l++;
                if(nums[m]==nums[r])r--;
            }
            else if(nums[m]>nums[l])l=m+1;
            else if(nums[m]<nums[r])r=m;
        }
        return nums[l];
    }
};
```

##Search in Rotated Sorted Array
```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int len=nums.size();
        if(len<1)return -1;
        int l=0,r=len-1;
        while(l<r){
            int m=(l+r)/2;
            if(nums[m]<nums[r])r=m;
            else l=m+1;
        }
        int start=l,m;
        l=0,r=len-1;
        while(l<r){
            m=(l+r)/2;
            if(nums[(m+start)%len]==target)return (m+start)%len;
            if(nums[(m+start)%len]>target) r=m-1;
            else l=m+1;
        }
        return (nums[(l+start)%len]==target)?(l+start)%len:-1;
    }
};
```

##Search in Rotated Sorted Array II
*Duplicates are allowed.*

```c++
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int len=nums.size();
        if(len<1)return false;
        int l=0,r=len-1;
        while(l<r){
            int m=(l+r)/2;
            if(nums[m]<nums[r])r=m;
            else if(nums[m]>nums[r])l=m+1;
            else if(nums[r-1]==nums[r])r--;
            else l++;
        }
        int start=l,m;
        l=0,r=len-1;
        while(l<r){
            m=(l+r)/2;
            if(nums[(m+start)%len]==target)return true;
            if(nums[(m+start)%len]>target) r=m-1;
            else l=m+1;
        }
        if(nums[(l+start)%len]==target)return true;
        else return false;
    }
};
```