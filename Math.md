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