# [Stack](#stack)

## [Basic Calculator](#basic-calculator)
```c++
class Solution {
public:
    int calculate(const string &s) {
        int start=0;
        int len=s.size();
        bool pn[len]; int sum[len];
        pn[0]=true; sum[0]=0;
        int c=0;
        while(start<len){
            switch(s[start]){
                case ' ': 
                break;

                case '+': pn[c]=true;
                break;
                
                case '-': pn[c]=false;
                break;
                
                case '(': c++; pn[c]=true;sum[c]=0;
                break;
                
                case ')': c--; sum[c]+=(pn[c])?sum[c+1]:-sum[c+1];
                break;
                
                default:{
                    int end=start+1;
                    int num=s[start]-'0';
                    while(end<len&&s[end]>='0'&&s[end]<='9'){
                        num=num*10+s[end]-'0';
                        end++;
                    }
                    sum[c]+=(pn[c])?num:-num;
                    start=end-1;
                }
            }
            start++;
        }
        return sum[0];
    }
};
```