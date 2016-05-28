# [Binary Search Tree](#binary-search-tree)

## [Count of Smaller Numbers After Self](#count-of-smaller-numbers-after-self)
```c++
class Node{
    public:
        int val, cleft=0, cself=1;
        Node *left=NULL, *right=NULL;
        Node(int i):val(i){};
};
class Solution {
private:
    void insert(Node* root, int i, vector<int>& nums, vector<int>& ans){
        Node* node=root;
        int n=nums[i];
        while(1){
            if(n < node->val){
                node->cleft++;
                if(!node->left) {node->left=new Node(n); break;}
                node=node->left;
            }
            else if(n > node->val){
                ans[i] += node->cleft + node->cself;
                if(!node->right) {node->right=new Node(n); break;}
                node=node->right;
            }
            else{
                ans[i] += node->cleft;
                node->cself++;
                break;
            }
        }
    }
public:
    vector<int> countSmaller(vector<int>& nums) {
        int len=nums.size();
        if(len==0) return {};
        if(len==1) return {0};
        vector<int> ans(len,0);
        Node* root=new Node(nums.back());
        for(int i=len-2;i>=0;--i) insert(root,i,nums,ans);
        return ans;
    }
};
```
See also [Merge Sort Method](/algorithm/divide-and-conquer.html#count-of-smaller-numbers-after-self)

## [Closest Binary Search Tree Value II](#closest-binary-search-tree-value-ii)
```c++
class Solution {
private:
    int search(TreeNode* root, double target, vector<TreeNode*>& path){
        int closest;
        path.push_back(root);
        if(target<root->val && root->left) closest=search(root->left,target,path);
        else if(target>root->val && root->right) closest=search(root->right,target,path);
        else closest=root->val;
        if(fabs(target-(double)closest)>fabs(target-(double)(root->val))){
            while(path.back()!=root) path.pop_back();
            closest=root->val;
        }
        return closest;
    }
    void next(vector<TreeNode*>& path){
        if(path.back()->right){
            TreeNode* node=path.back()->right;
            while(node){
                path.push_back(node);
                node=node->left;
            }
        }
        else{
            while(path.size()>1&&path[path.size()-2]->right==path.back()) path.pop_back();
            path.pop_back();
        }
    }
    void prev(vector<TreeNode*>& path){
        if(path.back()->left){
            TreeNode* node=path.back()->left;
            while(node){
                path.push_back(node);
                node=node->right;
            }
        }
        else{
            while(path.size()>1&&path[path.size()-2]->left==path.back()) path.pop_back();
            path.pop_back();
        }
    }
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        vector<int> closestK;
        if(k==0||root==NULL) return closestK;
        vector<TreeNode*> path1;
        closestK.push_back(search(root,target,path1));
        vector<TreeNode*> path2(path1);
        
        prev(path1); next(path2);
        while(closestK.size()<k){
            if(path1.size()==0&&path2.size()==0) break;
            else if(path2.size()==0){
                closestK.push_back(path1.back()->val); prev(path1);
            }
            else if(path1.size()==0){
                closestK.push_back(path2.back()->val); next(path2);
            }
            else if(fabs(target-(double)(path1.back()->val))<=fabs(target-(double)(path2.back()->val))){
                closestK.push_back(path1.back()->val); prev(path1);
            }
            else{
                closestK.push_back(path2.back()->val); next(path2);
            }
        }
        return closestK;
    }
};
```