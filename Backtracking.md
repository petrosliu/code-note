# Backtracking

##N-Queens
```c++
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

##Sudoku Solver
```c++
class Solution {
private:
    bool col[9][9];
    bool row[9][9];
    bool mat[9][9];
    vector<int> emptyi;
    vector<int> emptyj;
    int emptysize;
    
    inline bool isAvailable(int i, int j, int n){
        return col[i][n]&&row[j][n]&&mat[i/3+(j/3)*3][n];
    }
    
    inline void writeMark(int i, int j, int n, bool v){
        col[i][n]=v;
        row[j][n]=v;
        mat[i/3+(j/3)*3][n]=v;
    }
    
    void loadBoard(vector<vector<char>>& board){
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                col[i][j]=true;
                row[i][j]=true;
                mat[i][j]=true;
            }
        }
        for(int i=0;i<9;i++){
            for(int j=0;j<9;j++){
                char c=board[i][j];
                if(c!='.'){
                    writeMark(i,j,c-'1',false);
                }else{
                    emptyi.push_back(i);
                    emptyj.push_back(j);
                }
            }
        }
        emptysize=emptyi.size();
    }
    
    bool solveSudoku(vector<vector<char>>& board, int idx){
        if(idx==emptysize) return true;
        int i=emptyi[idx],j=emptyj[idx];
        for(int n=0;n<9;n++){
            if(isAvailable(i,j,n)){
                writeMark(i,j,n,false);
                if(solveSudoku(board,idx+1)){
                    board[i][j]=n+'1';
                    return true;
                }
                writeMark(i,j,n,true);
            }
        }
        return false;
    }
    
public:
    void solveSudoku(vector<vector<char>>& board) {
        loadBoard(board);
        solveSudoku(board,0);
    }
};
```