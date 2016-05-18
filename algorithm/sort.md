# [Sort](#sort)

## [Bucket Sort Maximum Gap](#bucket-sort-maximum-gap)
```c++
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

## [Insert Interval](#insert-interval)
```c++
class Solution {
public:
    vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {
        int i=0,l=0,r=intervals.size()-1;
        while(l<=r){
            i=(l+r)/2;
            if(intervals[i].end<newInterval.start) l=i+1;
            else r=i-1;
        }
        i=l;
        while(i<intervals.size()){
            if(intervals[i].start>newInterval.end){
                intervals.insert(intervals.begin()+i,newInterval);
                break;
            }
            newInterval.start=min(intervals[i].start, newInterval.start);
            newInterval.end=max(intervals[i].end, newInterval.end);
            intervals.erase(intervals.begin()+i);
        }
        if(i==intervals.size()) intervals.push_back(newInterval);
        return intervals;
    }
};
```

# [Wiggle Sort II](#wiggle-sort-ii)
```c++
class Solution {
private:
    int len;
    inline int dc(int n){return (1+n*2) % (len|1);}
    // 0  1  2  3  4  5  6  7  8  9
    // 5  0  6  1  7  2  8  3  9  4
public:
    void wiggleSort(vector<int>& nums) {
        len=nums.size();
        auto midit=nums.begin()+len/2;
        // Ideal method is "median of medians"
        nth_element(nums.begin(),midit,nums.end());
        int mid=*midit;
        
        int l=0,c=0,r=len-1;
        while(c<=r){
            if(nums[dc(c)]>mid){
                swap(nums[dc(l)],nums[dc(c)]);
                l++;c++;
            }
            else if(nums[dc(c)]<mid){
                swap(nums[dc(c)],nums[dc(r)]);
                r--;
            }
            else c++;
        }
    }
};
```