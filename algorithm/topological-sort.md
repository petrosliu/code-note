# [Topological Sort](#topological-sort)

## [Longest Increasing Path in a Matrix](#longest-increasing-path-in-a-matrix)
```c++
class Solution {
private:
    int dfs(int i, int j, vector<vector<int>>& matrix, vector<vector<int>>& length){
        if(!length[i][j]) {
            length[i][j]=1;
            if(i>0   && matrix[i-1][j]<matrix[i][j]) length[i][j]=max(length[i][j], dfs(i-1,j,matrix,length)+1);
            if(i<h-1 && matrix[i+1][j]<matrix[i][j]) length[i][j]=max(length[i][j], dfs(i+1,j,matrix,length)+1);
            if(j>0   && matrix[i][j-1]<matrix[i][j]) length[i][j]=max(length[i][j], dfs(i,j-1,matrix,length)+1);
            if(j<w-1 && matrix[i][j+1]<matrix[i][j]) length[i][j]=max(length[i][j], dfs(i,j+1,matrix,length)+1);
        }
        return length[i][j];
    }
    int h,w;
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        h=matrix.size();    if(h==0) return 0;
        w=matrix[0].size(); if(w==0) return 0;
        vector<vector<int>> length(h,vector<int>(w,0));
        int ans=1;
        for(int i=0;i<h;i++) {
            for(int j=0;j<w;j++) {
                ans=max(ans, dfs(i,j,matrix,length));
            }
        }
        return ans;
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

# [Alien Dictionary](#alien-dictionary)
```c++
class Solution {
private:
    bool dfs(unordered_map<char,unordered_set<char>>& hm, char c, string& ans, unordered_map<char,bool>& pending){
        for(auto n:hm[c]){
            if(hm.find(n)==hm.end()) continue;
            if(pending[n]){
                ans="";
                return false;
            }
            else{
                pending[n]=true;
                if(!dfs(hm, n, ans, pending)) return false;
            }
        }
        ans.push_back(c);
        hm.erase(c);
        return true;
    }
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char,unordered_set<char>> hm;
        for(auto w:words)for(auto c:w) hm[c]={};
        for(int i=0;i<words.size()-1;i++){
            int j=0;
            while(j<words[i].size() && j<words[i+1].size() && words[i][j]==words[i+1][j]) j++;
            if(j<words[i].size() && j<words[i+1].size()) hm[words[i][j]].insert(words[i+1][j]);
        }
        string ans;
        unordered_map<char,bool> pending;
        while(hm.size() && dfs(hm, hm.begin()->first, ans, pending));
        reverse(ans.begin(),ans.end());
        return ans;
    }
};
```