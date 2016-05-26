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

## [Majority Element](#majority-element)
**Boyer–Moore Majority Vote Algorithm**
```c++
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums, int k) {
        int bound=nums.size()/3; // ⌊lenth/k⌋
        unordered_map<int,int> counter;
        for(auto& n:nums){
            if(counter.find(n)==counter.end()&&counter.size()==k){
                auto it=counter.begin();
                while(it!=counter.end()){
                    if(--(it->second)) it++;
                    else counter.erase(it);
                }
            }
            counter[n]++;
        }
        for(auto& kv:counter) kv.second=0;
        for(auto& n:nums) if(counter.find(n)!=counter.end()) counter[n]++;
        vector<int> res;
        for(auto& kv:counter) if(kv.second>bound) res.push_back(kv.first);
        return res;
    }
};
```