# [Memoization](#memoization)

## [Perfect Squares](#perfect-squares)
**Static Dynamic Programming**
```c++
class Solution {
public:
    int numSquares(int n) {
        if(n<1) return 0;
        static vector<int> dp(1,0); //static dynamic programming for multiple calls
        for(int i=dp.size();i<=n;i++){
            int mini=INT_MAX;
            for(int j=1;j*j<=i;j++){
                mini=min(mini,1+dp[i-j*j]);
            }
            dp.push_back(mini);
        }
        return dp[n];
    }
};
```
