# [Binary Search Tree](#binary-search-tree)

## [Count of Smaller Numbers After Self](#count-of-smaller-numbers-after-self)
```c++
class Node{
public:
    int index, lessorequal=1;
    Node *left=NULL,*right=NULL;
    Node(int i):index(i){}
};

class Solution {
private:
    Node* root=NULL;
    inline void insert(vector<int> &nums, int i, vector<int> &ans){
        if(!root){root=new Node(i);return;}
        Node* nd=root;
        int n=nums[i];
        while(1){
            if(n<=nums[nd->index]){
                nd->lessorequal++;
                if(!nd->left){
                    nd->left=new Node(i);
                    break;
                }
                nd=nd->left;
            }
            else{
                ans[i]+=nd->lessorequal;
                if(!nd->right){
                    nd->right=new Node(i);
                    break;
                }
                nd=nd->right;
            }
        }
    }
public:
    vector<int> countSmaller(vector<int>& nums) {
        int len=nums.size();
        if(len==0) return vector<int>();
        vector<int> ans(len,0);
        for(int i=len-1;i>=0;i--) insert(nums,i,ans);
        return ans;
    }
};
```
