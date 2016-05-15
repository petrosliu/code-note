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
