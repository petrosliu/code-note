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