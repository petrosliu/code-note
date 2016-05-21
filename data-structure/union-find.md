# [Union Find](#union-find)

## [Number of Islands II](#number-of-islands-ii)
```c++
class Solution {
private:
    inline bool updateRoot(int node, int* tree, int newroot){
        if(tree[node]==0) return false;
        int tmp;
        while(node!=tree[node]){
            tmp=tree[node];
            tree[node]=newroot;
            node=tmp;
        }
        if(tree[node]==newroot) return false;
        tree[node]=newroot;
        return true;
    }
public:
    vector<int> numIslands2(int m, int n, vector<pair<int,int>>& positions) {
        int tree[m*n+1]={};
        vector<int> ans;
        int num=0;
        for(auto& pos:positions){
            int x=pos.first, y=pos.second, p=x*n+y+1;
            if(tree[p]==0){
                tree[p]=p; num++;
                if(x>0   && updateRoot(p-n,tree,p)) num--;
                if(x<m-1 && updateRoot(p+n,tree,p)) num--;
                if(y>0   && updateRoot(p-1,tree,p)) num--;
                if(y<n-1 && updateRoot(p+1,tree,p)) num--;
            }
            ans.push_back(num);
        }
        return ans;
    }
};
```

## [Graph Valid Tree](#graph-valid-tree)
```c++
class Solution {
private:
    inline int getRoot(int* root, int n){
        int r=n,tmp;
        while(root[r]!=r) r=root[r];
        while(root[n]!=r){
            tmp=root[n];
            root[n]=r;
            n=tmp;
        }
        return r;
    }
public:
    bool validTree(int n, vector<pair<int, int>>& edges) {
        int root[n];
        for(int i=0;i<n;i++) root[i]=i;
        for(auto& e:edges){
            if(getRoot(root,e.first)==getRoot(root,e.second)) return false;
            root[root[e.first]]=e.second;
        }
        int ntree=0;
        for(int i=0;i<n;i++) if(root[i]==i) ntree++;
        return ntree==1;
    }
};
```