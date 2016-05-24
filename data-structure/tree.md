# [Tree](#tree)

## [Pre Order Traverse](#pre-order-traverse)
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

## [In Order Traverse](#in-order-traverse)
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

## [Post Order Traverse](#post-order-traverse)
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

## [Minimum Height Trees](#minimum-height-trees)
```c++
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<pair<int, int>>& edges) {
        if(n==1) return {0};
        unordered_map<int,unordered_set<int>> graph;
        for(auto& e:edges){
            graph[e.first].insert(e.second);
            graph[e.second].insert(e.first);
        }
        queue<int> leaves;
        for(auto& kv:graph){
            if(kv.second.size()<=1) leaves.push(kv.first);
        }
        while(graph.size()>2){
            int num=leaves.size();
            while(num--){
                int v=leaves.front();
                for(auto& w:graph[v]){
                    graph[w].erase(v);
                    if(graph[w].size()==1) leaves.push(w);
                }
                graph.erase(v);
                leaves.pop();
            }
        }
        vector<int> res;
        for(auto& kv:graph)res.push_back(kv.first);
        return res;
    }
};
```