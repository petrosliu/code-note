# C++

##Data type
|Type|Typical Bit Width|Typical Range|
| -- | -- | -- |
|char|1 byte|-127 to 127 or 0 to 255|
|unsigned char|1 byte|0 to 255|
|signed char|1 byte|-127 to 127|
|int|4 bytes|-2147483648 to 2147483647|
|unsigned int|4 bytes|0 to 4294967295|
|signed int|4 bytes|-2147483648 to 2147483647|
|short int|2 bytes|-32768 to 32767|
|unsigned short int|Range|0 to 65,535|
|signed short int|Range|-32768 to 32767|
|long int|4 bytes|-2,147,483,648 to 2,147,483,647|
|signed long int|4 bytes|same as long int|
|unsigned long int|4 bytes|0 to 4,294,967,295|
|float|4 bytes|+/- 3.4e +/- 38 (~7 digits)|
|double|8 bytes|+/- 1.7e +/- 308 (~15 digits)|
|long double|8 bytes|+/- 1.7e +/- 308 (~15 digits)|
|wchar_t|2 or 4 bytes|1 wide character|
|pointer|4 or 8 bytes| - |
##Operators Precedence
| Category | Operator | Associativity  | 
| -- | -- | -- |
| Postfix | () [] -> . ++ - -  | Left to right  | 
| Unary | + - ! ~ ++ - - (type)* & sizeof | Right to left  | 
| Multiplicative  | * / % | Left to right  | 
| Additive  | + - | Left to right  | 
| Shift  | << >> | Left to right  | 
| Relational  | < <= > >= | Left to right  | 
| Equality  | == != | Left to right  | 
| Bitwise AND | & | Left to right  | 
| Bitwise XOR | ^ | Left to right  | 
| Bitwise OR | &#124; | Left to right  | 
| Logical AND | && | Left to right  | 
| Logical OR | &#124;&#124; | Left to right  | 
| Conditional | ?: | Right to left  | 
| Assignment | = += -= *= /= %=>>= <<= &= ^= &#124;= | Right to left  | 
| Comma | , | Left to right  | 

##Classes
###Inheritance
When creating a class, instead of writing completely new data members and member functions, the programmer can designate that the new class should inherit the members of an existing class. This existing class is called the **base** class, and the new class is referred to as the **derived** class.

Exceptions:
* Constructors, destructors and copy constructors of the base class.
* Overloaded operators of the base class.
* The friend functions of the base class.

| Access | public | protected | private | 
| - | - | - | - |
| Same class | yes | yes | yes | 
| Derived classes | yes | yes | no | 
| Outside classes | yes | no | no |

| Inheritance | public | protected | private | 
| - | - | - | - |
| public | public | protected | - | 
| protected | protected | protected | - | 
| private | private | private | - |

```c++
class Base{
  public:
  base (int arg) {
  }
};

class Derived : public Base {
  public:
  Derived (int arg) : Base (arg) {
  }
};
```

####Diamond Problem
```c++
class Tiger : virtual public Animal { /* ... */ };
class Lion : virtual public Animal { /* ... */ }			
class Liger : public Tiger, public Lion { /* ... */ };	
```

###Overloading

|Expression | As member function | As non-member function | Example|
| - | - | - | -|
|@a | `(a).operator@ ( )` | `operator@ (a)` | !cin calls cin.operator!()|
|a@b | `(a).operator@ (b)` | `operator@ (a, b)` | cout << 42 calls std::cout.operator<<(42)|
|a@ | `(a).operator@ (int)` | `operator@ (a, int)` | - |
|a=b | `(a).operator= (b)` | - | string s; s = "abc"; calls s.operator=("abc")|
|a(b...) | `(a).operator()(b...)` | - | random_device r; auto n = r(); calls r.operator()()|
|a[b] | `(a).operator[](b)` | - | map< int, int > m; m[1] = 2; calls m.operator[](1)|
|a-> | `(a).operator-> ( )` | - | auto p = make_unique< T >(); p->bar() calls p.operator->()|
|a@ | `(a).operator@ (0)` | `operator@ (a, 0)` | vector< int >::iterator i = v.begin(); i++ calls i.operator++(0)|

```c++
T T::operator+(const T2 &b) const; //Inside class definition
T operator+(const T &a, const T2 &b); //Outside class definition
```
```c++
struct X {
    X& operator++() {
        // actual increment takes place here
        return *this;
    }
    X operator++(int) {
        X tmp(*this); // copy
        operator++(); // pre-increment
        return tmp;   // return old value
    }
};
```

###Polymorphism
C++ polymorphism means that a call to a member function will cause a different function to be executed depending on the type of object that invokes the function.

####Virtual function
####Pure virtual function
`virtual int area() = 0;`

###Abstraction
**data abstraction** is a mechanism of exposing only the interfaces and hiding the implementation details from the user.
###Encapsulation
**Data encapsulation** is a mechanism of bundling the data, and the functions that use them.

###Interfaces
The C++ interfaces are implemented using **abstract classes** and these abstract classes should not be confused with data abstraction which is a concept of keeping implementation details separate from associated data.

A class is made abstract by declaring at least one of its functions as **pure virtual function**. A pure virtual function is specified by placing `= 0` in its declaration

##Template
```c++
template <typename T>
inline T const& Max (T const& a, T const& b) { 
    return a < b ? b:a; 
} 
```