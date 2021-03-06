# [Two Pointers](#two-pointers)
## [Linked List Cycle](#linked-list-cycle)
1. $$slow=l+k+n_1r$$

 $$fast=l+k+n_2r=2l+2k+2n_1r$$

2. $$l+k=nr$$

3. $$slow+l=l+nr+n_1r$$

```c++
class Solution {
public:
    ListNode* detectCycle(ListNode* head) {
        if(!head) return NULL;
        ListNode* fast=head, *slow=head;
        while(fast && fast->next){
            slow=slow->next;
            fast=fast->next->next;
            if(fast==slow) break;
        }
        if(!fast || !fast->next) return NULL;
        slow=head;
        while(slow!=fast){
            slow=slow->next;
            fast=fast->next;
        }
        return slow;
    }
};
```


## [Find the Duplicate Number](#find-the-duplicate-number)

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

## [Trapping Rain Water](#trapping-rain-water)
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

## [4Sum](#4sum)
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

## [Container With Most Water](#container-with-most-water)
```c++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int len=height.size();
        if(len<2)return 0;
        int i=0,j=len-1,maxi=0;
        while(i<j){
            int h=min(height[i],height[j]);
            maxi=max(maxi,h*(j-i));
            while(i<j&&height[i]<=h)i++;
            while(i<j&&height[j]<=h)j--;
        }
        return maxi;
    }
};
```

## [Minimum Size Subarray Sum](#minimum-size-subarray-sum)
```c++
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int n=nums.size(), j=0, sum=0, l=0x7FFFFFFF;
        for (int i=0;i<n;i++) { 
            sum+=nums[i]; 
            while(sum>=s){
                l=min(l,i-j+1);
                sum-=nums[j];
                j++;
            }
        }
        return (l>n)?0:l;
    }
};
```

## [Longest Substring with At Most Two Distinct Characters](#longest-substring-with-at-most-two-distinct-characters)
```c++
class Solution {
public:
    int lengthOfLongestSubstringTwoDistinct(string& s) {
        int len=s.size();
        int maxlen=0, begin=0, last=0, end=0;
        while(end<len && s[end]==s[0]) end++;
        last=end;
        while(end<len && s[end]==s[last]) end++;
        maxlen=max(maxlen, end);
        while(end<len){
            if(s[end]!=s[begin] && s[end]!=s[last-1]) begin=last;
            last=end;
            while(end<len && s[end]==s[last]) end++;
            maxlen=max(maxlen, end-begin);
        }
        return maxlen;
    }
};
```

## [Longest Substring with At Most K Distinct Characters](#longest-substring-with-at-most-k-distinct-characters)
```c++
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string& s, int k) {
        if(k<=0) return 0;
        int len=s.size();
        if(k>=len) return len;
        int slot[256]={};
        int l=0,r=1,dist=1,maxlen=1;
        slot[s[0]]++;
        while(r<len){
            dist += (slot[s[r]]==0);
            slot[s[r]]++;
            while(dist>k){
                slot[s[l]]--;
                dist -= (slot[s[l]]==0);
                l++;
            }
            maxlen=max(maxlen,r-l+1);
            r++;
        }
        return maxlen;
    }
};
```