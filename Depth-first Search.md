# Depth-first Search

##Populating Next Right Pointers in Each Node
```
class Solution {
private:
    void dfs(TreeLinkNode* root, int level, vector<TreeLinkNode*> &rightmost){
        if(!root)return;
        if(level>=rightmost.size())rightmost.push_back(root);
        else {
            rightmost[level]->next=root;
            rightmost[level]=root;
        }
        dfs(root->left,level+1,rightmost);
        dfs(root->right,level+1,rightmost);
    }
public:
    void connect(TreeLinkNode *root) {
        vector<TreeLinkNode*> rightmost;
        dfs(root,0,rightmost);
    }
};
```

##Remove Invalid Parentheses
```
class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        int lc=0,rc=0;
        for(int i=0;i<s.size();i++){
            if(s[i]=='(')lc++;
            else if(s[i]==')'){
                if(lc==0)rc++;
                else lc--;
            }
        }        
        unordered_set<string> ans;
        dfs(s,lc,rc,0,ans);
        return vector<string>(ans.begin(),ans.end());
    }
private:
    bool check(string &s){
        int c=0;
        for(int i=0;i<s.size();i++){
            if(c<0)return false;
            if(s[i]=='(')c++;
            else if(s[i]==')')c--;
        }
        return (c==0);
    }
    void dfs(string &s, int lc, int rc, int start, unordered_set<string> &ans){
        if(lc==0&&rc==0){
            if(ans.find(s)==ans.end()&&check(s)){
                ans.insert(s);
            }
            return;
        }
        int len=s.size();
        for(int i=start;i<len;i++){
            if(lc>0&&s[i]=='('&&(i==0||s[i-1]!='(')){
                s.erase(s.begin()+i);
                dfs(s,lc-1,rc,i,ans);
                s.insert(s.begin()+i,'(');
            }
            else if(rc>0&&s[i]==')'&&(i==0||s[i-1]!=')')){
                s.erase(s.begin()+i);
                dfs(s,lc,rc-1,i,ans);
                s.insert(s.begin()+i,')');
            }
        }
    }
};
```

##Binary Tree Maximum Path Sum
```
class Solution {
private:
    int dfs(TreeNode* root,int &maxc){
        if(!root)return 0;
        int val=root->val;
        int leftmax=dfs(root->left,maxc)+val;
        int rightmax=dfs(root->right,maxc)+val;
        int m=max(leftmax,val);
        m=max(m,rightmax);
        maxc=max(m,maxc);
        maxc=max(maxc,leftmax+rightmax-val);
        return m;
    }
public:
    int maxPathSum(TreeNode* root) {
        if(!root)return 0;
        int maxc=root->val;
        int m=dfs(root,maxc);
        maxc=max(maxc,m);
        return maxc;
    }
};
```