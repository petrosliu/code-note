# Linked List

##Reverse Nodes in k-Group
```c++
class Solution {
    bool check(ListNode* head, int k){
        int i=0;
        while(head&&i<k){
            head=head->next;
            i++;
        }
        return i==k;
        
    }
    void reverse(ListNode* &p, int k,ListNode* &front,ListNode* &head){
        ListNode *next=NULL, *curr=NULL,*prev=p;
        for(int i=0;i<k;i++){
            curr=prev;
            prev=curr->next;
            curr->next=next;
            next=curr;
        }
        if(front) front->next=curr;
        else head=curr;
        p->next=prev;
        front=p;
        p=p->next;
    }
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(!head||k<=1)return head;
        ListNode *p=head, *front=NULL;
        while(check(p,k)) reverse(p,k,front,head);
        return head;
    }
};
```