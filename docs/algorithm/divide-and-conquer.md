# Divide and Conquer

##Expression Add Operators
```c++
class Solution {
private:
    void dfs(string &num, string prev, const int start, const long target, long* table, vector<string> &ans, const long p){
        int len=num.size();
        if(start>=len&&target==0){
            ans.push_back(prev);
        }else{
            int l=(num[start]=='0')?start+1:len;
            for(int i=start;i<l;i++){
                string piece=num.substr(start,i-start+1);
                int n=table[start*len+i];
                dfs(num,prev+"+"+piece,i+1,target-n,table,ans,n);
                dfs(num,prev+"-"+piece,i+1,target+n,table,ans,-n);
                dfs(num,prev+"*"+piece,i+1,target+p-p*n,table,ans,p*n);
            }
        }
    }
public:
    vector<string> addOperators(string &num, int target) {
        vector<string> ans;
        int len=num.size();
        if(len==0)return ans;
        long table[len*len]={};
        for(int i=0;i<len;i++){
            int c=num[i]-'0';
            int j=i;
            while(j<len){
                for(int k=0;k<=i;k++) table[k*len+j]+=c;
                c*=10;
                j++;
            }
        }
        int l=(num[0]=='0')?1:len;
        for(int i=0;i<l;i++){
            dfs(num,num.substr(0,i+1),i+1,(long)target-table[i],table,ans,table[i]);
        }
        return ans;
    }
};
```