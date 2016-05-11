# String

##Substring Problem Template
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

##Rotation
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

##Wildcard Matching
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

##Serialize and Deserialize Binary Tree
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

##Regular Expression Matching
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