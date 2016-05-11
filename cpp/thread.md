# Thread

##Producer Consumer 
```c++
#include <iostream>
#include <thread>
#include <queue>
#include <mutex>
#include <chrono>
#include <condition_variable>
using namespace std;

mutex mu;
condition_variable cond;

class Buffer {
public:
    void add(int num) {
        unique_lock<mutex> locker(mu);
        cond.wait(locker, [this](){return Buffer::_buffer.size() < _size;});
        _buffer.push(num);
        locker.unlock();
        cond.notify_all();
    }
    int remove() {
        unique_lock<mutex> locker(mu);
        cond.wait(locker, [this](){return _buffer.size() > 0;});
        int next = _buffer.front();
        _buffer.pop();
        locker.unlock();
        cond.notify_all();
        return next;
    }
private:
    queue<int> _buffer;
    const unsigned int _size = 10;
};

class Person {
public:
    Person(Buffer* buffer) { this->_buffer = buffer; }
    virtual void run()=0;
protected:
    Buffer *_buffer;
};

class Producer : protected Person {
public:
    Producer(Buffer* buffer):Person(buffer){};
    void run() {
        while (true) {
            int num = rand()%100;
            _buffer->add(num);
            cout << "Produced: " << num << endl;
            this_thread::sleep_for(chrono::milliseconds(rand()%2000));
        }
    }
};

class Consumer : protected Person {
public:
    Consumer(Buffer* buffer):Person(buffer){};
    void run() {
        while (true) {
            int num = _buffer->remove();
            cout << "Consumed: " << num << endl;
            this_thread::sleep_for(chrono::milliseconds(rand()%2000));
        }
    }
};

int main() {
    Buffer b;
    Producer p(&b);
    Consumer c(&b);
    thread producer_thread(&Producer::run, &p);
    thread consumer_thread(&Consumer::run, &c);
    producer_thread.join();
    consumer_thread.join();
    return 0;
}
```