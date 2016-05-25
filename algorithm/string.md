# [String](#string)

## [Substring Problem Template](#substring-problem-template)
```c++
int findSubstring(string s){
        int begin=0, end=0; //two pointers, one point to tail and one head
        int minLen=INT_MAX, minBegin=0; //optimal substring
        
        int hm[128]={0};
        int counter; // check whether the substring is valid
        for() { /* initialize the hm and counter here */ }

        while(end<s.size()) {
            if(hm[s[end]] > 0) {
                // modify counter here 
                couter--;
            }
            hm[s[end]]--;
            end++;
            
            while(/* valid counter condition */) {
                
                /* update minLen and minBegin here if finding minimum */
                
                // increase begin to make it invalid/valid again
                if(hm[s[begin]] == 0) {
                    // modify counter here
                    couter++;
                }
                hm[s[begin]]++;
                begin++;
            }  

            /* update minLen and minBegin here if finding maximum */
        }
        
        /* obtain the answer from minLen and minBegin */
        return ans;
  }
```

## [Rotation](#rotation)
```c++
class Solution {
public:
    bool isRotated(string a, string b){
        int len=a.size();
        if(len==0 || len!=b.size()) return false;
        a+=a;
        return a.find(b)!=string::npos;
    }
};
```

## [Wildcard Matching](#wildcard-matching)
```c++
class Solution {
public:
    bool isMatch(string &s, string &p) {
        int s_len = s.size(), p_len = p.size();
        int s_idx = 0, p_idx = 0;
        int s_tmp = -1, p_tmp = -1;
        while(s_idx < s_len) {
            if(p_idx < p_len && (p[p_idx] == s[s_idx] || p[p_idx] == '?')){
                p_idx++;
                s_idx++;
            }
            else if(p_idx < p_len && p[p_idx] == '*'){
                while(p_idx+1 < p_len && p[p_idx+1] == '*') p_idx++;
                p_tmp = p_idx;
                s_tmp = s_idx;
                p_idx++;
            }
            else if(p_tmp >= 0){
                p_idx = p_tmp+1;
                s_tmp++;
                s_idx = s_tmp;
            }
            else return false;
        }
        while(p_idx < p_len && p[p_idx] == '*') p_idx++;
        return s_idx == s_len && p_idx == p_len;
    }
};
```

## [Serialize and Deserialize Binary Tree](#serialize-and-deserialize-binary-tree)
**`ostringstream` and `istringstream`**

```c++
class Codec {
public:
    string serialize(TreeNode* root) {
        ostringstream out;
        serialize(root, out);
        return out.str();
    }
    
    TreeNode* deserialize(string data) {
        istringstream in(data);
        return deserialize(in);
    }
    
private:
    void serialize(TreeNode* root, ostringstream& out) {
        if (root) {
            out << root->val << ' ';
            serialize(root->left, out);
            serialize(root->right, out);
        }
        else out << "* ";
    }
    
    TreeNode* deserialize(istringstream& in) {
        string val;
        in >> val;
        if (val[0] == '*') return nullptr;
        TreeNode* root = new TreeNode(stoi(val));
        root->left = deserialize(in);
        root->right = deserialize(in);
        return root;
    }
};
```

## [Regular Expression Matching](#regular-expression-matching)
```c++
class Solution {
private:
    bool isMatch(string &s, string &p, int ss, int ps) {
        if(ss==-1){
            if(ps==-1) return true;
            if(p[ps]=='*') return isMatch(s,p,ss,ps-2);
            return false;
        }
        
        if(p[ps]=='*'){
            if(isMatch(s,p,ss,ps-2)) return true;
            int i=ss;
            char c=p[ps-1];
            while(i>=0&&(c=='.'||c==s[i])){
                if(isMatch(s,p,i-1,ps-2)) return true;
                i--;
            }
            return false;
        }
        
        if(p[ps]=='.'||p[ps]==s[ss]) return isMatch(s,p,ss-1,ps-1);
        return false;
    }
public:
    bool isMatch(string &s, string &p){
        return isMatch(s,p,s.size()-1,p.size()-1);
    }
};
```

## [Basic Calculator II](#basic-calculator-ii)
```c++
class Solution {
public:
    int calculate(string& s) {
        int sum=0, last=0, i=0;
        char opt='+';
        while(i<s.size()){
            if(s[i]=='+'||s[i]=='-'||s[i]=='*'||s[i]=='/') opt=s[i++];
            else if(s[i]>='0' && s[i]<='9'){
                int n=0;
                while(i<s.size() && s[i]>='0' && s[i]<='9'){
                    n=n*10+s[i]-'0'; i++;
                }
                switch(opt){
                    case '+':{
                        sum+=n; last=n;
                        break;
                    }
                    case '-':{
                        sum-=n; last=-n;
                        break;
                    }
                    case '*':{
                        sum+=-last+last*n; last*=n;
                        break;
                    }
                    case '/':{
                        sum+=-last+last/n; last/=n;
                        break;
                    }
                }
            }
            else i++;
        }
        return sum;
    }
};
```

## [Read N Characters Given Read4 II - Call multiple times](#read-n-characters-given-read4-ii---call-multiple-times)
```c++
int read4(char *buf);
class Solution {
private:
    char buffer4[4];
    int len=4, i=4;
public:
    int read(char *buf, int n) {
        char* tmp=buf;
        int num=0;
        while(num<n) {
            if(i==4) {
                len=read4(buffer4);
                i=0;
            }
            else if(i<len) {
                tmp[0]=buffer4[i];
                tmp++; i++; num++;
            }
            else break;
        }
        return num;
    }
};
```

## [Shortest Palindrome](#shortest-palindrome)
**KMP algorithm**
```c++
class Solution {
public:
    string shortestPalindrome(string& s) {
        string r=s;
        reverse(r.begin(),r.end());
        string pattern=s+'#'+r;
        vector<int> kmp(pattern.size(),0);
        for(int i=1;i<kmp.size();i++){
            int j=kmp[i-1];
            while(j>0&&pattern[i]!=pattern[j]) j=kmp[j-1];
            kmp[i]=j+(pattern[i]==pattern[j]);
        }
        return r.substr(0,r.size()-kmp.back())+s;
    }
};
```