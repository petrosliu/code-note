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

## [Verify Preorder Serialization of a Binary Tree](#verify-preorder-serialization-of-a-binary-tree)
```c++
class Solution {
    void split(string& preorder, vector<bool>& node){
        node.push_back(preorder[0]!='#');
        for(int i=1;i<preorder.size()-1;i++){
            if(preorder[i]==',') node.push_back(preorder[i+1]!='#');
        }
    }
public:
    bool isValidSerialization(string& preorder) {
        int num[10];
        vector<bool> depth;
        vector<bool> node;
        split(preorder,node);
        int len=node.size();
        for(int i=0;i<len;i++){
            if(node[i]) depth.push_back(false);
            else{
                while(depth.size()){
                    if(depth.back()) depth.pop_back();
                    else{ depth.back()=true; break; }
                }
                if(depth.size()==0 && i!=len-1) return false;
            }
        }
        return depth.size()==0;
        
    }
};
```

## [Remove Duplicate Letters](#remove-duplicate-letters)
```c++
class Solution {
public:
    string removeDuplicateLetters(string& s) {
        int counter[26]={};
        bool inside[26]={};
        for(auto& c:s) counter[c-'a']++;
        vector<char> stk;
        for(auto& c:s){
            if(!inside[c-'a']){
                while(!stk.empty() && stk.back()>c && counter[stk.back()-'a']){
                    inside[stk.back()-'a']=false;
                    stk.pop_back();
                }
                stk.push_back(c);
            }
            counter[c-'a']--;
            inside[c-'a']=true;
        }
        return string(stk.begin(),stk.end());
    }
};
```