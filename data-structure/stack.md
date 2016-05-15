# [Stack](#stack)

## [Basic Calculator](#basic-calculator)
```c++
class Solution {
public:
    int calculate(string &s) {
        int len=s.size();
        int num[len]; bool pn[len];
        pn[0]=true; num[0]=0;
        int idx=0, c=0;
        while(idx<len){
            switch(s[idx]){
                case ' ':{ 
                    break;
                }
                case '+':{
                    pn[c]=true;
                    break;
                }
                case '-':{
                    pn[c]=false;
                    break;
                }
                case '(': {
                    c++; pn[c]=true; num[c]=0;
                    break;
                }
                case ')': {
                    c--; num[c]+=(pn[c])?num[c+1]:-num[c+1];
                    break;
                }
                default:{
                    int n=0;
                    while(idx<len && s[idx]>='0' && s[idx]<='9'){
                        n=n*10+s[idx]-'0'; idx++;
                    }
                    num[c]+=(pn[c])?n:-n; idx--;
                }
            }
            idx++;
        }
        return num[0];
    }
};
```