# Untitled_Problem

No content found.

### Code:
```java
class Solution {
    public int myAtoi(String s) {
        int n = s.length();
        int i = 0;
        int sign = 1;
        int num = 0;

        // Step 1: Skip leading spaces
        for (; i < n; i++) {
            if (s.charAt(i) != ' ') {
                break;
            }
        }

        // Step 2: Check for sign
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') {
                sign = -1;
            }
            i++;
        }

        // Step 3: Convert digits
        for (; i < n; i++) {
            char ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') {
                int digit = ch - '0';

                // Step 4: Handle overflow
                if (num > (Integer.MAX_VALUE - digit) / 10) {
                    return (sign == 1) ? Integer.MAX_VALUE : Integer.MIN_VALUE;
                }

                num = num * 10 + digit;
            } else {
                break;
            }
        }

        return num * sign;
    }
}

```