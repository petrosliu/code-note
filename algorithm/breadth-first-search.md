# [Breadth-first Search](#breadth-first-search)

## [Shortest Distance from All Buildings](#shortest-distance-from-all-buildings)
```c++
class Solution {
public:
    int shortestDistance(vector<vector<int>> grid) {
        int h=grid.size();    if(h==0) return -1;
        int w=grid[0].size(); if(w==0) return -1;
        vector<vector<int>> sum(grid);
        queue<pair<pair<int,int>,int>> q;
        int idx=0;
        for(int i=0;i<h;i++){
            for(int j=0;j<w;j++){
                if(grid[i][j]==1){
                    q.push({{i,j},0});
                    while(q.size()){
                        auto& curr=q.front();
                        int k=curr.first.first, l=curr.first.second, dist=curr.second;
                        q.pop();
                        if(grid[k][l]==idx-1) sum[k][l]+=dist;
                        if(k>0   && grid[k-1][l]==idx) {q.push({{k-1,l},dist+1}); grid[k-1][l]--;}
                        if(k<h-1 && grid[k+1][l]==idx) {q.push({{k+1,l},dist+1}); grid[k+1][l]--;}
                        if(l>0   && grid[k][l-1]==idx) {q.push({{k,l-1},dist+1}); grid[k][l-1]--;}
                        if(l<w-1 && grid[k][l+1]==idx) {q.push({{k,l+1},dist+1}); grid[k][l+1]--;}
                    }
                    idx--;
                }
            }
        }
        int mini=INT_MAX;
        for(int i=0;i<h;i++){
            for(int j=0;j<w;j++){
                if(grid[i][j]==idx) mini=min(mini,sum[i][j]);
            }
        }
        return (mini==INT_MAX)?-1:mini;
    }
};
```