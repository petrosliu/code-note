#Hash Table

##Copy List with Random Pointer
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

##Longest Consecutive Sequence
```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int,bool> hash;
        for(int i=0;i<nums.size();i++){
            hash[nums[i]]=true;
        }
        int max=0;
        for(int i=0;i<nums.size();i++){
            int num=nums[i];
            if(hash[num]){
                hash[num]=false;
                int left=num-1,right=num+1;
                while(hash.find(left)!=hash.end()&&hash[left]){hash[left]=false;left--;}
                while(hash.find(right)!=hash.end()&&hash[right]){hash[right]=false;right++;}
                int l=right-left-1;
                max=(l>max)?l:max;
            }
        }
        return max;
    }
};
```

##Max Points on a Line
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