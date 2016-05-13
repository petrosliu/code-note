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