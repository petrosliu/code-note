# STL (Standard Template Library)
 ```c++
 using namespace std;
 ```
##Container

###Sequence containers
####vector
```c++
  #include <vector>
  vector<int> myvector = {10,20,30};
  // constructors used in the same order as described above:
  vector<int> first;                                // empty vector of ints
  vector<int> second (4,100);                       // four ints with value 100
  vector<int> third (second.begin(),second.end());  // iterating through second
  vector<int> fourth (third);                       // a copy of third

  // the iterator constructor can also be used to construct from arrays:
  int myints[] = {16,2,77,29};
  vector<int> fifth (myints, myints + sizeof(myints) / sizeof(int) );
  
  it = myvector.begin();
  it = myvector.insert (it, 200);
  it = myvector.erase (it+5);
  it = myvector.erase (it+1, it+5);
  
  myvector.push_back(5);
  myvector.pop_back();
  myvector.back();
  myvector.front();
  auto it = myvector.begin();
  auto it = myvector.end();
```

####deque
```c++
  #include <deque>
  // constructors used in the same order as described above:
  deque<int> first;                                // empty deque of ints
  deque<int> second (4,100);                       // four ints with value 100
  deque<int> third (second.begin(),second.end());  // iterating through second
  deque<int> fourth (third);                       // a copy of third

  // the iterator constructor can be used to copy arrays:
  int myints[] = {16,2,77,29};
  deque<int> fifth (myints, myints + sizeof(myints) / sizeof(int) );
  
  it = mydeque.begin();
  it = mydeque.insert (it, 200);
  it = mydeque.erase (it+5);
  it = mydeque.erase (it+1, it+5);
  
  mydeque.push_front(5);
  mydeque.pop_front();
  mydeque.push_back(5);
  mydeque.pop_back();
  mydeque.back();
  mydeque.front();
  it = mydeque.begin();
  it = mydeque.end();
```
####list
```c++
  #include <list>
  // constructors used in the same order as described above:
  list<int> first;                                // empty list of ints
  list<int> second (4,100);                       // four ints with value 100
  list<int> third (second.begin(),second.end());  // iterating through second
  list<int> fourth (third);                       // a copy of third

  // the iterator constructor can also be used to construct from arrays:
  int myints[] = {16,2,77,29};
  list<int> fifth (myints, myints + sizeof(myints) / sizeof(int) );
  
  it = mylist.begin();
  it = mylist.insert (it, 200);
  it = mylist.erase (it+5);
  it = mylist.erase (it+1, it+5);
  
  mylist.push_front(5);
  mylist.pop_front();
  mylist.push_back(5);
  mylist.pop_back();
  mylist.back();
  mylist.front();
  it = mylist.begin();
  it = mylist.end();
  mylist.size() //slow

  bool mycomp (int first, int second) { return first > second; }
  mylist.sort();
  mylist.sort(mycomp);
  mylist.merge(mylist2);
  mylist.merge(mylist2, mycomp);
  mylist.unique();
  mylist.reverse();
```

####String (is not a container)
```c++
  #include <string>
  string s0 ("Initial string");
  string s1;
  string s2 (s0);
  string s3 (s0, 8, 3); \\"str"
  string s4 ("A character sequence", 6); \\"A char"
  string s6 (10, 'x');
  string s7 (s0.begin(), s0.begin()+7);
  
  str.push_back('!');
  str.pop_back();
  str.front();
  str.back();
  it = str.begin();
  it = str.end();
  name += " K. ";         // c-string
  name += family;         // string
  str.reserve();
  
  str.append(str2);                       // "Writing "
  str.append(str3,6,3);                   // "10 "
  str.append("dots are cool",5);          // "dots "
  str.append("here: ");                   // "here: "
  str.append(10u,'.');                    // ".........."
  str.append(str3.begin()+8,str3.end());  // " and then 5 more"
  str.append<int>(5,0x2E);                // "....."
  str.insert(6,str2);                 // to be (the )question
  str.insert(6,str3,3,4);             // to be (not )the question
  str.insert(10,"that is cool",8);    // to be not (that is )the question
  str.insert(10,"to be ");            // to be not (to be )that is the question
  str.insert(15,1,':');               // to be not to be(:) that is the question
  it = str.insert(str.begin()+5,','); // to be(,) not to be: that is the question
  str.insert (str.end(),3,'.');       // to be, not to be: that is the question(...)
  str.insert (it+2,str3.begin(),str3.begin()+3); // (or )
  str.erase (10); //10~npos
  str.erase (10,8); //10~18
  str.erase (str.begin()+9); //9
  str.erase (str.begin()+5, str.end()-9); //5~npos-9
  
  size_t found = str.find(str2) != string::npos;
  found=str.find("needles are small", 1);
  found=str.find("needles are small", 1, 6);
  found=str.find("haystack");
  found=str.find('.');
  found=str.find('.', 6);
  str.rfind(...)
  str.find_first_of(...)
  str.find_last_of(...)
  str.find_first_not_of(...)
  str.find_last_not_of(...)
  
  string str2 = str.substr (3,5);
```

###Associated containers

####set/unordered_set
```c++
  #include <set>
  struct classcomp {
    bool operator() (const int& lhs, const int& rhs) const {return lhs<rhs;}
  };
  set<int,classcomp> fifth;                 // class as Compare

  itlow=myset.lower_bound (30);                //->30
  itup=myset.upper_bound (60);                 //->70
  
  #include <unordered_set>
  unordered_set<string> first;                                // empty
  unordered_set<string> second ( {"red","green","blue"} );    // init list
  unordered_set<string> third ( {"orange","pink","yellow"} ); // init list
  unordered_set<string> fourth ( second );                    // copy
  unordered_set<string> fifth ( cmerge(third,fourth) );       // move
  unordered_set<string> sixth ( fifth.begin(), fifth.end() ); // range
  
  it = myset.begin();
  it = myset.end();
  
  myset.find (input) == myset.end();
  myset.insert (mystring);                        // copy insertion
  myset.insert (myarray.begin(), myarray.end());  // range insertion
  myset.insert ( {"purple","orange"} );           // initializer list insertion
  myset.erase ( myset.begin() );                    // erasing by iterator
  myset.erase ( "France" );                         // erasing by key
  myset.erase ( myset.find("Japan"), myset.end() ); // erasing by range, unstable in unordered_set
```

####map/unordered_map
```c++
  #include <map>
  struct classcomp {
    bool operator() (const char& lhs, const char& rhs) const {return lhs<rhs;}
  };
  map<char,int,classcomp> fourth;                 // class as Compare

  itlow=mymap.lower_bound ('b');  // itlow points to b
  itup=mymap.upper_bound ('d');   // itup points to e (not d!)
  
  #include <unordered_map>
  
  unordered_map<string, string> first;                              // empty
  unordered_map<string, string> second ( {{"apple","red"},{"lemon","yellow"}} );       // init list
  unordered_map<string, string> third ( {{"orange","orange"},{"strawberry","red"}} );  // init list
  unordered_map<string, string> fourth (second);                    // copy
  unordered_map<string, string> fifth (merge(third,fourth));        // move
  unordered_map<string, string> sixth (fifth.begin(),fifth.end());  // range
  
  mymap["Produce"]="John";    // new element inserted
  string name = mymap["Bakery"];   // existing element accessed (read)
  mymap["Seafood"] = name;              // existing element accessed (written)
  
  it = mylist.end();
  it = mylist.begin();
  key = it->first; value = it->second
  
  mymap.find(input) == mymap.end()
  pair <int,int> bar=make_pair (10,20);
  mymap.insert(bar);
  mymap.erase ( mymap.begin() );      // erasing by iterator
  mymap.erase ("France");             // erasing by key
  mymap.erase ( mymap.find("China"), mymap.end() ); // erasing by range, unstable in unordered_map
```

##Iterator
```c++
vector<T>::iterator it;
list<T>::iterator it;
deque<T>::iterator it；
```
`*`, `++`, `==`, `!=`, `=`

##Algorithm
```c++
  #include <algorithm>

  for_each (myvector.begin(), myvector.end(), myfunction);
  int * p = find (myints, myints+4, 30);
  copy ( myints, myints+7, myvector.begin() );
  swap(x,y);
  reverse(myvector.begin(),myvector.end());
  it = std::unique (myvector.begin(), myvector.end());
  myvector.resize( distance(myvector.begin(),it) );

  sort (myvector.begin(), myvector.begin()+4);
  sort (myvector.begin()+4, myvector.end(), myfunction);
  min(1,2);
  max(1,2);
  *min_element(myints,myints+7);
  *max_element(myints,myints+7);

  vector<int> v={10,20,30,5,15};
  make_heap (v.begin(),v.end());
  pop_heap (v.begin(),v.end()); 
  v.pop_back();
  v.push_back(99);
  push_heap (v.begin(),v.end());
  sort_heap (v.begin(),v.end()); // for output
```

##Function object
```c++
  equal_to<int>()
  greater<int>()
  greater_equal<int>()
  less<int>()
  less_equal<int>()
```
##Adaptor

###stack
```c++
  #include <stack>
  stack<int> first; // deque is default container
  stack<int, vector<int>> second;
  stack<int, list<int>> third; //useless
  mystack.empty();
  mystack.size();
  mystack.top() -= 5;
  mystack.push(5);
  mystack.pop();
```

###queue
```c++
  #include <queue>
  std::queue<int> first; // deque is default container
  std::queue<int,list<int>> second;
  myqueue.empty();
  myqueue.size();
  myqueue.front();
  myqueue.back();
  myqueue.push(5);
  myqueue.pop();
```
###priority queue
```c++
  #include <queue>
  priority_queue<int> first; // vector is default containter
  priority_queue<int, vector<int>, less<int>> second;
  priority_queue<int, deque<int>, greater<int>> third;
  mypq.empty();
  mypq.size();
  mypq.top(); // output the highest element with default less
  mypq.push(5);
  myqueue.pop();
```
key-value priority queue
```c++
  #include <unordered_map>
  #include <queue>
  
  class mycomp{
  public:
    bool operator() (const unordered_map<char, int>::iterator &lhs, const unordered_map<char, int>::iterator &rhs) const {
      return (lhs->second < rhs->second);
    }
  };
  
  unordered_map<char, int> hm;
  priority_queue<unordered_map<char, int>::iterator, vector<unordered_map<char, int>::iterator>, mycomp> pq;
```

##Allocator