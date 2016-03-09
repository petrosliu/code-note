# Memory

##Aligned Malloc
```c++
#include <cstdlib>
void *aligned_malloc(size_t bytes, size_t alignment) {
    void *p1 ,*p2;
    p1=malloc(bytes+alignment+sizeof(size_t));
    if(!p1) return NULL;
    
    size_t addr=(size_t)p1+alignment+sizeof(size_t);
    p2=(void*)(addr-addr%alignment);
    
    *((size_t*)p2-1)=(size_t)p1;
    return p2;
}
void aligned_free(void *p) {
    free((void*)(*((size_t*)p-1)));
}
```