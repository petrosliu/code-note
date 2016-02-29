# Two Pointers

##Find the Duplicate Number
1. 
Suppose there is $$m$$ steps from $$num[0]$$ to entry point, and the length of circle is $$n$$ steps.

2. 
$$slow = m$$

 $$fast = 2m+1$$

3. 
$$D = (Cn + slow) - fast = Cn - (m + 1)$$

4. 
Since fast needs $$D$$ steps to catch up with slow, the distance from meet point to entry point is $$D$$ as well.

5. 
After $$m+1$$ steps, slow would be sure at the entry point $$D1 = D + (m+1) = C*n$$

6. At the second loop, fast should start from $$0$$ rather than $$num[0]$$, so that it would arrive entry point after $$m+1$$ steps.

```c++
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow=nums[0],fast=nums[slow];
        while(slow!=fast){
            slow=nums[slow];
            fast=nums[nums[fast]];
        }
        fast=0;
        while(slow!=fast){
            slow=nums[slow];
            fast=nums[fast];
        }
        return slow;
    }
};
```

##Trapping Rain Water
```c++
class Solution {
public:
    int trap(vector<int>& height) {
        if(height.size()<=2)return 0;
        int peak=0,max=0;
        for(int i=0;i<height.size();i++){
            if(max<height[i]){
                max=height[i];
                peak=i;
            }
        }
        int sum=0;
        for(int i=0;i<peak;i++){
            if(height[i]>height[i+1]){
                sum+=height[i]-height[i+1];
                height[i+1]=height[i];
            }
        }
        for(int i=height.size()-1;i>peak;i--){
            if(height[i]>height[i-1]){
                sum+=height[i]-height[i-1];
                height[i-1]=height[i];
            }
        }
        return sum;
    }
};
```

##4Sum
```c++
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> total;
        int n = nums.size();
        if(n<4) return total;
        sort(nums.begin(),nums.end());
        const int last2=nums[n-2]+nums[n-1];
        const int last3=nums[n-3]+last2;
        for(int i=0;i<n-3;i++){
            int inum=nums[i];
            if(i>0&&inum==nums[i-1]) continue;
            if(inum+nums[i+1]+nums[i+2]+nums[i+3]>target) break;
            if(inum+last3<target) continue;
            for(int j=i+1;j<n-2;j++){
                int jnum=nums[j];
                if(j>i+1&&jnum==nums[j-1]) continue;
                if(inum+jnum+nums[j+1]+nums[j+2]>target) break;
                if(inum+jnum+last2<target) continue;
                int left=j+1,right=n-1;
                while(left<right){
                    int sum=nums[left]+nums[right]+inum+jnum;
                    if(sum<target) left++;
                    else if(sum>target) right--;
                    else{
                        total.push_back({inum,jnum,nums[left],nums[right]});
                        do{left++;}while(nums[left]==nums[left-1]&&left<right);
                        do{right--;}while(nums[right]==nums[right+1]&&left<right);
                    }
                }
            }
        }
        return total;
    }
};
```