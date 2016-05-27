# [Greedy](#greedy)

## [Patching Array](#patching-array)
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

## [Candy](#candy)
```c++
class Solution {
    inline int climb(vector<int>& ratings, int idx, int& leftidx, int& leftcandy){
        int len=ratings.size();
        int sum=(1+idx-leftidx)*(idx-leftidx)/2;
        if(idx-leftidx+1>leftcandy && ratings[leftidx+1]<ratings[leftidx]) sum+=idx-leftidx+1-leftcandy;
        leftidx=idx;
        while(leftidx<len-1){
            if(ratings[leftidx+1]>ratings[leftidx]) leftidx++;
            else break;
        }
        sum+=(3+leftidx-idx)*(leftidx-idx)/2;
        leftcandy=1+leftidx-idx;
        return sum;
    }
public:
    int candy(vector<int>& ratings) {
        int len=ratings.size();
        if(len<=1) return len;
        int i = 0, ans = 0, leftidx=-1,leftcandy=len+1;
        ans += climb(ratings,i,leftidx,leftcandy);
        while(i<len-1){
            if(ratings[i]<=ratings[i-1] && ratings[i]<=ratings[i+1]){
                ans += climb(ratings,i,leftidx,leftcandy);
                i=leftidx+1;
            }
            else i++;
        }
        if(i<len) ans += climb(ratings,i,leftidx,leftcandy);
        return ans;
    }
};
```