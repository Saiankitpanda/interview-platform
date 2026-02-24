// ═══════════════════════════════════════════════════════════
// NeetCode 150 — Complete question list organized by topic
// Each question has: id, title, difficulty, tags, leetcodeNum,
// topic, statement (brief), and empty solution slots (brute/better/optimal)
// ═══════════════════════════════════════════════════════════

export const neetcode150 = [

    // ═══════════ 1. ARRAYS & HASHING (9) ═══════════════════
    {
        id: 'nc-1', title: 'Contains Duplicate', difficulty: 'easy', tags: ['arrays', 'hashing'], topic: 'Arrays & Hashing', leetcodeNum: 217,
        statement: 'Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.'
    },
    {
        id: 'nc-2', title: 'Valid Anagram', difficulty: 'easy', tags: ['strings', 'hashing'], topic: 'Arrays & Hashing', leetcodeNum: 242,
        statement: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.'
    },
    {
        id: 'nc-3', title: 'Two Sum', difficulty: 'easy', tags: ['arrays', 'hashing'], topic: 'Arrays & Hashing', leetcodeNum: 1,
        statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.'
    },
    {
        id: 'nc-4', title: 'Group Anagrams', difficulty: 'medium', tags: ['strings', 'hashing', 'sorting'], topic: 'Arrays & Hashing', leetcodeNum: 49,
        statement: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.'
    },
    {
        id: 'nc-5', title: 'Top K Frequent Elements', difficulty: 'medium', tags: ['arrays', 'hashing', 'heap'], topic: 'Arrays & Hashing', leetcodeNum: 347,
        statement: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.'
    },
    {
        id: 'nc-6', title: 'Encode and Decode Strings', difficulty: 'medium', tags: ['strings', 'design'], topic: 'Arrays & Hashing', leetcodeNum: 271,
        statement: 'Design an algorithm to encode a list of strings to a single string and decode it back to the original list of strings.'
    },
    {
        id: 'nc-7', title: 'Product of Array Except Self', difficulty: 'medium', tags: ['arrays', 'prefix-sum'], topic: 'Arrays & Hashing', leetcodeNum: 238,
        statement: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Solve it in O(n) without using division.'
    },
    {
        id: 'nc-8', title: 'Valid Sudoku', difficulty: 'medium', tags: ['arrays', 'hashing', 'matrix'], topic: 'Arrays & Hashing', leetcodeNum: 36,
        statement: 'Determine if a `9x9` Sudoku board is valid. Only the filled cells need to be validated according to the rules.'
    },
    {
        id: 'nc-9', title: 'Longest Consecutive Sequence', difficulty: 'medium', tags: ['arrays', 'hashing'], topic: 'Arrays & Hashing', leetcodeNum: 128,
        statement: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.'
    },

    // ═══════════ 2. TWO POINTERS (5) ═══════════════════════
    {
        id: 'nc-10', title: 'Valid Palindrome', difficulty: 'easy', tags: ['strings', 'two-pointers'], topic: 'Two Pointers', leetcodeNum: 125,
        statement: 'Given a string `s`, return `true` if it is a palindrome after converting to lowercase and removing non-alphanumeric characters.'
    },
    {
        id: 'nc-11', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'medium', tags: ['arrays', 'two-pointers'], topic: 'Two Pointers', leetcodeNum: 167,
        statement: 'Given a 1-indexed sorted array, find two numbers that add up to a specific target. Return their indices.'
    },
    {
        id: 'nc-12', title: '3Sum', difficulty: 'medium', tags: ['arrays', 'two-pointers', 'sorting'], topic: 'Two Pointers', leetcodeNum: 15,
        statement: 'Given an integer array, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`.'
    },
    {
        id: 'nc-13', title: 'Container With Most Water', difficulty: 'medium', tags: ['arrays', 'two-pointers', 'greedy'], topic: 'Two Pointers', leetcodeNum: 11,
        statement: 'Given `n` non-negative integers representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.'
    },
    {
        id: 'nc-14', title: 'Trapping Rain Water', difficulty: 'hard', tags: ['arrays', 'two-pointers', 'stack', 'dp'], topic: 'Two Pointers', leetcodeNum: 42,
        statement: 'Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.'
    },

    // ═══════════ 3. SLIDING WINDOW (6) ═════════════════════
    {
        id: 'nc-15', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', tags: ['arrays', 'sliding-window'], topic: 'Sliding Window', leetcodeNum: 121,
        statement: 'Given an array `prices` where `prices[i]` is the price on the ith day, find the maximum profit from one buy and one sell.'
    },
    {
        id: 'nc-16', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', tags: ['strings', 'sliding-window', 'hashing'], topic: 'Sliding Window', leetcodeNum: 3,
        statement: 'Given a string `s`, find the length of the longest substring without repeating characters.'
    },
    {
        id: 'nc-17', title: 'Longest Repeating Character Replacement', difficulty: 'medium', tags: ['strings', 'sliding-window'], topic: 'Sliding Window', leetcodeNum: 424,
        statement: 'Given string `s` and integer `k`, you can replace at most `k` characters. Return the length of the longest substring containing the same letter.'
    },
    {
        id: 'nc-18', title: 'Permutation in String', difficulty: 'medium', tags: ['strings', 'sliding-window', 'hashing'], topic: 'Sliding Window', leetcodeNum: 567,
        statement: 'Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`.'
    },
    {
        id: 'nc-19', title: 'Minimum Window Substring', difficulty: 'hard', tags: ['strings', 'sliding-window', 'hashing'], topic: 'Sliding Window', leetcodeNum: 76,
        statement: 'Given strings `s` and `t`, return the minimum window substring of `s` that contains all characters of `t` (including duplicates).'
    },
    {
        id: 'nc-20', title: 'Sliding Window Maximum', difficulty: 'hard', tags: ['arrays', 'sliding-window', 'deque'], topic: 'Sliding Window', leetcodeNum: 239,
        statement: 'Given array `nums` and sliding window of size `k`, return the maximum value in each window as it moves from left to right.'
    },

    // ═══════════ 4. STACK (7) ══════════════════════════════
    {
        id: 'nc-21', title: 'Valid Parentheses', difficulty: 'easy', tags: ['strings', 'stack'], topic: 'Stack', leetcodeNum: 20,
        statement: 'Given a string `s` containing `()[]{}`, determine if the input string is valid (brackets must close in correct order).'
    },
    {
        id: 'nc-22', title: 'Min Stack', difficulty: 'medium', tags: ['stack', 'design'], topic: 'Stack', leetcodeNum: 155,
        statement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.'
    },
    {
        id: 'nc-23', title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', tags: ['stack', 'math'], topic: 'Stack', leetcodeNum: 150,
        statement: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, `/`.'
    },
    {
        id: 'nc-24', title: 'Generate Parentheses', difficulty: 'medium', tags: ['stack', 'backtracking'], topic: 'Stack', leetcodeNum: 22,
        statement: 'Given `n` pairs of parentheses, generate all combinations of well-formed parentheses.'
    },
    {
        id: 'nc-25', title: 'Daily Temperatures', difficulty: 'medium', tags: ['stack', 'monotonic-stack'], topic: 'Stack', leetcodeNum: 739,
        statement: 'Given an array of daily temperatures, return an array where `answer[i]` is the number of days until a warmer temperature.'
    },
    {
        id: 'nc-26', title: 'Car Fleet', difficulty: 'medium', tags: ['stack', 'sorting'], topic: 'Stack', leetcodeNum: 853,
        statement: 'There are `n` cars going to a destination. Return the number of car fleets that will arrive at the destination.'
    },
    {
        id: 'nc-27', title: 'Largest Rectangle in Histogram', difficulty: 'hard', tags: ['stack', 'monotonic-stack'], topic: 'Stack', leetcodeNum: 84,
        statement: 'Given an array of integers `heights` representing a histogram, find the area of the largest rectangle in the histogram.'
    },

    // ═══════════ 5. BINARY SEARCH (7) ══════════════════════
    {
        id: 'nc-28', title: 'Binary Search', difficulty: 'easy', tags: ['arrays', 'binary-search'], topic: 'Binary Search', leetcodeNum: 704,
        statement: 'Given a sorted array of integers `nums` and a target, return the index of target or `-1` if not found.'
    },
    {
        id: 'nc-29', title: 'Search a 2D Matrix', difficulty: 'medium', tags: ['arrays', 'binary-search', 'matrix'], topic: 'Binary Search', leetcodeNum: 74,
        statement: 'Search for a target value in an `m x n` matrix where each row is sorted and the first integer of each row is greater than the last of the previous row.'
    },
    {
        id: 'nc-30', title: 'Koko Eating Bananas', difficulty: 'medium', tags: ['binary-search'], topic: 'Binary Search', leetcodeNum: 875,
        statement: 'Koko has `n` piles of bananas. Return the minimum integer eating speed `k` such that she can eat all bananas within `h` hours.'
    },
    {
        id: 'nc-31', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', tags: ['arrays', 'binary-search'], topic: 'Binary Search', leetcodeNum: 153,
        statement: 'Given a sorted rotated array of unique elements, return the minimum element in O(log n) time.'
    },
    {
        id: 'nc-32', title: 'Search in Rotated Sorted Array', difficulty: 'medium', tags: ['arrays', 'binary-search'], topic: 'Binary Search', leetcodeNum: 33,
        statement: 'Given a sorted rotated array, search for a target value and return its index, or `-1` if not found. Must be O(log n).'
    },
    {
        id: 'nc-33', title: 'Time Based Key-Value Store', difficulty: 'medium', tags: ['design', 'binary-search', 'hashing'], topic: 'Binary Search', leetcodeNum: 981,
        statement: 'Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the value at a certain timestamp.'
    },
    {
        id: 'nc-34', title: 'Median of Two Sorted Arrays', difficulty: 'hard', tags: ['arrays', 'binary-search'], topic: 'Binary Search', leetcodeNum: 4,
        statement: 'Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays. Must be O(log(m+n)).'
    },

    // ═══════════ 6. LINKED LIST (11) ═══════════════════════
    {
        id: 'nc-35', title: 'Reverse Linked List', difficulty: 'easy', tags: ['linked-list'], topic: 'Linked List', leetcodeNum: 206,
        statement: 'Given the head of a singly linked list, reverse the list, and return the reversed list.'
    },
    {
        id: 'nc-36', title: 'Merge Two Sorted Lists', difficulty: 'easy', tags: ['linked-list', 'recursion'], topic: 'Linked List', leetcodeNum: 21,
        statement: 'Merge two sorted linked lists and return it as a sorted list built by splicing together the nodes.'
    },
    {
        id: 'nc-37', title: 'Reorder List', difficulty: 'medium', tags: ['linked-list', 'two-pointers'], topic: 'Linked List', leetcodeNum: 143,
        statement: 'Given head of a singly linked list `L0 → L1 → … → Ln`, reorder it to `L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …`.'
    },
    {
        id: 'nc-38', title: 'Remove Nth Node From End of List', difficulty: 'medium', tags: ['linked-list', 'two-pointers'], topic: 'Linked List', leetcodeNum: 19,
        statement: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.'
    },
    {
        id: 'nc-39', title: 'Copy List with Random Pointer', difficulty: 'medium', tags: ['linked-list', 'hashing'], topic: 'Linked List', leetcodeNum: 138,
        statement: 'Construct a deep copy of a linked list where each node has an additional random pointer to any node in the list or null.'
    },
    {
        id: 'nc-40', title: 'Add Two Numbers', difficulty: 'medium', tags: ['linked-list', 'math'], topic: 'Linked List', leetcodeNum: 2,
        statement: 'Given two non-empty linked lists representing two non-negative integers stored in reverse order, return the sum as a linked list.'
    },
    {
        id: 'nc-41', title: 'Linked List Cycle', difficulty: 'easy', tags: ['linked-list', 'two-pointers'], topic: 'Linked List', leetcodeNum: 141,
        statement: 'Given head of a linked list, determine if the linked list has a cycle in it (i.e., some node can be reached again by following next).'
    },
    {
        id: 'nc-42', title: 'Find the Duplicate Number', difficulty: 'medium', tags: ['arrays', 'two-pointers', 'linked-list'], topic: 'Linked List', leetcodeNum: 287,
        statement: 'Given an array `nums` containing `n + 1` integers where each integer is between 1 and n, find the one repeated number without modifying the array.'
    },
    {
        id: 'nc-43', title: 'LRU Cache', difficulty: 'medium', tags: ['linked-list', 'hashing', 'design'], topic: 'Linked List', leetcodeNum: 146,
        statement: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get` and `put` operations in O(1).'
    },
    {
        id: 'nc-44', title: 'Merge K Sorted Lists', difficulty: 'hard', tags: ['linked-list', 'heap', 'divide-and-conquer'], topic: 'Linked List', leetcodeNum: 23,
        statement: 'Given an array of `k` linked-lists, each sorted in ascending order. Merge all into one sorted linked list.'
    },
    {
        id: 'nc-45', title: 'Reverse Nodes in k-Group', difficulty: 'hard', tags: ['linked-list', 'recursion'], topic: 'Linked List', leetcodeNum: 25,
        statement: 'Given a linked list, reverse the nodes of the list `k` at a time and return the modified list.'
    },

    // ═══════════ 7. TREES (15) ═════════════════════════════
    {
        id: 'nc-46', title: 'Invert Binary Tree', difficulty: 'easy', tags: ['trees', 'dfs', 'bfs'], topic: 'Trees', leetcodeNum: 226,
        statement: 'Given the root of a binary tree, invert the tree (mirror it), and return its root.'
    },
    {
        id: 'nc-47', title: 'Maximum Depth of Binary Tree', difficulty: 'easy', tags: ['trees', 'dfs', 'bfs'], topic: 'Trees', leetcodeNum: 104,
        statement: 'Given the root of a binary tree, return its maximum depth (longest path from root to farthest leaf).'
    },
    {
        id: 'nc-48', title: 'Diameter of Binary Tree', difficulty: 'easy', tags: ['trees', 'dfs'], topic: 'Trees', leetcodeNum: 543,
        statement: 'Given the root of a binary tree, return the length of the diameter (longest path between any two nodes).'
    },
    {
        id: 'nc-49', title: 'Balanced Binary Tree', difficulty: 'easy', tags: ['trees', 'dfs'], topic: 'Trees', leetcodeNum: 110,
        statement: 'Given a binary tree, determine if it is height-balanced (depth of subtrees never differs by more than 1).'
    },
    {
        id: 'nc-50', title: 'Same Tree', difficulty: 'easy', tags: ['trees', 'dfs'], topic: 'Trees', leetcodeNum: 100,
        statement: 'Given the roots of two binary trees, check if they are the same (structurally identical and all values are the same).'
    },
    {
        id: 'nc-51', title: 'Subtree of Another Tree', difficulty: 'easy', tags: ['trees', 'dfs'], topic: 'Trees', leetcodeNum: 572,
        statement: 'Given roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and values as `subRoot`.'
    },
    {
        id: 'nc-52', title: 'Lowest Common Ancestor of BST', difficulty: 'medium', tags: ['trees', 'bst'], topic: 'Trees', leetcodeNum: 235,
        statement: 'Given a BST, find the lowest common ancestor (LCA) of two given nodes.'
    },
    {
        id: 'nc-53', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', tags: ['trees', 'bfs'], topic: 'Trees', leetcodeNum: 102,
        statement: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (left to right, level by level).'
    },
    {
        id: 'nc-54', title: 'Binary Tree Right Side View', difficulty: 'medium', tags: ['trees', 'bfs', 'dfs'], topic: 'Trees', leetcodeNum: 199,
        statement: 'Given the root of a binary tree, return the values of the nodes you can see ordered from top to bottom when looking from the right side.'
    },
    {
        id: 'nc-55', title: 'Count Good Nodes in Binary Tree', difficulty: 'medium', tags: ['trees', 'dfs'], topic: 'Trees', leetcodeNum: 1448,
        statement: 'Given a binary tree, a node is "good" if the path from root to that node has no node with a greater value. Count all good nodes.'
    },
    {
        id: 'nc-56', title: 'Validate Binary Search Tree', difficulty: 'medium', tags: ['trees', 'bst', 'dfs'], topic: 'Trees', leetcodeNum: 98,
        statement: 'Given the root of a binary tree, determine if it is a valid BST.'
    },
    {
        id: 'nc-57', title: 'Kth Smallest Element in a BST', difficulty: 'medium', tags: ['trees', 'bst', 'dfs'], topic: 'Trees', leetcodeNum: 230,
        statement: 'Given the root of a BST and an integer `k`, return the kth smallest value (1-indexed) of all the values in the BST.'
    },
    {
        id: 'nc-58', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'medium', tags: ['trees', 'dfs', 'divide-and-conquer'], topic: 'Trees', leetcodeNum: 105,
        statement: 'Given two integer arrays `preorder` and `inorder`, construct and return the binary tree.'
    },
    {
        id: 'nc-59', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', tags: ['trees', 'dfs', 'dp'], topic: 'Trees', leetcodeNum: 124,
        statement: 'Given the root of a binary tree, return the maximum path sum. A path can start and end at any node.'
    },
    {
        id: 'nc-60', title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', tags: ['trees', 'bfs', 'dfs', 'design'], topic: 'Trees', leetcodeNum: 297,
        statement: 'Design an algorithm to serialize a binary tree to a string and deserialize a string to a binary tree.'
    },

    // ═══════════ 8. TRIES (3) ══════════════════════════════
    {
        id: 'nc-61', title: 'Implement Trie (Prefix Tree)', difficulty: 'medium', tags: ['trie', 'design'], topic: 'Tries', leetcodeNum: 208,
        statement: 'Implement a trie with `insert`, `search`, and `startsWith` methods.'
    },
    {
        id: 'nc-62', title: 'Design Add and Search Words Data Structure', difficulty: 'medium', tags: ['trie', 'dfs', 'design'], topic: 'Tries', leetcodeNum: 211,
        statement: 'Design a data structure that supports adding new words and finding if a string matches any previously added string (`.` matches any letter).'
    },
    {
        id: 'nc-63', title: 'Word Search II', difficulty: 'hard', tags: ['trie', 'backtracking', 'matrix'], topic: 'Tries', leetcodeNum: 212,
        statement: 'Given an `m x n` board of characters and a list of words, return all words on the board. Each word must be constructed from sequentially adjacent cells.'
    },

    // ═══════════ 9. HEAP / PRIORITY QUEUE (7) ══════════════
    {
        id: 'nc-64', title: 'Kth Largest Element in a Stream', difficulty: 'easy', tags: ['heap', 'design'], topic: 'Heap / Priority Queue', leetcodeNum: 703,
        statement: 'Design a class to find the kth largest element in a stream. Implement `add(val)` which returns the kth largest element.'
    },
    {
        id: 'nc-65', title: 'Last Stone Weight', difficulty: 'easy', tags: ['heap'], topic: 'Heap / Priority Queue', leetcodeNum: 1046,
        statement: 'Given array of stones, each turn smash the two heaviest. If equal, both destroyed; else, smaller destroyed and larger reduced. Return last stone weight.'
    },
    {
        id: 'nc-66', title: 'K Closest Points to Origin', difficulty: 'medium', tags: ['heap', 'sorting', 'math'], topic: 'Heap / Priority Queue', leetcodeNum: 973,
        statement: 'Given an array of points on X-Y plane, return the `k` closest points to the origin `(0, 0)`.'
    },
    {
        id: 'nc-67', title: 'Kth Largest Element in an Array', difficulty: 'medium', tags: ['heap', 'sorting', 'quickselect'], topic: 'Heap / Priority Queue', leetcodeNum: 215,
        statement: 'Given an integer array `nums` and an integer `k`, return the kth largest element. Note that it is the kth largest in sorted order, not the kth distinct.'
    },
    {
        id: 'nc-68', title: 'Task Scheduler', difficulty: 'medium', tags: ['heap', 'greedy', 'hashing'], topic: 'Heap / Priority Queue', leetcodeNum: 621,
        statement: 'Given tasks represented by characters and cooldown interval `n`, return the least number of units of time the CPU will take to finish all tasks.'
    },
    {
        id: 'nc-69', title: 'Design Twitter', difficulty: 'medium', tags: ['heap', 'design', 'hashing'], topic: 'Heap / Priority Queue', leetcodeNum: 355,
        statement: 'Design a simplified Twitter where users can post tweets, follow/unfollow, and see the 10 most recent tweets in their news feed.'
    },
    {
        id: 'nc-70', title: 'Find Median from Data Stream', difficulty: 'hard', tags: ['heap', 'design'], topic: 'Heap / Priority Queue', leetcodeNum: 295,
        statement: 'Design a data structure that supports `addNum(num)` and `findMedian()` — returns the median of all elements so far.'
    },

    // ═══════════ 10. BACKTRACKING (9) ══════════════════════
    {
        id: 'nc-71', title: 'Subsets', difficulty: 'medium', tags: ['backtracking', 'arrays'], topic: 'Backtracking', leetcodeNum: 78,
        statement: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set). No duplicates.'
    },
    {
        id: 'nc-72', title: 'Combination Sum', difficulty: 'medium', tags: ['backtracking', 'arrays'], topic: 'Backtracking', leetcodeNum: 39,
        statement: 'Given an array of distinct integers `candidates` and a target, return all unique combinations that sum to target. Same number may be reused.'
    },
    {
        id: 'nc-73', title: 'Permutations', difficulty: 'medium', tags: ['backtracking', 'arrays'], topic: 'Backtracking', leetcodeNum: 46,
        statement: 'Given an array `nums` of distinct integers, return all possible permutations in any order.'
    },
    {
        id: 'nc-74', title: 'Subsets II', difficulty: 'medium', tags: ['backtracking', 'arrays'], topic: 'Backtracking', leetcodeNum: 90,
        statement: 'Given an integer array `nums` that may contain duplicates, return all possible subsets. The solution set must not contain duplicate subsets.'
    },
    {
        id: 'nc-75', title: 'Combination Sum II', difficulty: 'medium', tags: ['backtracking', 'arrays'], topic: 'Backtracking', leetcodeNum: 40,
        statement: 'Given `candidates` array and a `target`, find all unique combinations where the candidates sum to target. Each number used once.'
    },
    {
        id: 'nc-76', title: 'Word Search', difficulty: 'medium', tags: ['backtracking', 'matrix'], topic: 'Backtracking', leetcodeNum: 79,
        statement: 'Given an `m x n` grid of characters and a string `word`, return `true` if `word` exists in the grid (adjacent cells, no reuse).'
    },
    {
        id: 'nc-77', title: 'Palindrome Partitioning', difficulty: 'medium', tags: ['backtracking', 'strings', 'dp'], topic: 'Backtracking', leetcodeNum: 131,
        statement: 'Given a string `s`, partition it such that every substring is a palindrome. Return all possible palindrome partitioning.'
    },
    {
        id: 'nc-78', title: 'Letter Combinations of a Phone Number', difficulty: 'medium', tags: ['backtracking', 'strings'], topic: 'Backtracking', leetcodeNum: 17,
        statement: 'Given a string containing digits from 2-9, return all possible letter combinations that the number could represent (phone keypad mapping).'
    },
    {
        id: 'nc-79', title: 'N-Queens', difficulty: 'hard', tags: ['backtracking', 'matrix'], topic: 'Backtracking', leetcodeNum: 51,
        statement: 'Place `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct solutions.'
    },

    // ═══════════ 11. GRAPHS (13) ═══════════════════════════
    {
        id: 'nc-80', title: 'Number of Islands', difficulty: 'medium', tags: ['graphs', 'bfs', 'dfs', 'matrix'], topic: 'Graphs', leetcodeNum: 200,
        statement: 'Given a 2D grid map of `1`s (land) and `0`s (water), count the number of islands (connected components of land).'
    },
    {
        id: 'nc-81', title: 'Max Area of Island', difficulty: 'medium', tags: ['graphs', 'dfs', 'matrix'], topic: 'Graphs', leetcodeNum: 695,
        statement: 'Given a binary matrix, return the area of the largest island (connected component of 1s). If no island, return 0.'
    },
    {
        id: 'nc-82', title: 'Clone Graph', difficulty: 'medium', tags: ['graphs', 'bfs', 'dfs', 'hashing'], topic: 'Graphs', leetcodeNum: 133,
        statement: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.'
    },
    {
        id: 'nc-83', title: 'Walls and Gates', difficulty: 'medium', tags: ['graphs', 'bfs', 'matrix'], topic: 'Graphs', leetcodeNum: 286,
        statement: 'Given a `m x n` grid with values -1 (wall), 0 (gate), or INF (empty room), fill each empty room with the distance to its nearest gate.'
    },
    {
        id: 'nc-84', title: 'Rotting Oranges', difficulty: 'medium', tags: ['graphs', 'bfs', 'matrix'], topic: 'Graphs', leetcodeNum: 994,
        statement: 'Given a grid where 0 = empty, 1 = fresh, 2 = rotten, every minute rotten oranges rot adjacent fresh ones. Return minutes until no fresh oranges, or -1.'
    },
    {
        id: 'nc-85', title: 'Pacific Atlantic Water Flow', difficulty: 'medium', tags: ['graphs', 'dfs', 'bfs', 'matrix'], topic: 'Graphs', leetcodeNum: 417,
        statement: 'Given an `m x n` matrix of heights, return the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.'
    },
    {
        id: 'nc-86', title: 'Surrounded Regions', difficulty: 'medium', tags: ['graphs', 'dfs', 'bfs', 'matrix'], topic: 'Graphs', leetcodeNum: 130,
        statement: 'Given an `m x n` matrix of `X`s and `O`s, capture all surrounded regions (flip `O` to `X` except border-connected `O`s).'
    },
    {
        id: 'nc-87', title: 'Course Schedule', difficulty: 'medium', tags: ['graphs', 'topological-sort'], topic: 'Graphs', leetcodeNum: 207,
        statement: 'There are `numCourses` courses with prerequisites. Determine if you can finish all courses (detect cycle in directed graph).'
    },
    {
        id: 'nc-88', title: 'Course Schedule II', difficulty: 'medium', tags: ['graphs', 'topological-sort'], topic: 'Graphs', leetcodeNum: 210,
        statement: 'Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.'
    },
    {
        id: 'nc-89', title: 'Graph Valid Tree', difficulty: 'medium', tags: ['graphs', 'union-find', 'dfs'], topic: 'Graphs', leetcodeNum: 261,
        statement: 'Given `n` nodes and a list of undirected edges, determine if these edges make a valid tree.'
    },
    {
        id: 'nc-90', title: 'Number of Connected Components in an Undirected Graph', difficulty: 'medium', tags: ['graphs', 'union-find', 'dfs'], topic: 'Graphs', leetcodeNum: 323,
        statement: 'Given `n` nodes and a list of edges, return the number of connected components in an undirected graph.'
    },
    {
        id: 'nc-91', title: 'Redundant Connection', difficulty: 'medium', tags: ['graphs', 'union-find'], topic: 'Graphs', leetcodeNum: 684,
        statement: 'Given a graph that started as a tree with one added edge, return the edge that can be removed to make it a tree again.'
    },
    {
        id: 'nc-92', title: 'Word Ladder', difficulty: 'hard', tags: ['graphs', 'bfs', 'strings'], topic: 'Graphs', leetcodeNum: 127,
        statement: 'Given two words `beginWord` and `endWord`, and a dictionary, return the length of the shortest transformation sequence (changing one letter at a time).'
    },

    // ═══════════ 12. ADVANCED GRAPHS (6) ═══════════════════
    {
        id: 'nc-93', title: 'Reconstruct Itinerary', difficulty: 'hard', tags: ['graphs', 'dfs', 'euler-path'], topic: 'Advanced Graphs', leetcodeNum: 332,
        statement: 'Given a list of airline tickets with [from, to], reconstruct the itinerary in order starting from "JFK". Use all tickets exactly once.'
    },
    {
        id: 'nc-94', title: 'Min Cost to Connect All Points', difficulty: 'medium', tags: ['graphs', 'mst', 'prim'], topic: 'Advanced Graphs', leetcodeNum: 1584,
        statement: 'Given `n` points, return the minimum cost to connect all points where cost is the Manhattan distance. (Minimum Spanning Tree).'
    },
    {
        id: 'nc-95', title: 'Network Delay Time', difficulty: 'medium', tags: ['graphs', 'dijkstra', 'shortest-path'], topic: 'Advanced Graphs', leetcodeNum: 743,
        statement: 'Given a network of `n` nodes with weighted directed edges, send a signal from node `k`. Return the minimum time for all nodes to receive it, or -1.'
    },
    {
        id: 'nc-96', title: 'Swim in Rising Water', difficulty: 'hard', tags: ['graphs', 'binary-search', 'dfs', 'heap'], topic: 'Advanced Graphs', leetcodeNum: 778,
        statement: 'Given an `n x n` elevation grid where at time `t` the depth of water is `t`, find the least time to swim from top-left to bottom-right.'
    },
    {
        id: 'nc-97', title: 'Alien Dictionary', difficulty: 'hard', tags: ['graphs', 'topological-sort'], topic: 'Advanced Graphs', leetcodeNum: 269,
        statement: 'Given a sorted dictionary of an alien language, derive the order of characters. Return the order as a string, or "" if invalid.'
    },
    {
        id: 'nc-98', title: 'Cheapest Flights Within K Stops', difficulty: 'medium', tags: ['graphs', 'dijkstra', 'dp', 'bellman-ford'], topic: 'Advanced Graphs', leetcodeNum: 787,
        statement: 'There are `n` cities connected by flights with prices. Find the cheapest price from `src` to `dst` with at most `k` stops.'
    },

    // ═══════════ 13. 1-D DYNAMIC PROGRAMMING (12) ══════════
    {
        id: 'nc-99', title: 'Climbing Stairs', difficulty: 'easy', tags: ['dp'], topic: '1-D Dynamic Programming', leetcodeNum: 70,
        statement: 'You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?'
    },
    {
        id: 'nc-100', title: 'Min Cost Climbing Stairs', difficulty: 'easy', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 746,
        statement: 'Given array `cost` where `cost[i]` is the cost of step `i`, find the minimum cost to reach the top. You can start from step 0 or 1.'
    },
    {
        id: 'nc-101', title: 'House Robber', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 198,
        statement: 'Given an array representing money in each house along a street, determine the maximum amount you can rob without robbing adjacent houses.'
    },
    {
        id: 'nc-102', title: 'House Robber II', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 213,
        statement: 'Same as House Robber, but all houses are arranged in a circle (first and last house are adjacent).'
    },
    {
        id: 'nc-103', title: 'Longest Palindromic Substring', difficulty: 'medium', tags: ['dp', 'strings'], topic: '1-D Dynamic Programming', leetcodeNum: 5,
        statement: 'Given a string `s`, return the longest palindromic substring in `s`.'
    },
    {
        id: 'nc-104', title: 'Palindromic Substrings', difficulty: 'medium', tags: ['dp', 'strings'], topic: '1-D Dynamic Programming', leetcodeNum: 647,
        statement: 'Given a string `s`, return the number of palindromic substrings in it.'
    },
    {
        id: 'nc-105', title: 'Decode Ways', difficulty: 'medium', tags: ['dp', 'strings'], topic: '1-D Dynamic Programming', leetcodeNum: 91,
        statement: 'Given a string of digits, return the number of ways to decode it where A=1, B=2, ..., Z=26.'
    },
    {
        id: 'nc-106', title: 'Coin Change', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 322,
        statement: 'Given coins of different denominations and a total amount, return the fewest number of coins that make up that amount. Return -1 if impossible.'
    },
    {
        id: 'nc-107', title: 'Maximum Product Subarray', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 152,
        statement: 'Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return the product.'
    },
    {
        id: 'nc-108', title: 'Word Break', difficulty: 'medium', tags: ['dp', 'strings', 'hashing'], topic: '1-D Dynamic Programming', leetcodeNum: 139,
        statement: 'Given a string `s` and a dictionary `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of dictionary words.'
    },
    {
        id: 'nc-109', title: 'Longest Increasing Subsequence', difficulty: 'medium', tags: ['dp', 'arrays', 'binary-search'], topic: '1-D Dynamic Programming', leetcodeNum: 300,
        statement: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.'
    },
    {
        id: 'nc-110', title: 'Partition Equal Subset Sum', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '1-D Dynamic Programming', leetcodeNum: 416,
        statement: 'Given an integer array `nums`, determine if you can partition into two subsets such that the sum of elements in both subsets is equal.'
    },

    // ═══════════ 14. 2-D DYNAMIC PROGRAMMING (11) ══════════
    {
        id: 'nc-111', title: 'Unique Paths', difficulty: 'medium', tags: ['dp', 'math'], topic: '2-D Dynamic Programming', leetcodeNum: 62,
        statement: 'A robot is on an `m x n` grid at the top-left corner. It can only move right or down. How many unique paths are there to the bottom-right?'
    },
    {
        id: 'nc-112', title: 'Longest Common Subsequence', difficulty: 'medium', tags: ['dp', 'strings'], topic: '2-D Dynamic Programming', leetcodeNum: 1143,
        statement: 'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If none, return 0.'
    },
    {
        id: 'nc-113', title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '2-D Dynamic Programming', leetcodeNum: 309,
        statement: 'Given prices array, find max profit with as many transactions as you like, but after selling you must wait one day before buying again.'
    },
    {
        id: 'nc-114', title: 'Coin Change II', difficulty: 'medium', tags: ['dp', 'arrays'], topic: '2-D Dynamic Programming', leetcodeNum: 518,
        statement: 'Given coins and an amount, return the number of combinations that make up that amount. If impossible, return 0.'
    },
    {
        id: 'nc-115', title: 'Target Sum', difficulty: 'medium', tags: ['dp', 'backtracking'], topic: '2-D Dynamic Programming', leetcodeNum: 494,
        statement: 'Given an array `nums` and a target, assign `+` or `-` to each integer and find the number of ways to reach the target sum.'
    },
    {
        id: 'nc-116', title: 'Interleaving String', difficulty: 'medium', tags: ['dp', 'strings'], topic: '2-D Dynamic Programming', leetcodeNum: 97,
        statement: 'Given strings `s1`, `s2`, and `s3`, determine if `s3` is formed by interleaving `s1` and `s2`.'
    },
    {
        id: 'nc-117', title: 'Longest Increasing Path in a Matrix', difficulty: 'hard', tags: ['dp', 'dfs', 'matrix'], topic: '2-D Dynamic Programming', leetcodeNum: 329,
        statement: 'Given an `m x n` integers matrix, return the length of the longest increasing path.'
    },
    {
        id: 'nc-118', title: 'Distinct Subsequences', difficulty: 'hard', tags: ['dp', 'strings'], topic: '2-D Dynamic Programming', leetcodeNum: 115,
        statement: 'Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.'
    },
    {
        id: 'nc-119', title: 'Edit Distance', difficulty: 'medium', tags: ['dp', 'strings'], topic: '2-D Dynamic Programming', leetcodeNum: 72,
        statement: 'Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert `word1` to `word2`.'
    },
    {
        id: 'nc-120', title: 'Burst Balloons', difficulty: 'hard', tags: ['dp'], topic: '2-D Dynamic Programming', leetcodeNum: 312,
        statement: 'Given `n` balloons with numbers, if you burst balloon `i` you gain `nums[i-1] * nums[i] * nums[i+1]` coins. Find the maximum coins.'
    },
    {
        id: 'nc-121', title: 'Regular Expression Matching', difficulty: 'hard', tags: ['dp', 'strings', 'recursion'], topic: '2-D Dynamic Programming', leetcodeNum: 10,
        statement: 'Implement regular expression matching with support for `.` (any single character) and `*` (zero or more of the preceding element).'
    },

    // ═══════════ 15. GREEDY (8) ════════════════════════════
    {
        id: 'nc-122', title: 'Maximum Subarray', difficulty: 'medium', tags: ['greedy', 'dp', 'arrays'], topic: 'Greedy', leetcodeNum: 53,
        statement: 'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.'
    },
    {
        id: 'nc-123', title: 'Jump Game', difficulty: 'medium', tags: ['greedy', 'arrays'], topic: 'Greedy', leetcodeNum: 55,
        statement: 'Given an array `nums` where `nums[i]` is the maximum jump length from position `i`, determine if you can reach the last index.'
    },
    {
        id: 'nc-124', title: 'Jump Game II', difficulty: 'medium', tags: ['greedy', 'arrays'], topic: 'Greedy', leetcodeNum: 45,
        statement: 'Given an array `nums`, return the minimum number of jumps to reach the last index. Guaranteed reachable.'
    },
    {
        id: 'nc-125', title: 'Gas Station', difficulty: 'medium', tags: ['greedy', 'arrays'], topic: 'Greedy', leetcodeNum: 134,
        statement: 'There are `n` gas stations in a circle with `gas[i]` fuel and `cost[i]` to travel to next. Return the starting station index if you can travel around the circuit, or -1.'
    },
    {
        id: 'nc-126', title: 'Hand of Straights', difficulty: 'medium', tags: ['greedy', 'hashing', 'sorting'], topic: 'Greedy', leetcodeNum: 846,
        statement: 'Given an array of integers `hand` and a group size `groupSize`, return `true` if you can rearrange into groups of consecutive cards.'
    },
    {
        id: 'nc-127', title: 'Merge Triplets to Form Target Triplet', difficulty: 'medium', tags: ['greedy', 'arrays'], topic: 'Greedy', leetcodeNum: 1899,
        statement: 'Given array of triplets and a target triplet, determine if you can form the target by choosing triplets and taking max of each position.'
    },
    {
        id: 'nc-128', title: 'Partition Labels', difficulty: 'medium', tags: ['greedy', 'strings'], topic: 'Greedy', leetcodeNum: 763,
        statement: 'Given a string, partition it into as many parts as possible so that each letter appears in at most one part. Return the sizes.'
    },
    {
        id: 'nc-129', title: 'Valid Parenthesis String', difficulty: 'medium', tags: ['greedy', 'strings', 'dp'], topic: 'Greedy', leetcodeNum: 678,
        statement: 'Given a string with `(`, `)`, and `*` (can be `(`, `)`, or empty), determine if the string is valid.'
    },

    // ═══════════ 16. INTERVALS (6) ═════════════════════════
    {
        id: 'nc-130', title: 'Insert Interval', difficulty: 'medium', tags: ['intervals', 'arrays'], topic: 'Intervals', leetcodeNum: 57,
        statement: 'Given a set of non-overlapping intervals sorted by start time and a new interval, insert the new interval (merge if necessary).'
    },
    {
        id: 'nc-131', title: 'Merge Intervals', difficulty: 'medium', tags: ['intervals', 'sorting'], topic: 'Intervals', leetcodeNum: 56,
        statement: 'Given an array of intervals, merge all overlapping intervals, and return the result.'
    },
    {
        id: 'nc-132', title: 'Non-overlapping Intervals', difficulty: 'medium', tags: ['intervals', 'greedy', 'sorting'], topic: 'Intervals', leetcodeNum: 435,
        statement: 'Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.'
    },
    {
        id: 'nc-133', title: 'Meeting Rooms', difficulty: 'easy', tags: ['intervals', 'sorting'], topic: 'Intervals', leetcodeNum: 252,
        statement: 'Given an array of meeting time intervals, determine if a person could attend all meetings (no overlaps).'
    },
    {
        id: 'nc-134', title: 'Meeting Rooms II', difficulty: 'medium', tags: ['intervals', 'sorting', 'heap'], topic: 'Intervals', leetcodeNum: 253,
        statement: 'Given an array of meeting time intervals, find the minimum number of conference rooms required.'
    },
    {
        id: 'nc-135', title: 'Minimum Interval to Include Each Query', difficulty: 'hard', tags: ['intervals', 'sorting', 'heap'], topic: 'Intervals', leetcodeNum: 1851,
        statement: 'Given an array of intervals and an array of queries, for each query return the size of the smallest interval containing that query.'
    },

    // ═══════════ 17. MATH & GEOMETRY (8) ═══════════════════
    {
        id: 'nc-136', title: 'Rotate Image', difficulty: 'medium', tags: ['matrix', 'math'], topic: 'Math & Geometry', leetcodeNum: 48,
        statement: 'Given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.'
    },
    {
        id: 'nc-137', title: 'Spiral Matrix', difficulty: 'medium', tags: ['matrix'], topic: 'Math & Geometry', leetcodeNum: 54,
        statement: 'Given an `m x n` matrix, return all elements of the matrix in spiral order.'
    },
    {
        id: 'nc-138', title: 'Set Matrix Zeroes', difficulty: 'medium', tags: ['matrix'], topic: 'Math & Geometry', leetcodeNum: 73,
        statement: 'Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0. Do it in place.'
    },
    {
        id: 'nc-139', title: 'Happy Number', difficulty: 'easy', tags: ['math', 'hashing'], topic: 'Math & Geometry', leetcodeNum: 202,
        statement: 'A happy number is defined by replacing the number by the sum of the squares of its digits, eventually reaching 1. Determine if a number is happy.'
    },
    {
        id: 'nc-140', title: 'Plus One', difficulty: 'easy', tags: ['math', 'arrays'], topic: 'Math & Geometry', leetcodeNum: 66,
        statement: 'Given a large integer represented as an array of digits, increment by one and return the resulting array.'
    },
    {
        id: 'nc-141', title: 'Pow(x, n)', difficulty: 'medium', tags: ['math', 'recursion'], topic: 'Math & Geometry', leetcodeNum: 50,
        statement: 'Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`).'
    },
    {
        id: 'nc-142', title: 'Multiply Strings', difficulty: 'medium', tags: ['math', 'strings'], topic: 'Math & Geometry', leetcodeNum: 43,
        statement: 'Given two non-negative integers `num1` and `num2` represented as strings, return the product as a string. Cannot use BigInteger or convert to integer directly.'
    },
    {
        id: 'nc-143', title: 'Detect Squares', difficulty: 'medium', tags: ['math', 'hashing', 'design'], topic: 'Math & Geometry', leetcodeNum: 2013,
        statement: 'Design a data structure that supports adding points and counting the number of axis-aligned squares that can be formed with a given query point.'
    },

    // ═══════════ 18. BIT MANIPULATION (7) ══════════════════
    {
        id: 'nc-144', title: 'Single Number', difficulty: 'easy', tags: ['bit-manipulation', 'arrays'], topic: 'Bit Manipulation', leetcodeNum: 136,
        statement: 'Given a non-empty array where every element appears twice except for one, find that single one. O(1) space without extra variables.'
    },
    {
        id: 'nc-145', title: 'Number of 1 Bits', difficulty: 'easy', tags: ['bit-manipulation'], topic: 'Bit Manipulation', leetcodeNum: 191,
        statement: 'Given an unsigned integer, return the number of `1` bits (Hamming weight).'
    },
    {
        id: 'nc-146', title: 'Counting Bits', difficulty: 'easy', tags: ['bit-manipulation', 'dp'], topic: 'Bit Manipulation', leetcodeNum: 338,
        statement: 'Given an integer `n`, for every `i` in `[0, n]` calculate the number of 1s in binary representation and return as an array.'
    },
    {
        id: 'nc-147', title: 'Reverse Bits', difficulty: 'easy', tags: ['bit-manipulation'], topic: 'Bit Manipulation', leetcodeNum: 190,
        statement: 'Reverse bits of a given 32 bits unsigned integer.'
    },
    {
        id: 'nc-148', title: 'Missing Number', difficulty: 'easy', tags: ['bit-manipulation', 'math', 'arrays'], topic: 'Bit Manipulation', leetcodeNum: 268,
        statement: 'Given an array `nums` containing `n` distinct numbers in range `[0, n]`, return the only number in the range that is missing.'
    },
    {
        id: 'nc-149', title: 'Sum of Two Integers', difficulty: 'medium', tags: ['bit-manipulation', 'math'], topic: 'Bit Manipulation', leetcodeNum: 371,
        statement: 'Given two integers `a` and `b`, return the sum without using the operators `+` and `-`.'
    },
    {
        id: 'nc-150', title: 'Reverse Integer', difficulty: 'medium', tags: ['math', 'bit-manipulation'], topic: 'Bit Manipulation', leetcodeNum: 7,
        statement: 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes overflow, return 0.'
    },
];

// All NeetCode 150 topics in order
export const NC_TOPICS = [
    'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack',
    'Binary Search', 'Linked List', 'Trees', 'Tries',
    'Heap / Priority Queue', 'Backtracking', 'Graphs', 'Advanced Graphs',
    '1-D Dynamic Programming', '2-D Dynamic Programming', 'Greedy',
    'Intervals', 'Math & Geometry', 'Bit Manipulation'
];
