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
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        int i = 0, j = 0, star = -1, match;
        while (i < m) {
            if (j < n && p[j] == '*') {
                match = i;  
                star = j;
                j++;
            }
            else if (j < n && (s[i] == p[j] || p[j] == '?')) {
                i++;
                j++;
            }
            else if (star >= 0) {
                match++;
                i = match;
                j = star + 1;
            }
            else return false;
        }
        while (j < n && p[j] == '*') j++;
        return j == n;
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