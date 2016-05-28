# [Segment Tree](#segment-tree)

## [Implement Min Segment Tree](#implement-min-segment-tree)
```c++
struct Node{
    int val,lower,upper;
    Node *left=NULL, *right=NULL;
    Node(int l, int u, int v){
        lower=l;upper=u;val=v;
    }
};
class MinSegTree{
private:
    Node* root=NULL;
    Node* buildTree(vector<int>& nums, int lower, int upper){
        if(lower>upper) return NULL;
        Node* root=new Node(lower,upper,nums[lower]);
        if(lower==upper) return root;
        int m=(lower+upper)/2;
        root->left=buildTree(nums,lower,m);
        root->right=buildTree(nums,m+1,upper);
        if(root->left) root->val=min(root->val,root->left->val);
        if(root->right) root->val=min(root->val,root->right->val);
        return root;
    }
    int getMin(int lower, int upper, Node* node){
        if(node->lower==lower&&node->upper==upper) return node->val;
        int res=INT_MAX;
        int m=(node->lower+node->upper)/2;
        if(upper<=m) res=min(res,getMin(lower,upper,node->left));
        else if(lower>m) res=min(res,getMin(lower,upper,node->right));
        else{
            res=min(res,getMin(lower,m,node->left));
            res=min(res,getMin(m+1,upper,node->right));
        }
        return res;
    }
public:
    MinSegTree(vector<int>& nums){
        int len=nums.size();
        root=buildTree(nums,0,len-1);
    }
    int getMin(int lower, int upper){
        return getMin(lower,upper,root);
    }
};
```