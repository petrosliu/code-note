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

```
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
