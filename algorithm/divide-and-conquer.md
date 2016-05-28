# [Divide and Conquer](#divide-and-conquer)

## [Expression Add Operators](#expression-add-operators)
```c++
class Solution {
private:
    void dfs(string &num, string prev, const int start, const long target, long* table, vector<string> &ans, const long p){
        int len=num.size();
        if(start>=len&&target==0){
            ans.push_back(prev);
        }else{
            int l=(num[start]=='0')?start+1:len;
            for(int i=start;i<l;i++){
                string piece=num.substr(start,i-start+1);
                int n=table[start*len+i];
                dfs(num,prev+"+"+piece,i+1,target-n,table,ans,n);
                dfs(num,prev+"-"+piece,i+1,target+n,table,ans,-n);
                dfs(num,prev+"*"+piece,i+1,target+p-p*n,table,ans,p*n);
            }
        }
    }
public:
    vector<string> addOperators(string &num, int target) {
        vector<string> ans;
        int len=num.size();
        if(len==0)return ans;
        long table[len*len]={};
        for(int i=0;i<len;i++){
            int c=num[i]-'0';
            int j=i;
            while(j<len){
                for(int k=0;k<=i;k++) table[k*len+j]+=c;
                c*=10;
                j++;
            }
        }
        int l=(num[0]=='0')?1:len;
        for(int i=0;i<l;i++){
            dfs(num,num.substr(0,i+1),i+1,(long)target-table[i],table,ans,table[i]);
        }
        return ans;
    }
};
```

## [Count of Range Sum](#count-of-range-sum)
**Merge Sort**
```c++
class Solution {
private:
    int mergesort(long* sums, int left, int right, int lower, int upper){
        int mid=(left+right)/2;
        int res=0;
        if(left<mid) res+=mergesort(sums,left,mid,lower,upper);
        if(mid+1<right) res+=mergesort(sums,mid+1,right,lower,upper);
        
        int i,j,k;
        for(i=left,j=k=mid+1;i<=mid;i++){
            while(j<=right&&sums[j]-sums[i]<lower) ++j;
            while(k<=right&&sums[k]-sums[i]<=upper) ++k;
            res+=k-j;
        }
        
        long buff[right-left+1];
        i=left;j=mid+1;k=0;
        while(i<=mid&&j<=right){
            buff[k++]=(sums[i]<=sums[j])?sums[i++]:sums[j++];
        }
        while(i<=mid) buff[k++]=sums[i++];
        while(j<=right) buff[k++]=sums[j++];
        for(i=left,k=0;i<=right;i++) sums[i]=buff[k++];
        return res;
    }
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int len=nums.size();
        long sums[len+1];
        sums[0]=0;
        for(int i=0;i<nums.size();i++) sums[i+1]=sums[i]+nums[i];
        return mergesort(sums,0,len,lower,upper);
    }
};
```
See also [Multiset Method](/data-structure/set.html#count-of-range-sum)

## [Count of Smaller Numbers After Self](#count-of-smaller-numbers-after-self)
```c++
class Solution {
private:
    void mergesort(vector<int>& res, vector<int>& nums, vector<int>& index, int l, int r){
        if(l>=r) return;
        int m=(l+r)/2;
        mergesort(res,nums,index,l,m);
        mergesort(res,nums,index,m+1,r);
        int i,j=m+1,k;
        for(i=l;i<=m;i++){
            int val=nums[index[i]];
            while(j<=r&&nums[index[j]]<val) j++;
            res[index[i]]+=j-m-1;
        }
        int temp[r-l+1];
        i=l;j=m+1;k=0;
        while(i<=m&&j<=r) temp[k++]=(nums[index[i]]<=nums[index[j]])?index[i++]:index[j++];
        while(i<=m) temp[k++]=index[i++];
        while(j<=r) temp[k++]=index[j++];
        for(i=l,k=0;i<=r;i++,k++) index[i]=temp[k];
    }
public:
    vector<int> countSmaller(vector<int>& nums) {
        int len=nums.size();
        vector<int> index(len,0);
        vector<int> res(len,0);
        for(int i=0;i<len;i++) index[i]=i;
        mergesort(res,nums,index,0,len-1);
        return res;
    }
};
```
See also [Binary Search Tree Method](/data-structure/binary-search-tree.html#count-of-smaller-numbers-after-self)