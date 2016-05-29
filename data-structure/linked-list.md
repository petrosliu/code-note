# [Linked List](#linked-list)
## [Reverse Linked List](#reverse-linked-list)
```c++
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = NULL, *curr = head, *next;
        while(curr){
            next = curr->next;
            curr->next = prev; 
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
```

## [Reverse Nodes in k-Group](#reverse-nodes-in-k-group)
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

## [Add Two Numbers](#add-two-numbers)
```c++
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int digit=0;
        ListNode *root=new ListNode(0), *node=root;
        while(l1||l2||digit){
            if(l1){digit+=l1->val;l1=l1->next;}
            if(l2){digit+=l2->val;l2=l2->next;}
            node=node->next=new ListNode(digit%10);
            digit/=10;
        }
        return root->next;
    }
};
```