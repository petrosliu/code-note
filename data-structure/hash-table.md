# [Hash Table](#hash-table)

## [Copy List with Random Pointer](#copy-list-with-random-pointer)
```c++
class Solution {
public:
    RandomListNode *copyRandomList(RandomListNode *head) {
        if(head==NULL)return NULL;
        for(RandomListNode *p=head;p!=NULL;p=p->next->next){
            RandomListNode *next=p->next;
            p->next=new RandomListNode(p->label);
            p->next->next=next;
        }
        RandomListNode *ret=head->next;
        for(RandomListNode *p=head;p!=NULL;p=p->next->next){
            p->next->random=(p->random)?p->random->next:NULL;
        }
        RandomListNode *p=head;
        while(p){
            RandomListNode *next=p->next;
            if(p->next){
                if(p->next->next){
                    p->next=p->next->next;
                }else{
                    p->next=NULL;
                }
            }
            p=next;
        }
        return ret;
    }
};
```

## [Max Points on a Line](#max-points-on-a-line)
```c++
class Solution {
public:
    int maxPoints(vector<Point> &points) {
        int nums=points.size();
        if((nums)<=2) return nums;
        int result=2;
        for(int i=0; i<nums-1; i++) {
            map<pair<int, int>, int> lines;
            int localmax=0, overlap=1;
            for(int j=i+1; j<nums; j++) {
                int a=points[j].x-points[i].x, b=points[j].y-points[i].y;
                if(a==0 && b==0) overlap++;
                else {
                    int gcd=GCD(a, b);
                    a/=gcd; b/=gcd;
                    lines[make_pair(a, b)]++;
                    localmax=max(lines[make_pair(a, b)], localmax);
                }
            }
            result=max(result, localmax+overlap);
        }
        return result;
    }
private:
    int GCD(int a, int b) {
        if(a==0) return b;
        if(b==0) return a;
        return GCD(b%a,a);
    }
};
```

## [Palindrome Pairs](#palindrome-pairs)
```c++
class Solution {
private:
    inline bool isPalindrome(string& s){
        int i = 0, j = s.size() - 1; 
        while(i < j) if(s[i++] != s[j--]) return false;
        return true;
    }
public:
    vector<vector<int>> palindromePairs(vector<string>& words) {
        unordered_map<string, int> dict;
        vector<vector<int>> pairs;
        for(int i = 0; i < words.size(); i++) {
            string w = words[i];
            reverse(w.begin(), w.end());
            dict[w] = i;
        }
        if(dict.find("")!=dict.end()){
            int idxz=dict[""];
            for(int i = 0; i < words.size(); i++){
                if(i!=idxz && isPalindrome(words[i])) pairs.push_back({idxz, i});
            }
        }
        for(int i = 0; i < words.size(); i++) {
            auto& word=words[i];
            for(int j = 0; j < word.size(); j++) {
                string left = word.substr(0, j);
                string right = word.substr(j);
                if(dict.find(left) != dict.end() && dict[left] != i && isPalindrome(right)) {
                    pairs.push_back({i, dict[left]});
                }
                if(dict.find(right) != dict.end() && dict[right] != i && isPalindrome(left)) {
                    pairs.push_back({dict[right], i});
                }
            }
        }
        return pairs;
    }
};
```