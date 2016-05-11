# Bit Manipulation

##Repeated DNA Sequences
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

##Gray Code
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