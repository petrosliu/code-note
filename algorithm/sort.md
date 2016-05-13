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
Solution {
public:
    vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {
        if(!intervals.size())return vector<Interval>(1,newInterval);
        int s=newInterval.start;
        int e=newInterval.end;
        if(intervals[0].start>e){
            vector<Interval> a(intervals);
            a.insert(a.begin(),newInterval);
            return a;
        }
        if(intervals.back().end<s){
            vector<Interval> a(intervals);
            a.push_back(newInterval);
            return a;
        }
        
        vector<Interval>::iterator iteb=intervals.begin(),left,right;
        if(intervals[0].end>=s)left=iteb;
        else{
            int l=0,r=intervals.size()-1;
            while(l+1<r){
                int m=(l+r)/2;
                if((iteb+m)->end<s)l=m;
                else r=m;
            }
            left=iteb+r;
        }
        if(intervals.back().start<=e)right=intervals.end()-1;
        else{
            int l=0,r=intervals.size()-1;
            while(l+1<r){
                int m=(l+r)/2;
                if((iteb+m)->start>e)r=m;
                else l=m;
            }
            right=iteb+l;
        }
        
        vector<Interval> a(iteb,left);
        if(right==left-1)a.push_back(newInterval);
        else{
            s=min(s,left->start);
            e=max(e,right->end);
            a.push_back(Interval(s,e));
        }
        copy(right+1,intervals.end(),back_inserter(a));
        return a;
    }
};
```