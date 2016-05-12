# [Topological Sort](#topological-sort)

## [Longest Increasing Path in a Matrix](#longest-increasing-path-in-a-matrix)
```c++
class Solution {
    int longestIncreasingPath(vector<vector<int>>& matrix,int i, int j, vector<vector<int>> &length){
        if(length[i][j]!=0)return length[i][j];
        int u=1,d=1,l=1,r=1;
        if(i>0&&matrix[i][j]<matrix[i-1][j])u=longestIncreasingPath(matrix,i-1, j, length)+1;
        if(i<matrix.size()-1&&matrix[i][j]<matrix[i+1][j])d=longestIncreasingPath(matrix,i+1, j, length)+1;
        if(j>0&&matrix[i][j]<matrix[i][j-1])l=longestIncreasingPath(matrix,i, j-1, length)+1;
        if(j<matrix[0].size()-1&&matrix[i][j]<matrix[i][j+1])r=longestIncreasingPath(matrix,i, j+1, length)+1;
        length[i][j]=max(max(u,d),max(l,r));
        return length[i][j];
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if(!matrix.size()||!matrix[0].size())return 0;
        vector<int> item(matrix[0].size(),0);
        vector<vector<int>> length(matrix.size(),item);
        int maximum=0;
        for(int i=0;i<matrix.size();i++){
            for(int j=0;j<matrix[0].size();j++){
                maximum=max(longestIncreasingPath(matrix,i,j,length),maximum);
            }
        }
        return maximum;
    }
};
```

## [Course Schedule](#course-schedule)
```c++
class Solution {
private:
    bool dfs(int &i, int &numCourses, vector<vector<int>> &table, vector<int> &order, vector<int> &color, int &orderp){
        color[i]++;
        for(int n:table[i]){
            if(color[n]==0){
                bool hasCircle=dfs(n, numCourses, table, order, color, orderp);
                if(hasCircle) return true;
            }
            else if(color[n]==1) return true;
        }
        color[i]++;
        order[orderp]=i;
        orderp++;
        return false;
    }
public:
    vector<int> findOrder(int numCourses, vector<pair<int, int>>& prerequisites) {
        if(numCourses<=0)return vector<int>();
        vector<int> order(numCourses,-1);
        vector<int> color(numCourses,0);
        vector<vector<int>> table(numCourses,vector<int>());
        for(auto p:prerequisites){
            table[p.first].push_back(p.second);
        }
        
        int orderp=0;
        for(int i=0;i<numCourses;i++){
            if(color[i]==0){
                bool hasCircle=dfs(i, numCourses, table, order, color, orderp);
                if(hasCircle) return vector<int>();
            }
        }
        return order;
    }
};
```