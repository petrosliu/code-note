# String

##Substring Problem Template
```c++
int findSubstring(string s){
        int begin=0, end=0; //two pointers, one point to tail and one head
        int minLen=INT_MAX, minBegin=0; //optimal substring
        
        int hm[128]={0};
        int counter; // check whether the substring is valid
        for() { /* initialize the hm and counter here */ }

        while(end<s.size()) {
            if(hm[s[end]] > 0) {
                // modify counter here 
                couter--;
            }
            hm[s[end]]--;
            end++;
            
            while(/* valid counter condition */) {
                
                /* update minLen and minBegin here if finding minimum */
                
                // increase begin to make it invalid/valid again
                if(hm[s[begin]] == 0) {
                    // modify counter here
                    couter++;
                }
                hm[s[begin]]++;
                begin++;
            }  

            /* update minLen and minBegin here if finding maximum */
        }
        
        /* obtain the answer from minLen and minBegin */
        return ans;
  }
```

##Rotation
```c++
class Solution {
public:
    bool isRotated(string a, string b){
        int len=a.size();
        if(len==0 || len!=b.size()) return false;
        a+=a;
        return a.find(b)!=string::npos;
    }
};
```

##Wildcard Matching
```c++
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        int i = 0, j = 0, star = -1, match;
        while (i < m) {
            if (j < n && p[j] == '*') {
                match = i;  
                star = j;
                j++;
            }
            else if (j < n && (s[i] == p[j] || p[j] == '?')) {
                i++;
                j++;
            }
            else if (star >= 0) {
                match++;
                i = match;
                j = star + 1;
            }
            else return false;
        }
        while (j < n && p[j] == '*') j++;
        return j == n;
    }
};
```