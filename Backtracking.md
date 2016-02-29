# Backtracking

##N-Queens
```
class Solution {
    int locateLTRD(int row,int col, int n){
        return n-col+row-1;
    }
    int locateLDRT(int row,int col){
        return row+col;
    }
    void solveNQueens(const int row, vector<int>& col,vector<int>& ltrd, vector<int>& ldrt, const int& n, vector<string>& pattern,vector<vector<string>>& result){
        if(row>=n){
            result.push_back(pattern);
            return;
        }
        
        for(int i=0;i<n;i++){
            if(col[i]==-1&&ltrd[locateLTRD(row,i,n)]==-1&&ldrt[locateLDRT(row,i)]==-1){
                pattern[row][i]='Q';
                col[i]=row;
                ltrd[locateLTRD(row,i,n)]=row;
                ldrt[locateLDRT(row,i)]=row;
                solveNQueens(row+1,col,ltrd,ldrt,n,pattern,result);
                pattern[row][i]='.';
                col[i]=-1;
                ltrd[locateLTRD(row,i,n)]=-1;
                ldrt[locateLDRT(row,i)]=-1;
            }
        }
        
    }
    
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<int> col(n,-1);
        vector<int> ltrd(2*n-1,-1);
        vector<int> ldrt(2*n-1,-1);
        string str(n,'.');
        vector<string> pattern(n,str);
        vector<vector<string>> result;
        solveNQueens(0,col,ltrd,ldrt,n,pattern,result);
        return result;
    }
};
```