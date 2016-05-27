# [Math](#math)

## [Divide Two Integers](#divide-two-integers)
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

## [Self Crossing](#self-crossing)
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

## [K Nearest Neighbor](#k-nearest-neighbor)
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

## [Count Primes](#count-primes)
```c++
class Solution {
public:
    int countPrimes(int n) {
        if (n<=2) return 0;
        bool passed[n>>1] = {};
        int counter = 1;
        int upper = sqrt(n);
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

## [Next Permutation](#next-permutation)
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

## [Fraction to Recurring Decimal](#fraction-to-recurring-decimal)
```c++
class Solution {
private:
    string fractionToDecimal(long numerator, long denominator) {
        if(numerator==0) return "0";
        if(denominator==0) return "INF";
        if(numerator>0^denominator>0) return "-"+fractionToDecimal(abs(numerator),abs(denominator));
        string ans=to_string(numerator/denominator);
        numerator=(numerator%denominator)*10;
        if(numerator==0) return ans;
        ans+=".";
        unordered_map<int,int> rest;
        int len=ans.size();
        while(numerator!=0 && rest.find(numerator)==rest.end()){
            ans+=to_string(numerator/denominator);
            rest[numerator]=len++;
            numerator=(numerator%denominator)*10;
        }
        if(numerator!=0){
            ans.insert(rest[numerator],"(");
            ans+=")";
        }
        return ans;
    }
public:
    string fractionToDecimal(int numerator, int denominator) {
        return fractionToDecimal((long)numerator,(long)denominator);
    }
};
```


## [Pow(x, n)](#powx-n)
```c++
class Solution {
    double myPow(double x, long n) {
        if(x==1) return 1;
        if(x==-1) return (n&1)?-1:1;
        if(n<0) return myPow(1.0/x,(long)(-n));
        vector<double> slots;
        while(n){
            if(n&1) slots.push_back(x);
            x*=x; n>>=1;
        }
        double ans=1;
        for(auto slot:slots) ans*=slot;
        return ans;
    }
public:
    double myPow(double x, int n) {
        return myPow(x,(long)n);
    }
};
```