# Sort

##Bucket Sort Maximum Gap
```
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        int length=nums.size();
        if(length<2)return 0;
        int max=0,min=0x7FFFFFFF;
        for(int i=0;i<length;i++){
            int n=nums[i];
            min=(min>n)?n:min;
            max=(max<n)?n:max;
        }
        int unit=(max-min)/length+1;
        vector<int> maxhole(length,-1);
        vector<int> minhole(length,max);
        for(int i=0;i<length;i++){
            int n=nums[i];
            int idx=(n-min)/unit;
            if(maxhole[idx]==-1)maxhole[idx]=minhole[idx]=n;
            else{
                maxhole[idx]=(maxhole[idx]<n)?n:maxhole[idx];
                minhole[idx]=(minhole[idx]>n)?n:minhole[idx];
            }
        }
        int lastmax=min;
        int ret=0;
        for(int i=0;i<length;i++){
            if(maxhole[i]!=-1){
                int diff=maxhole[i]-minhole[i];
                ret=(diff>ret)?diff:ret;
                diff=minhole[i]-lastmax;
                ret=(diff>ret)?diff:ret;
                lastmax=maxhole[i];
            }
        }
        return ret;
    }
};
```