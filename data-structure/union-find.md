# [Union Find](#union-find)

## [Number of Connected Components in an Undirected Graph](#number-of-connected-components-in-an-undirected-graph)
Path Compression: `v=root[v]=root[root[v]];`
```c++
class Solution {
public:
    int countComponents(int n, vector<pair<int, int>>& edges) {
        int root[n];
        for(int i=0;i<n;i++) root[i]=i;
        for(auto& e:edges){
            int v=e.first, w=e.second;
            while(v!=root[v]) v=root[v]=root[root[v]];
            while(w!=root[w]) w=root[w]=root[root[w]];
            if(v!=w) {
                root[v]=w;
                n--;
            }
        }
        return n;
    }
};
```

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