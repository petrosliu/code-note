# [Bit Manipulation](#bit-manipulation)

## [Repeated DNA Sequences](#repeated-dna-sequences)
```c++
#define ENCODE(i) ((i-'A'+1)%5)
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        const int len=s.size();
        vector<string> ans;
        if(len<=10) return ans;
        bool exist[0x100000]={};
        bool twice[0x100000]={};
        int code=0,i;
        for(i=0;i<9;i++) code=(code<<2)|ENCODE(s[i]);
        for(i=9;i<len;i++){
            code=((code<<2)&0xFFFFF)|ENCODE(s[i]);
            if(exist[code]){
                if(!twice[code]){
                    ans.push_back(s.substr(i-9,10));
                    twice[code]=true;
                }
            }
            else exist[code]=true;
        }
        return ans;
    }
};
```

## [Gray Code](#gray-code)
```c++
class Solution {
public:
    bool areGrayCode(int a, int b){
        int x=a^b;
        return (x&(x-1))==0;
    }
    
    vector<int> grayCode(int n) {
        vector<int> ans(1<<n,0);
        for(int i=0;i<n;i++){
            int len=1<<i;
            for(int j=0;j<len;j++) ans[(len<<1)-j-1]=ans[j]|len;
        }
        return ans;
    }
};
```

## [Maximum Product of Word Lengths](#maximum-product-of-word-lengths)
```c++
class Solution {
public:
    int maxProduct(vector<string>& words) {
        int len=words.size();
        if(len<=1) return 0;
        int ans=0;
        int mask[len]={};
        for(int i=0;i<len;++i){
            for(auto& c:words[i]) mask[i]|=(1<<(c-'a'));
            for(int j=0;j<i;++j){
                if(0==(mask[i]&mask[j])) ans=max(ans,(int)words[i].size()*(int)words[j].size());
            }
        }
        return ans;
    }
};
```