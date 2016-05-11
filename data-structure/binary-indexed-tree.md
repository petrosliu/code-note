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

##Range Sum Query 2D - Mutable
```c++
class NumMatrix {
private:
    vector<vector<int>> bit;
    vector<vector<int>>* pmat;
    int h,w;
    
    inline void add(int row, int col, int val){
        for(int i=row+1;i<=h;i+=(i&-i)){
            for(int j=col+1;j<=w;j+=(j&-j)){
                bit[i][j]+=val;
            }
        }
    }
    
    inline int sumRegion(int row, int col){
        int sum=0;
        for(int i=row;i>0;i-=(i&-i)){
            for(int j=col;j>0;j-=(j&-j)){
                sum+=bit[i][j];
            }
        }
        return sum;
    }
    
public:
    NumMatrix(vector<vector<int>> &matrix) {
        pmat=&matrix;
        h=matrix.size();
        if(h==0) return;
        w=matrix[0].size();
        if(w==0) return;
        for(int i=0;i<=h;i++) bit.push_back(vector<int>(w+1,0));
        for(int i=0;i<h;i++){
            for(int j=0;j<w;j++){
                add(i,j,matrix[i][j]);
            }
        }
    }
    
    void update(int row, int col, int val) {
        add(row,col,val-(*pmat)[row][col]);
        (*pmat)[row][col]=val;
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return sumRegion(row2+1,col2+1)-sumRegion(row2+1,col1)-sumRegion(row1,col2+1)+sumRegion(row1,col1);
    }
};
```