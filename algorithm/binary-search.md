# [Binary Search](#binary-search)

## [Median of Two Sorted Arrays](#median-of-two-sorted-arrays)
```c++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int len1 = nums1.size(), len2 = nums2.size();
        if (len1 > len2) return findMedianSortedArrays(nums2,nums1);
        int L1, L2, R1, R2, m1, m2;
        int lo = 0, hi = 2*len1;
        while(lo <= hi) {
            m1 = (lo + hi) / 2;
            m2 = len1 + len2 - m1;
            L1 = (m1 == 0)?      INT_MIN : nums1[(m1-1)/2];
            R1 = (m1 == 2*len1)? INT_MAX : nums1[    m1/2];
            L2 = (m2 == 0)?      INT_MIN : nums2[(m2-1)/2];
            R2 = (m2 == 2*len2)? INT_MAX : nums2[    m2/2];
            //     0 1 2 3       0 1 2 3 4 5 6 7 8
            // 4: [1 4 7 9]  9: [# 1 # 4 # 7 # 9 #]
            //       ^ ^         ^       ^       ^
            // 3: [2 3 5]    7: [# 2 # 3 # 5 #]
            //       ^                 ^
            if(L1 > R2)      hi = m1-1;
            else if(L2 > R1) lo = m1+1;
            else break;
        }
        return (max(L1, L2) + min(R1, R2)) / 2.0;
    }
};
```

## [Find Minimum in Rotated Sorted Array](#find-minimum-in-rotated-sorted-array)
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

## [Search in Rotated Sorted Array](#search-in-rotated-sorted-array)
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

## [Search in Rotated Sorted Array II](#search-in-rotated-sorted-array-ii)
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

## [Search a 2D Matrix II](#search-a-2d-matrix-ii)
```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int h=matrix.size();    if(h==0) return false;
        int w=matrix[0].size(); if(w==0) return false;
        int i=0, j=w-1;
        while (i<h && j>=0) {
            if (matrix[i][j]==target) return true;
            else if (matrix[i][j]>target) j--;
            else i++;
        }
        return false;
    }
};
```