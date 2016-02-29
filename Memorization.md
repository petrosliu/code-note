# Memoization

##Longest Increasing Path in a Matrix
```c++
Solution {
    int longestIncreasingPath(vector<vector<int>>& matrix,int i, int j, int length[]){
        if(length[i*matrix[0].size()+j]!=0)return length[i*matrix[0].size()+j];
        int u=1,d=1,l=1,r=1;
        if(i>0&&matrix[i][j]<matrix[i-1][j])u=longestIncreasingPath(matrix,i-1, j, length)+1;
        if(i<matrix.size()-1&&matrix[i][j]<matrix[i+1][j])d=longestIncreasingPath(matrix,i+1, j, length)+1;
        if(j>0&&matrix[i][j]<matrix[i][j-1])l=longestIncreasingPath(matrix,i, j-1, length)+1;
        if(j<matrix[0].size()-1&&matrix[i][j]<matrix[i][j+1])r=longestIncreasingPath(matrix,i, j+1, length)+1;
        length[i*matrix[0].size()+j]=max(max(u,d),max(l,r));
        return length[i*matrix[0].size()+j];
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if(!matrix.size()||!matrix[0].size())return 0;
        //vector<int> item(matrix[0].size(),0);
        //vector<vector<int>> length(matrix.size(),item);
        int length[matrix.size()*matrix[0].size()]={0};
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