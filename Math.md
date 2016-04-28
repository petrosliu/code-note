# Math

##Divide Two Integers
```c++
class Solution {
public:
    int divide(int dividend, int divisor) {
        if(!divisor || (dividend==0x80000000&&divisor==-1)) return 0x7FFFFFFF;
        bool sign=(dividend>0 ^ divisor<0);
        long ldividend=labs(dividend);
        long ldivisor=labs(divisor);
        if(ldividend<ldivisor)return 0;
        long ans=0;
        long tmp=ldivisor<<31;
        for(int i=31;i>=0;i--){
            ans<<=1;
            if(tmp<=ldividend){
                ldividend-=tmp;
                ans+=1;
            }
            tmp>>=1;
        }
        return (sign)?ans:-ans;
    }
};
```

##Self Crossing
```c++
class Solution {
public:
    bool isSelfCrossing(vector<int>& x) {
        int len = x.size();
        for(int i=3; i<len;++i){
            if(x[i]>=x[i-2] && x[i-1]<=x[i-3]) return true;
            if(i>=4 && x[i-1]==x[i-3] && x[i]+x[i-4]>=x[i-2]) return true;
            if(i>=5 && x[i-2]>=x[i-4] && x[i]+x[i-4]>=x[i-2] && x[i-1]<=x[i-3] && x[i-5]+x[i-1]>=x[i-3]) return true;
        }
        return false;
    }
};
```

##K Nearest Neighbor
```c++
class Solution {
public:
    vector<pair<int,int>> knn(const vector<pair<int,int>> &points, const pair<int,int> &origin, const unsigned int k){
        int num=points.size();
        if(k>num) return points;
        set<pair<int,int>> q;
        for(int i=0;i<num;i++){
            const pair<int,int>& p=points[i];
            int dist=(p.first-origin.first)*(p.first-origin.first)+(p.second-origin.second)*(p.second-origin.second);
            q.insert(make_pair(dist, i));
        }
        
        vector<pair<int,int>> ans;
        int i=0;
        for(auto ite=q.begin();ite!=q.end() && i<k; ite++, i++){
            ans.push_back(points[ite->second]);
        }
        return ans;
    }
};
```

##Count Primes
```c++
class Solution {
public:
    int countPrimes(const int n) {
        if (n<=2) return 0;
        bool passed[n>>1] = {};
        int counter = 1;
        const int upper = sqrt(n);
        for (int i=3; i<n; i+=2) {
            if (!passed[i>>1]) {
                counter++;
                if (i <= upper) {
                    for (int j=i*i; j<n; j+=2*i) {
                        passed[j>>1] = true;
                    }
                }
            }
        }
        return counter;
    }
};
```

##Next Permutation
```c++
class Solution {
public:
    void nextPermutation(vector<int> &num) 
    {
        if (num.empty()) return;
        int i,j;
        for (i = num.size()-2; i >= 0; i--){
            if (num[i] < num[i+1]) break;
        }
        reverse(num.begin()+i+1, num.end());
        // if violated number not found
        if (i == -1) return;
        // else find the first number larger than the violated number
        for (j = i+1; j < num.size(); j++){
            if (num[i] < num[j]) break;
        }
        swap(num[i], num[j]);
    }
};
```