# Binary Indexed Tree
##Range Sum Query - Mutable
```c++
class NumArray {
private :
    int len, *num, *sum;
public:
    NumArray(vector<int> &nums) {
        len = nums.size();
        num = (int*)calloc(len+1,sizeof(int));
        sum = (int*)calloc(len+1,sizeof(int));
        for(int i=0; i<len; i++) update(i, nums[i]);
    }

    void update(int idx, int val) {
        int diff=val-num[idx+1];
        for(int i=idx+1;i<=len;i+=(i&-i)) sum[i]+=diff;
        num[idx+1]=val;
    }

    int sumRange(int i, int j) {
        return getSum(j+1)-getSum(i);
    }

    inline int getSum(int idx) {
        int ret=0;
        for(int i=idx;i>0;i-=(i&-i)) ret+=sum[i];
        return ret;
    }
};
```