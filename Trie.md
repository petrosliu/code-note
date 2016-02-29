# Trie

##Implement Trie
```
class Trie {
private:
    class TrieNode {
    public:
        TrieNode* next[26]; bool isEnd;
        TrieNode():isEnd(false){memset(next,0,26*sizeof(TrieNode*));}
    };
    TrieNode* root;
public:
    Trie():root(new TrieNode()){}
    void insert(string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx]) p->next[idx]=new TrieNode();
            p=p->next[idx];
        }
        p->isEnd=true;
    }
    bool search(string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx])return false;
            p=p->next[idx];
        }
        return p->isEnd;
    }
};
```

##Word Ladder
```
typedef vector<string> Parents;
typedef unordered_map<string,Parents> Layer;
typedef vector<Layer> SearchTree;

class Trie {
private:
    class TrieNode {
    public:
        TrieNode* next[26]; bool isEnd; string str;
        TrieNode():isEnd(false){memset(next,0,26*sizeof(TrieNode*));}
    };
    TrieNode* root;
    
    void searchLadder(Layer &res, const string &s,TrieNode* &p, const int &idx, const bool &b){
        if(idx==s.size()){
            if(b&&(p->isEnd||res.find(p->str)!=res.end())){
                res[p->str].push_back(s);
                p->isEnd=false;
            }
        }else{
            for(int c=0;c<26;c++){
                if(p->next[c]){
                    if(s[idx]==c+'a')
                        {searchLadder(res,s,p->next[c],idx+1, b);}
                    else if(!b)
                        {searchLadder(res,s,p->next[c],idx+1, true);}
                }
            }
        }
    }
    
public:
    Trie():root(new TrieNode()){}
    void insert(const string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx]) p->next[idx]=new TrieNode();
            p=p->next[idx];
        }
        p->isEnd=true; p->str=s;
    }
    bool search(const string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx])return false;
            p=p->next[idx];
        }
        return p->isEnd;
    }
    void searchLadder(Layer &res,const string &s)
	    {searchLadder(res,s,root,0,false);}
};

class Solution {
private:
    void dfs(vector<vector<string>> &ans,SearchTree &tree, const int &idx, const string &word, vector<string> &path){
        if(idx){
            path[idx]=word;
            Parents &pa=tree[idx][word];
            for(int i=0;i<pa.size();i++) 
                {dfs(ans,tree,idx-1,pa[i],path);}
        }
        else ans.push_back(path);
    }
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, unordered_set<string> &wordList) {
        Trie dict;
        dict.insert(endWord);
        for(auto s:wordList) dict.insert(s);
        vector<vector<string>> ans;
        SearchTree tree;
        tree.push_back(Layer());
        tree[0][beginWord]=Parents();
        
        int i=0,len=wordList.size()+2;
        while(i<len&&tree[i].size()){
            tree.push_back(Layer());
            for(auto it=tree[i].begin();it!=tree[i].end();it++)
                {dict.searchLadder(tree[i+1],it->first);}
            i++;
            if(tree[i].find(endWord)!=tree[i].end())len=i;
        }
        if(tree[i].find(endWord)==tree[i].end())return ans;

        vector<string> path(len+1,"");
        path[0]=beginWord; path[len]=endWord;
        dfs(ans,tree,len,endWord,path);
        return ans;
    }
};
```

##Word Search
```
class Trie {
private:
    class TrieNode {
    public:
        TrieNode* next[26]; bool isEnd; string str;
        TrieNode():isEnd(false){memset(next,0,26*sizeof(TrieNode*));}
    };
public:
    TrieNode* root;
    Trie():root(new TrieNode()){}
    void insert(string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx]) p->next[idx]=new TrieNode();
            p=p->next[idx];
        }
        p->isEnd=true;
        p->str=s;
    }
    bool search(string &s) {
        TrieNode* p=root;
        for(int i=0;i<s.size();i++){
            int idx=s[i]-'a';
            if(!p->next[idx])return false;
            p=p->next[idx];
        }
        return p->isEnd;
    }
    
    void search(vector<vector<char>>& board, const int &i, const int &j, const int &h, const int &w, vector<string> &ans, TrieNode* p){
        int idx=board[i][j]-'a';
        if(board[i][j]&&p->next[idx]){
            TrieNode*&n=p->next[idx];
            if(n->isEnd){ans.push_back(n->str);n->isEnd=false;}
            board[i][j]=0;
            if(i>0) search(board,i-1,j,h,w,ans,n);
            if(i<h-1) search(board,i+1,j,h,w,ans,n);
            if(j>0) search(board,i,j-1,h,w,ans,n);
            if(j<w-1) search(board,i,j+1,h,w,ans,n);
            board[i][j]=idx+'a';
        }
    }
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        int l=words.size();
        if(!l)return vector<string>();
        int h=board.size();
        if(!h)return vector<string>();
        int w=board[0].size();
        if(!w)return vector<string>();
        
        vector<string> ans;
        Trie dict;
        for(int i=0;i<words.size();i++)dict.insert(words[i]);
        
        for(int i=0;i<h;i++){
            for(int j=0;j<w&&ans.size()<l;j++){
                dict.search(board,i,j,h,w,ans,dict.root);
            }
        }
        return ans;
    }
};
```