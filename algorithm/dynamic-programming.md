# [Dynamic Programming](#dynamic-programming)

* **Dynamic Programming:** Solve from trivial sub-problems.
* **Memoization:** Solve from the given problem.

3 characteristics:
1. Stages;
2. States;
3. Recursive Optimization. 

## [Burst Balloons](#burst-balloons)
```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int length=nums.size()+2;
        int n[length];
        n[0]=n[length-1]=1;
        copy(nums.begin(), nums.end(), n+1);
        int dp[length][length]={};
        for(int len=2;len<length;len++){
            for(int l=0;l+len<length;l++){
                int r=l+len;
                for(int final=l+1;final<r;final++){
                    dp[l][r]=max(dp[l][r],n[l]*n[final]*n[r]+dp[l][final]+dp[final][r]);
                }
            }
        }
        return dp[0][length-1];
    }
};
```

## [Dungeon Game](#dungeon-game)
```c++
#define entry(a,b) (a==0?b:(a>=b?1:b-a))
class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        if(dungeon.size()==0||dungeon[0].size()==0)return 0;
        int h=dungeon.size(),w=dungeon[0].size();
        int dp[h][w]={0};
        int i,j;
        j=w-1;i=h-1;dp[i][j]=entry(dungeon[i][j],1);
        j=w-1;
        for(i=h-2;i>=0;i--){
            dp[i][j]=entry(dungeon[i][j],dp[i+1][j]);
        }
        i=h-1;
        for(j=w-2;j>=0;j--){
            dp[i][j]=entry(dungeon[i][j],dp[i][j+1]);
        }
        for(j=w-2;j>=0;j--){
            for(i=h-2;i>=0;i--){
                dp[i][j]=min(entry(dungeon[i][j],dp[i][j+1]),entry(dungeon[i][j],dp[i+1][j]));
            }
        }
        return dp[0][0];
    }
};
```

## [Distinct Subsequences](#distinct-subsequences)
```c++
class Solution {
public:
    int numDistinct(string s, string t) {
        int slen=s.size(),tlen=t.size();
        if(!slen||!tlen) return 0;
        int sum[2][slen+1];
        for(int i=0;i<=slen;i++) sum[0][i]=1;
        
        for(int i=0;i<tlen;i++){
            const char c=t[i];
            int last=i%2,curr=1-last;
            sum[curr][i-1]=sum[last][i-1];
            for(int j=i;j<=slen;j++){
                sum[curr][j]=sum[curr][j-1]+((s[j-1]==c)?sum[last][j-1]:0);
            }
        }
        return sum[tlen%2][slen];
    }
};
```

## [Maximum Subarray](#maximum-subarray)
```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int sum=INT_MIN, lsummin=0, lsum=0, rsum=0;
        for(auto n:nums){
            lsum=rsum;
            rsum=lsum+n;
            lsummin=min(lsummin,lsum);
            sum=max(sum,rsum-lsummin);
        }
        return sum;
    }
};
```

## [Length of Longest Arithmetic Sequence](#length-of-longest-arithmetic-sequence)
```c++
class Solution {
public:
    int lenghtOfLongestAP(vector<int> &nums){
        int len=nums.size();
        if (len<=1) return len;
        sort(nums.begin(),nums.end());
        int L[len][len];
        int llap = 2;

        for (int i = 0; i < len; i++) L[i][len-1] = 2;
        for (int j=len-2; j>=1; j--){
            int i = j-1, k = j+1, mid=nums[j];
            while (i >= 0 && k <= len-1){
                if (nums[i] + nums[k] < 2*mid) k++;
                else if (nums[i] + nums[k] > 2*mid){
                    L[i][j] = 2;
                    i--;
                }
                else{
                    L[i][j] = L[j][k] + 1;
                    llap = max(llap, L[i][j]);
                    i--; k++;
                }
            }
            while (i >= 0){
                L[i][j] = 2;
                i--;
            }
        }
        return llap;
    }
};
```

## [Word Break](#word-break)
```c++
class Solution {
public:
    bool wordBreak(string s, unordered_set<string>& wordDict) {
        bool check[s.size()+1]={};
        check[0]=true;
        for(int i=1;i<=s.size();i++){
            for(int j=i-1;j>=0;j--){
                if(check[j]){
                    if(wordDict.find(s.substr(j,i-j))!=wordDict.end()){
                        check[i]=true;
                        break;
                    }
                }
            }
        }
        return check[s.size()];
    }
};
```

## [Word Break II](#word-break-ii)
```c++
class Solution {
private:
    unordered_map<string,vector<string>> hm={{"",{}}};
public:
    vector<string> wordBreak(string s, unordered_set<string>& wordDict) {
        if(hm.find(s)!=hm.end()) return hm[s];
        vector<string> ans;
        for(int i=0;i<s.size()-1;++i){
            string left=s.substr(0,i+1);
            if(wordDict.find(left)!=wordDict.end()){
                for(auto& right:wordBreak(s.substr(i+1),wordDict)){
                    ans.push_back(left+" "+right);
                }
            }
        }
        if(wordDict.find(s)!=wordDict.end()) ans.push_back(s);
        hm[s]=ans;
        return ans;
    }
};
```

## [Best Time to Buy and Sell Stock with Cooldown](#best-time-to-buy-and-sell-stock-with-cooldown)
** State Machine **
```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int len=prices.size();
        if(len<=1) return 0;
        int buy[len], sell[len], rest[len];
        buy[0]=-prices[0]; sell[0]=INT_MIN; rest[0]=0;
        for(int i=1;i<len;i++){
            buy[i]  = max(buy[i-1], rest[i-1]-prices[i]);
            sell[i] = buy[i-1] + prices[i];
            rest[i] = max(sell[i-1], rest[i-1]);
        }
        return max(sell[len-1], rest[len-1]);
    }
};
```

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

## [Create Maximum Number](#create-maximum-number)
```c++
class Solution {
    inline void maxNumber(vector<int>& res, vector<int>& nums1, vector<int>& nums2){
        int len1=nums1.size(),len2=nums2.size(),i=0;
        bool decided=false;
        while (nums1.size()||nums2.size()) {
            vector<int>& next=nums1>nums2?nums1:nums2;
            int n=next[0];
            next.erase(next.begin());
            if(!decided){
                if(n<res[i]) return;
                else if(n>res[i]) decided=true;
            }
            res[i++]=n;
        }
    }
    inline vector<vector<int>> generatedp(vector<int>& nums, int s, int e){
        vector<vector<int>> dp(e+2,vector<int>());
        dp[e+1]=nums;
        int j=0;
        for(int i=e;i>=s;--i){
            dp[i]=dp[i+1];
            while(dp[i].size()>i){
                while(j<dp[i].size()-1&&dp[i][j]>=dp[i][j+1]) ++j;
                dp[i].erase(dp[i].begin()+j);
                j=max(0,j-1);
            }
        }
        return dp;
    }
public:
    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        int len1=nums1.size(),len2=nums2.size();
        int s1=max(0,k-len2), e1=min(len1,k);
        int s2=max(0,k-len1), e2=min(len2,k);
        vector<vector<int>> dp1=generatedp(nums1,s1,e1);
        vector<vector<int>> dp2=generatedp(nums2,s2,e2);
        vector<int> res(k,0);
        for(int i=s1;i<=e1;++i) maxNumber(res,dp1[i],dp2[k-i]);
        return res;
    }
};
```