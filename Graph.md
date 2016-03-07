# Graph

##Reconstruct Itinerary
```c++
class Solution {
private:
    inline int encode(const string &port){
        return port[0]<<16|port[1]<<8|port[2];
    }
    inline string decode(int i){
        string port="000";
        port[2]=i&0xFF;i>>=8; port[1]=i&0xFF;i>>=8; port[0]=i&0xFF;
        return port;
    }
    void findItinerary(vector<string> &ans, const int &from, unordered_map<int,multiset<int>> &hm){
        multiset<int> &curr=hm[from];
        while(curr.size()){
            int next=*curr.begin();
            curr.erase(curr.begin());
            findItinerary(ans, next, hm);
        }
        ans.push_back(decode(from));
    }
public:
    vector<string> findItinerary(vector<pair<string, string>> tickets) {
        unordered_map<int,multiset<int>> hm;
        for(auto ticket:tickets)hm[encode(ticket.first)].insert(encode(ticket.second));

        vector<string> ans;
        findItinerary(ans,encode("JFK"), hm);
        reverse(ans.begin(),ans.end());
        return ans;
    }
};
```