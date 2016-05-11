# Tree

##Pre Order Traverse
```c++
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ret;
        if(root==NULL)return ret;
        stack<TreeNode*> st;
        st.push(root);
        while(!st.empty())
        {
            TreeNode *curr=st.top();
            st.pop();
            ret.push_back(curr->val);
            if(curr->right)st.push(curr->right);
            if(curr->left)st.push(curr->left);
        }
        return ret;
    }
};
```

##In Order Traverse
```c++
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        vector<TreeNode*> stack;
        TreeNode *cur=root;
        while (cur!=NULL || !stack.empty()){
            if (cur){
                stack.push_back(cur);
                cur = cur->left;
            }
            else {
                cur = stack.back();
                stack.pop_back();
                res.push_back(cur->val);
                cur = cur->right;
            }
        }
        return res;
    } 
};
```

##Post Order Traverse
```c++
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ret;
        if(root==NULL)return ret;
        stack<TreeNode*> st;
        st.push(root);
        while(!st.empty())
        {
            TreeNode *curr=st.top();
            st.pop();
            if(curr->left)st.push(curr->left);
            if(curr->right)st.push(curr->right);
            ret.push_back(curr->val);
        }
        reverse(ret.begin(),ret.end());
        return ret;
    }
};
```