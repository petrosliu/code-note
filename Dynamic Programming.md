# Dynamic Programming

##Burst Balloons
```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int len=nums.size();
        int nums_i[len+2];
        nums_i[0]=1;
        for(int i=0;i<len;i++) nums_i[i+1]=nums[i];
        nums_i[len+1]=1;
        len+=2;
        int dp[len][len]={};
        for(int step=2;step<len;step++){
            for(int l=0;l<len-step;l++){
                int r=l+step;
                for(int i=l+1;i<r;i++){
                    int n=nums_i[l]*nums_i[i]*nums_i[r]+dp[l][i]+dp[i][r];
                    dp[l][r]=(dp[l][r]<n)?n:dp[l][r];
                }
            }
        }
        return dp[0][len-1];
    }
};
```

##Dungeon Game
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

##Distinct Subsequences
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

##Maximum Subarray
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

##Length of Longest Arithmetic Sequence
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

##Perfect Squares
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
